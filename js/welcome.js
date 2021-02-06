var welcomeX;
var welcomeY;
var textWidth;
var buttonX;
var buttonY;
var startButton;
var welcomeSize;
var descriptionSize

function startWelcome() {
  window.sizeGame();

  textWidth = videoWidth / 2;
  welcomeX = videoWidth/2 - textWidth/2; 
  welcomeY = Math.round(videoHeight * 0.1);
  var buttonX = Math.round(videoWidth * 0.1) + 100;
  var buttonY = videoHeight/2;

  instructions.style.display = "block";
  instructionTitle.textContent = "Welcome to PlayAR!";
  instructionDetailText.textContent = "The game that uses augmented reality to get you fit! Do pushups or squats to keep Flappy between the pipes.";
  instructionButton.textContent = "Start Playing";
  document.getElementById("instructionButton").onclick = startGame; 
}
