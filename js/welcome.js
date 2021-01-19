var instructionText;
var welcomeX;
var welcomeY;
var textWidth;
var instructionTextDetail;
var boxInstructionText;
var buttonX;
var buttonY;
var startButton;
var welcomeSize;
var descriptionSize
var startButton;
var nextTransitionFunction = transitionFromWelcomeToGame;


var flappyIsLookingForStartButton = false;

function startWelcome() {
  window.sizeGame();

  //textWidth = 750; // RIYA - Change this to be a calculation
  textWidth = videoWidth / 2;
  welcomeX = videoWidth/2 - textWidth/2; 
  welcomeY = Math.round(videoHeight * 0.1);
  var buttonX = Math.round(videoWidth * 0.1) + 100;
  var buttonY = videoHeight/2;

  instructionText = new Konva.Text({
    x: welcomeX,
    y: welcomeY,
    text:
      "Welcome",
    fontSize: 50,
    fontFamily: 'Arial',
    fill: '#ffffff',
    width: textWidth,
    align: 'center',

  });

  boxInstructionText = new Konva.Rect({
    x: welcomeX -10,  
    y: welcomeY -20,
    width: textWidth + 20,
    height: 180,
    fill: '#79A9CD',
    stroke: 'black',
    strokeWidth: 0,
    cornerRadius: 10,
  });

  instructionTextDetail = new Konva.Text({
    x: welcomeX,
    y: welcomeY + 80,
    text:
      "Move your head to the start button then do pushups to stay in between the pipes.",
    fontSize: 25,
    fontFamily: 'Arial',
    fill: '#ffffff',
    width: textWidth,
    align: 'center',
  });

  startButton = new Konva.Rect({
    x: buttonX,  
    y: buttonY,
    width: 150,
    height: 50,
    fill: '#79A9CD',
    stroke: 'black',
    strokeWidth: 0,
    cornerRadius: 10,
  });

  buttonText = new Konva.Text({
    x: buttonX,
    y: buttonY + 12.5,
    text: "Start",
    fontSize: 25,
    fontFamily: 'Arial',
    fill: '#ffffff',
    width: 150,
    align:'center'
    
  }) 

  layerWelcome.add(boxInstructionText); 
  layerWelcome.add(instructionText);
  layerWelcome.add(instructionTextDetail);
  layerWelcome.add(startButton);
  layerWelcome.add(buttonText);
  layerWelcome.batchDraw();


  // Wait for start button to be hit - either by flappy bird or by click

  flappyIsLookingForStartButton = true;
  startButton.on('click', transitionFromWelcomeToGame);
  buttonText.on('click', transitionFromWelcomeToGame);

  
}

function checkIfFlappyHitStartButton(startButton) {
  if (flappy.y() + flappy.height() > startButton.y() &&
      flappy.y()                   < startButton.y() + startButton.height() &&
      flappy.x() + flappy.width()  > startButton.x() && 
      flappy.x()                   < startButton.x() + startButton.width()
      ) {
    return true;
  }
}


function transitionFromWelcomeToGame() {
  if(flappyIsLookingForStartButton === false) return;

  // Clear layerWelcome and start game 
  flappyIsLookingForStartButton = false;
  startButton.on('click', null);
  startButton.off('click');
  buttonText.on('click', null);
  buttonText.off('click');
  layerWelcome.hide();
  layer.clear();
  startGame();

}