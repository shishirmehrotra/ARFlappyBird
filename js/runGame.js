var timer;
var pipes = [];
var score = 0;
var scoreText;
var instructionText;
var instructionTextDetail;
var buttonText;
var level = 1;
var minTimer = 30;
var minGapPercent = 0.2;

function updateScore() {
  scoreText.text("Score: " + score + " Level: " + level);
  layer.batchDraw()
}

function startGame() {
  window.sizeGame();
  var timeScale = Math.max(100 * Math.pow(level, -0.5), minTimer);

  flappyIsLookingForStartButton = false;
  layer.clear();

  window.clearInterval(timer);
  timer = window.setInterval(nextGameStep, timeScale);
  var numberOfPipes = 1 * level + 1;
  var pipeWidth = 0.1;
  var spaceBetweenPipes = Math.max(0.7 * Math.pow(level, -0.5), pipeWidth*2);
  var gapPercent = Math.max(0.3 * Math.pow(level, -0.5), minGapPercent);
  var minY = 0.2;
  var maxY = 0.7;

  for (i = 0; i < numberOfPipes; i++){
    pipes.push(new Pipe(spaceBetweenPipes*i + 1,
                        getRndBetween(minY,maxY), 
                        gapPercent, 
                        pipeWidth));
  }

  scoreText = new Konva.Text({
    x: videoWidth - 250,
    y: 50,
    text:
      "Score: " + score + " Level: " + level,
    fontSize: 20,
    fontFamily: 'Arial',
    fill: '#ffffff',
    width: 100,
    align: 'center',
  });
  updateScore();

  layer.add(scoreText);

}

function transitionFromDeadToGame(){

// Ensure we don't retrigger this transition
  if(flappyIsLookingForStartButton === false) return;
  flappyIsLookingForStartButton = false;
  startButton.on('click', null);  startButton.off('click');
  buttonText.on('click', null);   buttonText.off('click');

  layerWelcome.hide();

// Reset the score
  score = 0;
  level = 1;
  layer.batchDraw();

// Start the game
  startGame();
}

function clearAllPipes() {
  pipes.forEach(pipe => {pipe.clearPipe();} );
  while (pipes.length) { pipes.pop(); }
}

function stopGame() {
// Stop running the current game and showing pipes and score
  window.clearInterval(timer);
  layer.clear();
  clearAllPipes();
  scoreText.destroy();

// Set up the new messages and show them
  instructionText.text("Game over!");
  instructionTextDetail.text("Your score is " + score + ". Try again by hitting the restart button!");
  buttonText.text("Restart");

  
  

  layerWelcome.show();
  layerWelcome.batchDraw();

// Set up for flappy to find the button
  flappyIsLookingForStartButton = true;
  startButton.on('click', null);  startButton.off('click');
  buttonText.on('click', null);   buttonText.off('click');
  startButton.on('click', transitionFromDeadToGame);
  buttonText.on('click', transitionFromDeadToGame);
  nextTransitionFunction = transitionFromDeadToGame;

}

function nextLevel() {
// Stop running the current game and showing pipes and score
  window.clearInterval(timer);
  layer.clear();
  clearAllPipes();
  scoreText.destroy();

// Set up the new messages and show them
  instructionText.text("Great job!");
  instructionTextDetail.text("You finished level " + level + "! Ready for the next level?");
  buttonText.text("Next Level")
  layerWelcome.show();
  layerWelcome.batchDraw();

// Set up for flappy to find the button
  flappyIsLookingForStartButton = true;
  startButton.on('click', null);  startButton.off('click');
  buttonText.on('click', null);   buttonText.off('click');
  startButton.on('click', transitionFromWonToNextLevel);
  buttonText.on('click', transitionFromWonToNextLevel);
  nextTransitionFunction = transitionFromWonToNextLevel;
}

function transitionFromWonToNextLevel() {

// Ensure we don't retrigger this transition
  if(flappyIsLookingForStartButton === false) return;
  flappyIsLookingForStartButton = false;
  startButton.on('click', null);  startButton.off('click');
  buttonText.on('click', null);   buttonText.off('click');

  layerWelcome.hide();

// Start the game
  level = level + 1;
  startGame();
}

function nextGameStep() {
  // Move all the pipes to the left
  var pipeMove = 0.01;
  pipes.forEach(pipe => pipe.movePipe(pipeMove));

  // Check if the bird is hitting any pipe
    // For every pipe
    pipes.forEach(
      pipe => {
        if(pipe.checkPipeHit(flappy.x(), flappy.y(), flappyW, flappyH)) 
          {stopGame(); return;};
      }
    );

  // If all pipes have scored, stop the game, and show option for next level
  var pipesDone = pipes.filter(pipe => pipe.isScored);
  if(pipesDone.length === pipes.length && pipes.length > 0)
    nextLevel();

}


function getRndBetween(min, max) {
  return (Math.random() * (max - min) ) + min;
}
