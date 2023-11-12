document.addEventListener('DOMContentLoaded', function () {
  const delayBeforeNewLine = 0;

  const blinkerDiv = document.getElementById('blinker');
  const commandInput = document.getElementById('command-input');
  const consolesContainer = document.getElementById('consolesContainer');
  const welcomeInfoElement = document.getElementById('welcomeInfo');
  disableConsole();

  // Function to get the width of a text string
  function getTextWidth(text, font) {
    const span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    span.style.whiteSpace = 'pre';
    span.style.font = font || getComputedStyle(commandInput).font;
    span.textContent = text;
    document.body.appendChild(span);
    const width = span.offsetWidth;
    document.body.removeChild(span);
    return width;
  }

  // Blinking cursor
  setInterval(() => {
    blinkerDiv.style.opacity = (blinkerDiv.style.opacity === '1') ? '0' : '1';
  }, 500);


  // Update blinker position on input
  function updateBlinker() {
    const lastCharWidth = getTextWidth(commandInput.value);
    blinkerDiv.style.left = (commandInput.offsetLeft + lastCharWidth + 4) + 'px';
  }

  // Initial update
  updateBlinker();

  // Update on input
  commandInput.addEventListener('input', updateBlinker);
  commandInput.focus();



  // Function to create a new console with user input
  function createConsoleWithInput(command, output) {
    const consoleDiv = document.createElement('div');
    consoleDiv.classList.add('console');

    const promptSpan = document.createElement('span');
    promptSpan.innerHTML = `visitor@adamvigas.com:<span class="tilde">~</span><span class="dollar">$ ${command}</span> `;

    const outputSpan = document.createElement('span');
    outputSpan.innerHTML = output;

    const consoleText = document.createElement('div');
    consoleText.classList.add('text');

    outputSpan.style.color = 'white';

    const outputStyles = getComputedStyle(commandInput);
    outputSpan.style.font = outputStyles.font;
    outputSpan.style.fontSize = outputStyles.fontSize;

    consoleText.appendChild(promptSpan);
    consoleText.appendChild(outputSpan);

    consoleDiv.appendChild(consoleText);
    consolesContainer.appendChild(consoleDiv);
  }

  // Event listener for user input
  commandInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      const userInput = commandInput.value.trim();
      if (userInput !== '') {
        processCommand(userInput);
        commandInput.value = '';
        updateBlinker();
      }
    }
  });

  function printBanner() {
    var i = 0;
    var asciiArtText = [
      "    ___       __              _    ___                 ",
      "   /   | ____/ /___ _____ ___| |  / (_)___ _____ ______",
      "  / /| |/ __  / __ `/ __ `__ \\ | / / / __ `/ __ `/ ___/",
      " / ___ / /_/ / /_/ / / / / / / |/ / / /_/ / /_/ (__  ) ",
      "/_/  |_\\__,_/\\__,_/_/ /_/ /_/|___/_/\\__, /\\__,_/____/  ",
      "                                   /____/    © 2023    "
    ];
    var speed = 50;
    var element = document.getElementById("welcomeAsciImage");

    element.style.color = "rgba(138, 221, 48, 1)";

    function typeWriter() {
      if (i < asciiArtText.length) {
        element.innerHTML += asciiArtText[i] + "<br>";
        i++;
        setTimeout(typeWriter, speed);
      }
    }

    typeWriter();
  }


// Typing function for welcome message
function typeWelcomeMessage() {
  const text = welcomeInfoElement.textContent.trim();
  welcomeInfoElement.innerHTML = ''; // Clear the content

  let index = 0;

  function typeNextCharacter() {
    if (index < text.length) {
      if (text.charAt(index) === '\n') {
        welcomeInfoElement.innerHTML += '<br>';
      } else {
        welcomeInfoElement.innerHTML += text.charAt(index);
      }

      index++;

      setTimeout(typeNextCharacter, delayBeforeNewLine);
    }
  }

  typeNextCharacter();
}


  // Function to enable the console
  function enableConsole() {
    const consoleDiv = document.getElementById('console');
    if (consoleDiv) {
      consoleDiv.style.opacity = '1.0';
      consoleDiv.style.pointerEvents = 'auto';
    }
  }

  // Function to disable the console
  function disableConsole() {
    const consoleDiv = document.getElementById('console');
    if (consoleDiv) {
      consoleDiv.style.opacity = '0.0';
      consoleDiv.style.pointerEvents = 'none';
    }
  }

  // Updated processCommand function
  function processCommand(userInput) {
    console.log(userInput);

    if (userInput.toLowerCase() === 'clear') {
      const boxes = document.querySelectorAll('.console');

      boxes.forEach(box => {
        box.remove();
      });

      return;
    }

    if (userInput.toLowerCase() === 'help') {
      const helpMessage = [
        '<br>Available commands:',
        '1. about - Display information about this console',
        '2. hello - Display a greeting message',
        '3. help - Display this help message',
        '4. clear - Clear the console'
      ];

      createConsoleWithInput(userInput, helpMessage.join('<br>'));
    } else if (userInput.toLowerCase() === 'about') {
      const aboutMessage = '<br>This is a simple interactive web terminal created by [Your Name].';
      createConsoleWithInput(userInput, aboutMessage);
    } else if (userInput.toLowerCase() === 'hello') {
      const helloMessage = '<br>Hello! Welcome to the interactive web terminal.';
      createConsoleWithInput(userInput, helloMessage);
    } else {
      const errorMessage = `<br>Unrecognized command: ${userInput}. Type 'help' for a list of commands.`;
      createConsoleWithInput(userInput, errorMessage);
    }
  }


// Call the functions in sequence
printBanner();
enableConsole();
setTimeout(() => {
  typeWelcomeMessage();
}, delayBeforeNewLine);



});