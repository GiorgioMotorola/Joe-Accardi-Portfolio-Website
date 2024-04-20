document.addEventListener('DOMContentLoaded', function () {
  var firstLineElement = document.getElementById('first-line');
  var secondLineElement = document.getElementById('second-line');

  var terminalBody = document.querySelector('.terminal-body');
  var elementsToHide = Array.from(terminalBody.children).slice(2);
  elementsToHide.forEach(function (element) {
    element.style.display = 'none';
  });

  var firstPrompt = document.querySelector('.first-prompt');
  var secondPrompt = document.querySelector('.second-prompt');

  var firstText = firstLineElement.textContent.trim();
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
      <img src="img/joe.jpg" alt="Joe" class="about-me-img">
      <h1 class="hello">Hello! I'm Joe Accardi</h1>
    </div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada purus ac arcu fermentum, vel auctor est luctus. Duis ut magna id nulla congue tempus.</p>
  `;

  const projectsContent = `<p>Projects content goes here</p>`;

  const contactContent = `<p>Contact content goes here</p>`;

  function showPanel(content) {
    const existingPanel = document.querySelector('.panel');
    if (existingPanel) {
      existingPanel.innerHTML = `${content}<button class="close-panel-button">Close</button>`;
      return;
    }

    const panel = document.createElement('div');
    panel.className = 'panel';
    panel.innerHTML = `${content}<button class="close-button">&times;</button>`;
    document.body.appendChild(panel);
    panel.style.bottom = '0';
    panel.style.left = '0';

    const closeButton = panel.querySelector('.close-button');
    closeButton.addEventListener('click', function () {
      hidePanel(panel);
    });

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
  }

  function hidePanel(panel) {
    panel.classList.add('closing');
    setTimeout(() => {
      panel.remove();
    }, 500);
  }

  document.querySelectorAll('.dir-menu-content a').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const content = getContentForLink(link.id);
      showPanel(`<div>${content}</div>`);
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

    links.forEach((link, index) => {
      if (inputText === `${index + 1}` || inputText === link.textContent) {
        link.click();
        inputField.value = '';
      }
    });
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
