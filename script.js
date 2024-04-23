document.addEventListener('DOMContentLoaded', function () {
  var firstLineElement = document.getElementById('first-line');
  var firstLineSecondElement = document.getElementById(
    'first-line-second-text'
  );

  var secondLineElement = document.getElementById('second-line');

  var terminalBody = document.querySelector('.terminal-body');
  var elementsToHide = Array.from(terminalBody.children).slice(2);
  elementsToHide.forEach(function (element) {
    element.style.display = 'none';
  });

  var secondPrompt = document.querySelector('.second-prompt');

  var firstText = firstLineElement.textContent.trim();
  var firstLineSecondText = ' .\\JoeAccardi\\';
  var secondText = secondLineElement.textContent.trim();

  firstLineElement.textContent = '';
  secondLineElement.textContent = '';

  var typingSpeed = 60;
  var delayToShowSecondPrompt = 1500;
  var delayToShowSecondLine = 2500;
  var delayToHideSecondPrompt = 0;
  var delayToShowRemainingContent = 3500;

  function typeText(targetElement, text, index = 0) {
    if (index < text.length) {
      targetElement.textContent += text.charAt(index);
      setTimeout(function () {
        typeText(targetElement, text, index + 1);
      }, typingSpeed);
    }
  }

  typeText(firstLineElement, firstText);

  setTimeout(function () {
    var delayBetweenCharacters = 75;
    var textIndex = 0;
    var typingInterval = setInterval(function () {
      if (textIndex < firstLineSecondText.length) {
        firstLineElement.innerHTML +=
          '<span style="color: rgb(255, 255, 255)">' +
          firstLineSecondText.charAt(textIndex) +
          '</span>';
        textIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, delayBetweenCharacters);
  }, firstText.length * typingSpeed);

  setTimeout(function () {
    secondPrompt.style.display = 'none';
  }, delayToHideSecondPrompt);

  setTimeout(function () {
    secondPrompt.style.display = 'block';
  }, delayToHideSecondPrompt + delayToShowSecondPrompt);

  setTimeout(function () {
    typeText(secondLineElement, secondText);
  }, delayToHideSecondPrompt + delayToShowSecondLine);

  setTimeout(function () {
    elementsToHide.forEach(function (element) {
      element.style.display = 'block';
    });
    var inputField = document.querySelector("input[type='text']");
    inputField.focus();
  }, delayToShowRemainingContent);

  const aboutMeContent = `
    <div class="intro">
    <div class="project-title">HELLO, I'M JOE ACCARDI</div>
</div><div class="about-container">
    <img src="img/joe.jpg" alt="Joe" class="about-me-img">
    </div>
    <div class="desc">As a seasoned IT professional with over 15 years of experience across small business and enterprise settings, my passion lies in simplifying technology for people. I take pride in empowering individuals to tackle complex computer problems by leveraging the latest tools and techniques. Through my expertise in building and managing infrastructures of various sizes, I have honed my ability to streamline processes and maximize efficiency, enabling organizations to achieve their full potential.</div>`;

  const projectsContent = `
  <div class="project-title">CHECK OUT MY PROJECTS</div>
  <div class="projects-container">
  <div class="project">
    <div class="tooltip">Order management system for multiple fulfillment centers. Python's Faker was used to generate data within 'input.csv'.</div>
    <a href="https://github.com/jcacc/OrderlyCLI" target="_blank">
      <img src="img/folder-1.png" alt="Project Folder">
      <p>OrderlyCLI</p>
    </a>
  </div>
  <div class="project">
    <div class="tooltip">ATM app that I created for the Code KY Final Project. It Utilizes and fufills the following project requirements: Master Loop, Uses a List, Hos more than one class. </div>
    <a href="https://github.com/jcacc/MrMoney" target="_blank">
      <img src="img/folder-2.png" alt="Project Folder">
      <p>Mr. Money</p>
    </a>
  </div>
  <div class="project">
    <div class="tooltip">A Tkinter-based Python application that controls RGB lighting by sending HTTP GET requests to a local server. Features an always-on-top GUI with color-coded buttons for user-friendly interaction.</div>
    <a href="https://github.com/jcacc/pyStatus" target="_blank">
      <img src="img/folder-3.png" alt="Project Folder">
      <p>pyStatus</p>
    </a>
  </div>
</div>`;

  const contactContent = `
  <div class="contact-title">GET IN TOUCH</div>
  <div class="contact-container">
  <a href="https://github.com/jcacc/" target="_blank" rel="noopener noreferrer" class="contact-icon"><i class="fab fa-github"></i></a>
  <a href="https://www.linkedin.com/in/jaccardi/" target="_blank" rel="noopener noreferrer" class="contact-icon"><i class="fab fa-linkedin"></i></a>
  <a href="https://learn.microsoft.com/en-us/users/jaccardi/" class="contact-icon"><i class="fab fa-windows"></i>
  <a href="joe@accardi.xyz" class="contact-icon"><i class="far fa-envelope"></i></a>
  </div>`;

  let currentPanel = null;

  function showPanel(content) {
    if (currentPanel) return;

    const panel = document.createElement('div');
    panel.className = 'panel';
    panel.innerHTML = `${content}<button class="close-button">&times;</button>`;
    document.body.appendChild(panel);

    const closeButton = panel.querySelector('.close-button');
    closeButton.addEventListener('click', function () {
      hidePanel();
    });

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    currentPanel = panel;
  }

  function hidePanel() {
    if (currentPanel) {
      currentPanel.classList.add('closing');
      setTimeout(() => {
        currentPanel.remove();
        const overlay = document.querySelector('.overlay');
        if (overlay) {
          overlay.remove();
        }
        currentPanel = null;
      }, 500);
    }
  }

  document.addEventListener('click', function (event) {
    if (currentPanel && !currentPanel.contains(event.target)) {
      hidePanel();
    }
  });

  document.querySelectorAll('.dir-menu-content a').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.stopPropagation();
      event.preventDefault();
      const content = getContentForLink(link.id);
      if (currentPanel) {
        hidePanel();
        setTimeout(() => {
          showPanel(`<div>${content}</div>`);
        }, 500);
      } else {
        showPanel(`<div>${content}</div>`);
      }
    });
  });

  function getContentForLink(linkId) {
    switch (linkId) {
      case 'about-link':
        return aboutMeContent;
      case 'projects-link':
        return projectsContent;
      case 'contact-link':
        return contactContent;
      default:
        return '';
    }
  }

  const inputField = document.querySelector("input[type='text']");
  inputField.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      handleInput(e.target.value);
    }
  });

  function handleInput(input) {
    const links = document.querySelectorAll('.dir-menu-content a');
    const inputText = input.trim();

    links.forEach((link) => {
      if (inputText === link.textContent) {
        link.click();
        inputField.value = '';
        return;
      }
    });

    const fileNames = ['resume.pdf', 'change-background.png'];
    if (fileNames.includes(inputText)) {
      if (inputText === 'resume.pdf') {
        window.open('img/reusme template.pdf');
      } else if (inputText === 'change-background.png') {
        document.getElementById('imageInput').click();
        inputField.value = '';
      }
    }
  }

  function updateTime() {
    const timeDisplay = document.querySelector('.time-display');
    const now = new Date();
    let hours = now.getHours();
    const meridian = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes} ${meridian}`;
    timeDisplay.textContent = timeString;
  }

  updateTime();
  setInterval(updateTime, 1000);
});

function changeBackgroundImage(imageUrl) {
  document.body.style.backgroundImage = `url(${imageUrl})`;
}

document
  .getElementById('imageInput')
  .addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        changeBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  });
