var pongW;
var pongH;
var paddle;
var ball;
var pongX;
var pongSlope;
var pongDirection; // Right is 1, Left is -1
var pongSpeed;
var ballRadius;
var scorePongText;
var successfulPongsInLevel = 0;
var showBricks = false;
var bricks = [];
var activeBrickCount = 0;

// Update the score and redraw
function updateScorePong() {
  scorePongText.text("Score: " + score + "\nLevel: " + level);
  layerPong.batchDraw()
}

function pongPaddle() {

    pongW = 0.02 * videoWidth;
    pongH = (0.5 - level * 0.05) * videoHeight;
    pongX = 0 * videoWidth;


  //imageObj.onload = function () {
    paddle = new Konva.Rect({
      x: pongX,
      y: 0,
      fill: '#79A9CD',
      width: pongW,
      height: pongH,
    });
    
    if (result != null) {
      paddle.y(result.box.y + result.box.height / 2);
    }
    else {
      paddle.y(videoHeight/2 - pongH/2);
    }

    layerPong.add(paddle);
    layerPong.batchDraw();
  //};

  //imageObj.src = 'paddle.png';
}

function startPongGame (showBricksParameter) {
  flappyVideo.style.display = "none";
  pongVideo.style.display = "none";
  brickVideo.style.display = "none";
  welcomeMusic.pause();

  if (game === "Pong") {
    pongMusic.play();
  }
  else {
    brickMusic.play();
  }

  showBricks = showBricksParameter;
  if (paddle != null) paddle.destroy();
  if (ball != null) ball.destroy();

  pongPaddle();
  drawBall();

  pongSlope = 1;
  pongDirection = 1;
  //pongSpeed = videoHeight * (0.03);
  pongSpeed = videoHeight * (0.05);

  //pongSpeed = videoWidth * (0.03 + level * 0.0008);
  //pongSpeed = 40 + level*10;
  //pongSpeed = 20;
  ball.x(pongX + pongW + 10);
  ball.y(videoHeight / 2);

  timeScale = Math.max(100 * Math.pow(level, -0.15), minTimer);
  window.clearInterval(timer);
  timer = window.setInterval(nextGameStepPong, timeScale);

  instructions.style.display = "none";

  if (showBricks === false){
    game = "Pong";
  }
  else {
    game = "Brick Breaker";
  }

  if (game === "Pong") {
    pongMusic.play();
    brickMusic.pause();
  }
  else {
    brickMusic.play();
    pongMusic.pause();
  }

  layer.hide();
  layerPong.show();

  scorePongText = new Konva.Text({
    x: videoWidth - 70,
    y: 20,
    text:
      "Score: " + score + " Level: " + level,
    fontSize: 10,
    fontFamily: 'Arial',
    fill: '#000000',
    width: 70,
    align: 'center',
  });
  updateScorePong();

  layerPong.add(scorePongText);


  if (showBricks === true) {
    bricks = []; 
    for (var j = 0; j < level+1; j++) {
      for (var i = 0; i < 5; i++ ) {
        var b = new Brick(.8 - j * 0.04 , i*0.2 , 0.04 , 0.2);
        bricks.push(b);
      }
    } 
  }

}

function drawBall () {
  ballRadius = 0.025 * videoHeight;
  ball = new Konva.Circle({
    x: 0.5 * videoWidth,
    y: 0.5 * videoHeight,
    fill: '#ffffff',
    radius: ballRadius,
    stroke: 4,
  })

  layerPong.add(ball);
  layerPong.batchDraw;  
}

function nextGameStepPong() {



  if (this.strength <= 0) {
    this.clearBrick();
    score += 10 * level;
    this.isScored = true;
    updateScorePong();
  }

  // Move ball pongSpeed units in pongSlope*pongDirection pongDirection
  var oldX = ball.x();
  var oldY = ball.y();
  var newX = oldX + pongSpeed * pongDirection;
  var newY = oldY + pongSlope * (newX - oldX);
  
  ball.x(newX);
  ball.y(newY);

  // Check if you hit left wall

  if (newX - ballRadius  <= pongX + pongW) {
    // Check if you hit the paddle --> Then reflect
    if (newY + ballRadius >= paddle.y() && newY - ballRadius <= paddle.y() + paddle.height()) {
      pongDirection = -1 * pongDirection;
      pongSlope     = -1 * pongSlope;

      // Scale slope based on where it hit the paddle
      var percentileOfPaddle = ((paddle.y() + paddle.height()/2) - newY) / (paddle.height() / 2);
      pongSlope += -0.8 * percentileOfPaddle;


      if (game === "Pong"){
        score += level * 10;
        successfulPongsInLevel += 1;
        // If more than level hits, then transition to next level
        if (successfulPongsInLevel >= level) {
          nextLevelPong();
        }
      }
      updateScorePong();

    } 
    else {
      stopPongGame();
      return;
    }

    // If not, then die

  }

  // Check if hit other walls 
  if (newX + ballRadius >= videoWidth) {
    pongDirection = -1 * pongDirection;
    pongSlope     = -1 * pongSlope;    
  }
  if (newY - ballRadius <= 0 || newY + ballRadius >= videoHeight) {
    pongSlope = -1 * pongSlope;
  }

  // Check if hit any of the bricks
  bricks.forEach(
      brick => {
        brick.checkBrickHit(ball.x(), ball.y(), ballRadius)
      }
    );
  if (game === "Brick Breaker"){
    countActiveBricks();
    if(activeBrickCount <= 0) {nextLevelPong(); return};
  }

  layerPong.batchDraw();

  //console.log(new Date(Date.now()).toLocaleTimeString() + " Pong moved from (" + oldX + ", " + oldY + ") to (" + newX + ", "+ newY + ")");

}

function clearAllBricks() {
  bricks.forEach(brick => {brick.clearBrick();} );
  while (bricks.length) { bricks.pop(); }
}

function stopPongGame() {
  // Stop running the current game and showing pipes and score
    window.clearInterval(timer);
    layerPong.clear();
    layerPong.hide();
    scorePongText.destroy();
    clearAllBricks();

    gameOverSound.play();
    

  // Set up the new messages and show them

  instructions.style.display = "block";
  chooseGameDiv.style.display = "none";
  instructionDetailText.style.display = "block";
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

function nextLevelPong() {
  // Stop running the current game and showing pipes and score
  window.clearInterval(timer);
  layerPong.clear();
  layerPong.hide()
  scorePongText.destroy();
  clearAllBricks();

  nextLevelSound.play();

  // Set up the new messages and show them
  level = level + 1;
  successfulPongsInLevel = 0;

  instructions.style.display = "block";
  instructionTitle.textContent = "Congratulations!";
  instructionDetailText.style.display = "block";
  chooseGameDiv.style.display = "none";
  instructionDetailText.textContent = "You made it to the next level with a score of " + score + ". Press the button for a more challenging workout.";
  instructionButton.textContent = "Start Level " + level;
  instructionButton.style.display = "block";
  document.getElementById("instructionButton").onclick = () => {startPongGame(showBricks)}

}

function countActiveBricks() {
  activeBrickCount = 0;
  bricks.forEach(brick => {if(brick.strength > 0) {activeBrickCount++}});
}

