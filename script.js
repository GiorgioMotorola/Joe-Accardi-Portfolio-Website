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

  var index = 0;
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
    secondPrompt.style.display = 'inline';
  }, delayToHideSecondPrompt + delayToShowSecondPrompt);

  setTimeout(function () {
    typeText(secondLineElement, secondText);
  }, delayToHideSecondPrompt + delayToShowSecondLine);

  setTimeout(function () {
    elementsToHide.forEach(function (element) {
      element.style.display = 'block';
    });
  }, delayToShowRemainingContent);

  document
    .getElementById('about-link')
    .addEventListener('click', function (event) {
      event.preventDefault();

      const aboutMeContent = `
      <h1>Hello! I'm Joe Accardi</h1>
      <img src="img/joe.jpg" alt="Joe" class="about-me-img" style="width: 100%; max-width: 400px; height: auto; border-radius: 10px;">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada purus ac arcu fermentum, vel auctor est luctus. Duis ut magna id nulla congue tempus.</p>

      `;

      terminalBody.innerHTML += '<div>' + aboutMeContent + '</div>';
    });
});
