var timer;
var pipes = [];
var score = 0;
var scoreText;

function startGame() {
  window.sizeGame();
  var timeScale = 100;

  layer.clear();

  flappyIsLookingForStartButton = false;

  window.clearInterval(timer);
  timer = window.setInterval(nextGameStep, timeScale);

  var numberOfPipes = 50;
  var spaceBetweenPipes = 0.4;
  var pipeWidth = 0.1;
  var gapPercent = 0.2;
  var minY = 0.2;
  var maxY = 0.7;

  for (i = 0; i < numberOfPipes; i++){
    pipes.push(new Pipe(spaceBetweenPipes*i + 1,
                        getRndBetween(minY,maxY), 
                        gapPercent, 
                        pipeWidth));
  }

  scoreText = new Konva.Text({
    x: videoWidth - 150,
    y: 50,
    text:
      "Score: " + score,
    fontSize: 20,
    fontFamily: 'Arial',
    fill: '#ffffff',
    width: 100,
    align: 'center',
  });

  layer.add(scoreText);

}

function transitionFromDeadToGame(){
  flappyIsLookingForStartButton = false;
  layerDead.clear();
  layer.clear();
  layerWelcome.clear();
  startGame();
}

function clearAllPipes() {
  pipes.forEach(pipe => {pipe.clearPipe();} );
  pipes = [];
}


function stopGame() {
  window.clearInterval(timer);

  layer.clear();

  flappyIsLookingForStartButton = true;

  var diedText = new Konva.Text({
    x: videoWidth/2,
    y: videoHeight/2,
    text:
      "You Died",
    fontSize: 100,
    fontFamily: 'Arial',
    fill: '#ffffff',
    width: 500,
    align: 'center',
  }); 
  
  var restartButton = new Konva.Rect({
    x: 0.25 * videoWidth,  
    y: videoHeight/2,
    width: 100,
    height: 50,
    fill: '#79A9CD',
    stroke: 'black',
    strokeWidth: 0,
    cornerRadius: 10,
  })

    var restartButtonText = new Konva.Text({
    x: 0.25 * videoWidth,
    y: videoHeight/2 + 12.5,
    text: "Restart",
    fontSize: 24,
    fontFamily: 'Arial',
    fill: '#ffffff',
    width: 100,
    align:'center'
    
  }) 
  layerDead.add(diedText);
  layerDead.add(restartButton);
  layerDead.add(restartButtonText);

  clearAllPipes();
  scoreText.destroy();

  layerDead.batchDraw();

  restartButton.on('click', transitionFromDeadToGame);
  restartButtonText.on('click', transitionFromDeadToGame);
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
          {stopGame();};
      }
    );

  // If so, stop the game
}


function getRndBetween(min, max) {
  return (Math.random() * (max - min) ) + min;
}
