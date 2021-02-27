var scoreForm = document.getElementById("scoreForm");
var instructions = document.getElementById("instructions");
var instructionTitle = document.getElementById("instructionTitle");
var instructionDetailText = document.getElementById("instructionDetailText");
var instructionButton = document.getElementById("instructionButton");
var chooseGameDiv = document.getElementById("chooseGame");
var flappyBirdGameOption = document.getElementById("flappyBird");
var pongGameOption = document.getElementById("pong");
var brickBreakerGameOption = document.getElementById("brickBreaker");
var debug = document.getElementById("debug");
var gameOptions = document.getElementsByClassName("gameOptions");
var gameImages = document.getElementsByClassName("gameImages");
var treatAsVerticalPhone = false;
var treatAsIPad = false;

var debugString = ""

function updateDebug() {

  debug.setAttribute('style', 'white-space: pre-wrap;');



  debugString = "";
  debugString
    += "("
    + screen.width + ", "
    + screen.height + ")"
    + " -->  SCREEN --> screen (width, height) \r\n";
  debugString
    += "("
    + window.innerWidth + ", "
    + window.innerHeight + ")"
    + " -->  WINDOW --> window (innerWidth, innerHeight) \r\n";
  debugString
    += "("
    + document.querySelector('#inputVideo').videoWidth + ", "
    + document.querySelector('#inputVideo').videoHeight + ")" 
    + " --> VIDEO --> document.querySelector('#inputVideo') (videoWidth, videoHeight)\r\n";
  debugString
    += "("
    + stage.width() + ", "
    + stage.height() + ")" 
    + " --> STAGE --> stage (width(), height())\r\n";
  debugString += isMac ? "Mac" : "Not Mac";
  debugString += "\r\n";
  debugString += isSafari ? "Safari" : "Not Safari";
  debugString += "\r\n";
  debugString += isIPad ? "iPad" : "Not iPad";
  debugString += "\r\n";
  debugString += isIOS ? "iOS" : "Not iOS";
  debugString += "\r\n";
  debugString += isAndroid ? "Android" : "Not Android";
  debugString += "\r\n";
  debugString += isPortrait ? "Portrait" : "Not Portrait";
  debugString += "\r\n";
  debugString += "Requested stream parameters: " + JSON.stringify(streamParameters) + "\r\n";
  debugString 
    += "userAgent: " + navigator.userAgent + "\r\n";
  debugString 
    += "navigator.platform: " + navigator.platform + "\r\n";
  debugString 
    += "navigator.maxTouchPoints: " + navigator.maxTouchPoints + "\r\n";  
  debugString 
    += "Error: " + errorMessage + "\r\n";
  //debugString 
  //  += "Orientation: " + screen.orientation.type + "\r\n";

  // Unhide to debug on the screen
  //debug.textContent = debugString;
  console.log(debugString);
}