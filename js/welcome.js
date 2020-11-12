var welcomeText;
var welcomeX;
var descriptionText;
var descriptionX;
var startButton;
function startWelcome() {
  window.sizeGame();

  var welcomeX = videoWidth/2 - 250; 
  var descriptionX = videoWidth/2 - 250; 

  var welcomeText = new Konva.Text({
    x: welcomeX,
    y: 60,
    text:
      "Welcome",
    fontSize: 50,
    fontFamily: 'Calibri',
    fill: '#ffffff',
    width: 500,
    align: 'center',
  });

  var descriptionText = new Konva.Text({
    x: descriptionX,
    y: 140,
    text:
      "Move the bird with your head to the start button.",
    fontSize: 25,
    fontFamily: 'Calibri',
    fill: '#ffffff',
    width: 500,
    align: 'center',
  });

  var startButton = new Konva.Rect({
    x: 20,  
    y: 20,
    width: 100,
    height: 50,
    fill: '#79A9CD',
    stroke: 'black',
    strokeWidth: 0,

  });

  layer2.add(welcomeText);
  layer2.add(descriptionText);
  layer2.add(startButton);
  layer2.batchDraw();


}