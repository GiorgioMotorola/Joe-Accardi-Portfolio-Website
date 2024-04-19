const fileList = document.getElementById('file-list');
const commandInput = document.getElementById('command-input');
const output = document.getElementById('output');

commandInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    const command = commandInput.value.trim();
    handleCommand(command);
    commandInput.value = '';
  }
});

function handleCommand(command) {
  const commands = command.split(' ');
  const mainCommand = commands[0];
  const args = commands.slice(1);

  switch (mainCommand) {
    case 'ls':
      output.innerHTML += `<span class="prompt">$ </span>${command}\n`;
      fileList.innerHTML += '<li>new_project.txt</li>';
      break;
    case 'help':
      output.innerHTML += `<span class="prompt">$ </span>${command}\n`;
      output.innerHTML +=
        '<span class="prompt">Available commands:</span> ls, help\n';
      break;
    default:
      output.innerHTML += `<span class="prompt">$ </span>${command}\n`;
      output.innerHTML += `<span class="prompt">Command not found:</span> ${mainCommand}\n`;
  }
}
