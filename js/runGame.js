var timer;
var pipes = [];
var score = 0;
var scoreText;

function startGame() {
  window.sizeGame();
  var timeScale = 100;

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

function stopGame() {
  window.clearInterval(timer);
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
