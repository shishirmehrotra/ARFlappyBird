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
  instructionDetailText.style.display = "block";
  instructionDetailText.textContent = "The game that uses augmented reality to get you fit!";
  instructionButton.textContent = "Choose a Game";
  document.getElementById("instructionButton").onclick = chooseGame; 
}

function chooseGame () {
  game = null;
  layer.show();
  score = 0; 
  level = 1;
  chooseGameDiv.style.display = "contents";
  flappyBirdGameOption.style.display = "contents"; 
  instructionTitle.textContent = "Choose a Game to Play!";
  instructionDetailText.style.display = "none";
  instructionButton.style.display = "none";
  flappyBirdGameOption.onclick = startFlappyGame; 
  pongGameOption.onclick = () => {startPongGame(false)};
  brickBreakerGameOption.onclick = () => {startPongGame(true)};

  if (treatAsVerticalPhone){
    $('.gameImages').css('width',  '')
    $('.gameImages').css('height', '15vh')
  }
  else {
    $('.gameImages').css('width',  '')
    $('.gameImages').css('height', '20vh')
  }

}
