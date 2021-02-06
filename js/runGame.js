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

// Update the score and redraw
function updateScore() {
  scoreText.text("Score: " + score + " Level: " + level);
  layer.batchDraw()
}


// Start the game
function startGame() {
  window.sizeGame();
  instructions.style.display = "none";

  var timeScale = Math.max(100 * Math.pow(level, -0.5), minTimer);

  layer.clear();
  layer.show();

  window.clearInterval(timer);
  timer = window.setInterval(nextGameStep, timeScale);
  var numberOfPipes = 1 * level + 2;
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

// Clear all the pipes
function clearAllPipes() {
  pipes.forEach(pipe => {pipe.clearPipe();} );
  while (pipes.length) { pipes.pop(); }
}

// Transition after flappy bird dies to a new game
function transitionFromDeadToGame() {
  // Reset the score
  score = 0;
  level = 1;
  layer.batchDraw();

  instructionButton.style.display = "block";
  scoreForm.style.display = "none";

  // Start the game
  startWelcome();
}

// Flappy bird died!
function stopGame() {
  // Stop running the current game and showing pipes and score
    window.clearInterval(timer);
    layer.clear();
    clearAllPipes();
    scoreText.destroy();

  // Set up the new messages and show them

  instructions.style.display = "block";
  instructionButton.style.display = "none";
  instructionTitle.textContent = "Game over!";
  instructionDetailText.textContent = "Your score is " + score + ". Fill out the form to join the ";

  const linkSpan = document.createElement("span");
  const link = document.createElement("a");
  link.setAttribute('href', `https://coda.io/@anika-mehrotra/playar-leaderboard`);
  link.textContent = 'PlayAR Leaderboard';
  linkSpan.appendChild(link);
  instructionDetailText.appendChild(linkSpan);
  instructionDetailText.innerHTML += "!";

  scoreForm.style.display = "block";
}

// Flappy bird passed the level, go ahead to the next level
function nextLevel() {
  // Stop running the current game and showing pipes and score
    window.clearInterval(timer);
    layer.clear();
    clearAllPipes();
    scoreText.destroy();

  // Set up the new messages and show them
  level = level + 1;

  instructions.style.display = "block";
  instructionTitle.textContent = "Congratulations!";
  instructionDetailText.textContent = "You made it to the next level with a score of " + score + ". Press the button for a more challenging workout.";
  instructionButton.textContent = "Start Level " + level;
  document.getElementById("instructionButton").onclick = startGame;
}


// Runs every time tick to move the pipes and check where flappy is
function nextGameStep() {
  // Move all the pipes to the left
    var pipeMove = 0.01;
    pipes.forEach(pipe => pipe.movePipe(pipeMove));

  // Check if the bird is hitting any pipe. For every pipe...
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


// Helper function to get random numbers in a range
function getRndBetween(min, max) {
  return (Math.random() * (max - min) ) + min;
}
