var welcomeText;
var welcomeX;
var descriptionText;
var buttonX;
var buttonY;
var startButton;
var welcomeSize;
var descriptionSize
var startButton;

var flappyIsLookingForStartButton = false;

function startWelcome() {
  window.sizeGame();

  var welcomeX = videoWidth/2 - 350; 
  var welcomeY = Math.round(videoHeight * 0.1);
  var buttonX = Math.round(videoWidth * 0.1) + 100;
  var buttonY = videoHeight/2;

  var welcomeText = new Konva.Text({
    x: welcomeX,
    y: welcomeY,
    text:
      "Welcome",
    fontSize: 72,
    fontFamily: 'Arial',
    fill: '#ffffff',
    width: 700,
    align: 'center',
  });

  var descriptionText = new Konva.Text({
    x: welcomeX,
    y: welcomeY + 80,
    text:
      "Move the bird with your head to the start button.",
    fontSize: 25,
    fontFamily: 'Arial',
    fill: '#ffffff',
    width: 700,
    align: 'center',
  });

  startButton = new Konva.Rect({
    x: buttonX,  
    y: buttonY,
    width: 100,
    height: 50,
    fill: '#79A9CD',
    stroke: 'black',
    strokeWidth: 0,
    cornerRadius: 10,
  });

  var buttonText = new Konva.Text({
    x: buttonX,
    y: buttonY + 12.5,
    text: "Start",
    fontSize: 25,
    fontFamily: 'Arial',
    fill: '#ffffff',
    width: 100,
    align:'center'
    
  }) 

  layerWelcome.add(welcomeText);
  layerWelcome.add(descriptionText);
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
  // Clear layerWelcome and start game 
  flappyIsLookingForStartButton = false;
  layerWelcome.clear();
  startGame();

}