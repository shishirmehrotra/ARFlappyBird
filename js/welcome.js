var welcomeX;
var welcomeY;
var textWidth;
var buttonX;
var buttonY;
var startButton;
var welcomeSize;
var descriptionSize;
var flappyVideo;
var pongVideo;
var brickVideo;

welcomeMusic = new Audio ("Sounds/welcomeMusic.mp3");
brickMusic = new Audio ("Sounds/brick.mp3");
flappyMusic = new Audio ("Sounds/flappy.mp3");
pongMusic = new Audio ("Sounds/pong.mp3");
brickHitSound = new Audio ("Sounds/brickHit.wav");
pipeScoreSound = new Audio ("Sounds/pipeScore.mp3");
gameOverSound = new Audio ("Sounds/gameOver.mp3");
nextLevelSound = new Audio ("Sounds/nextLevel.wav");

var music = 0.1;

welcomeMusic.loop = true;
welcomeMusic.volume = music;
flappyMusic.loop = true;
flappyMusic.volume = music;
pongMusic.loop = true;
pongMusic.volume = music;
brickMusic.loop = true;
brickMusic.volume = music;

function startWelcome() {
  window.sizeGame();


  welcomeMusic.play();

  textWidth = videoWidth / 2;
  welcomeX = videoWidth/2 - textWidth/2; 
  welcomeY = Math.round(videoHeight * 0.1);
  var buttonX = Math.round(videoWidth * 0.1) + 100;
  var buttonY = videoHeight/2;

  flappyVideo = document.getElementById("flappyVideoContainer");
  pongVideo = document.getElementById("pongVideoContainer");
  brickVideo = document.getElementById("brickVideoContainer");

  flappyVideo.style.display = "none";
  pongVideo.style.display = "none";
  brickVideo.style.display = "none";
  instructions.style.display = "block";
  instructionTitle.textContent = "Welcome to PlayAR!";
  instructionDetailText.style.display = "block";
  instructionDetailText.textContent = "The game that uses augmented reality to get you fit!";
  instructionButton.textContent = "Choose a Game";
  document.getElementById("instructionButton").onclick = chooseGame; 
}

function chooseGame () {
  flappyVideo.style.display = "none";
  pongVideo.style.display = "none";
  brickVideo.style.display = "none";
  brickMusic.pause();
  flappyMusic.pause();
  pongMusic.pause();

  welcomeMusic.play();
 
  game = null;
  layer.show();
  score = 0; 
  level = 1;
  chooseGameDiv.style.display = "contents";
  flappyBirdGameOption.style.display = "contents"; 
  instructionTitle.textContent = "Choose a Game to Play!";
  instructionDetailText.style.display = "none";
  instructionButton.style.display = "none";
  flappyBirdGameOption.onclick = flappyInstructions; 
  pongGameOption.onclick = () => {pongInstructions(false)};
  brickBreakerGameOption.onclick = () => {pongInstructions(true)};

  if (treatAsVerticalPhone){
    $('.gameImages').css('width',  '')
    $('.gameImages').css('height', '15vh')
  }
  else {
    $('.gameImages').css('width',  '')
    $('.gameImages').css('height', '20vh')
  }

}

function flappyInstructions() {
  flappyVideo.style.display = "block";
  chooseGameDiv.style.display = "none";
  flappyBirdGameOption.style.display = "none"; 
  instructionTitle.textContent = "Instructions";
  instructionDetailText.style.display = "block";
  instructionDetailText.textContent = "To control the bird, do pushups or squats. Move the bird inbetween the pipes to get points. Have fun!";
  document.getElementById("instructionButton").style.display = "block";
  document.getElementById("instructionButton").textContent = "Start";
  document.getElementById("instructionButton").onclick = startFlappyGame;
}

function pongInstructions(game) {
  chooseGameDiv.style.display = "none";
  flappyBirdGameOption.style.display = "none"; 
  instructionTitle.textContent = "Instructions";
  instructionDetailText.style.display = "block";
  instructionDetailText.textContent = "To control the paddle, do pushups or squats. Move the paddle to the ball to make it bounce against the wall. Have fun!";
  document.getElementById("instructionButton").style.display = "block";
  document.getElementById("instructionButton").textContent = "Start";
  if (game == false){
    instructionButton.onclick = () => startPongGame(false);
    pongVideo.style.display = "block";
  }
  else {
    instructionButton.onclick = () => startPongGame(true);
    brickVideo.style.display = "block";
  }
}