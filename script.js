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
    <div class="about-title">Hello, I'm <span style="color: grey; font-size: 25px; font-weight: 800;">Joe Accardi</span>
</div><div class="about-container">
    <img src="img/joe.jpg" alt="Joe" class="about-me-img">
    </div>
    <div class="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada purus ac arcu fermentum, vel auctor est luctus. Duis ut magna id nulla congue tempus.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada purus ac arcu fermentum, vel auctor est luctus. Duis ut magna id nulla congue tempus.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada purus ac arcu fermentum, vel auctor est luctus. Duis ut magna id nulla congue tempus.    </div>`;

  const projectsContent = `<div class="project-title">Check out my <span style="color: grey; font-size: 25px; font-weight: 800;">Projects</span>
</div><div class="project-container">
<div class="project-1"><h1>Project One</h1> <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada purus ac arcu fermentum, vel auctor est luctus. Duis ut magna id nulla congue tempus.</h3></div>
<div class="project-2"><h1>Project Two</h1> <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada purus ac arcu fermentum, vel auctor est luctus. Duis ut magna id nulla congue tempus.</h3></div>
<div class="project-3"><h1>Project Three</h1> <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada purus ac arcu fermentum, vel auctor est luctus. Duis ut magna id nulla congue tempus.</h3></div>
</div>`;

  const contactContent = `<div class="contact-title">Get in <span style="color: grey; font-size: 25px; font-weight: 800;">Touch</span></div>
<div class="contact-container">
<h2><a href="mailto:joe@example.com" target="_blank">EMAIL: joe@example.com</a></h2>
<h2><a href="https://www.example.com" target="_blank">GITHUB: www.example.com</a></h2>
<h2><a href="https://www.example.com" target="_blank">LINKEDIN: www.example.com</a></h2>  
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
        window.open('path_to_resume.pdf');
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

function changeBackgroundImageFromFile(file) {
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      changeBackgroundImage(reader.result);
    };
    reader.readAsDataURL(file);
  }
}

document
  .getElementById('imageInput')
  .addEventListener('change', function (event) {
    changeBackgroundImageFromFile(event.target.files[0]);
  });
