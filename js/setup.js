var scoreForm = document.getElementById("scoreForm");
var instructions = document.getElementById("instructions");
var instructionTitle = document.getElementById("instructionTitle");
var instructionDetailText = document.getElementById("instructionDetailText");
var instructionButton = document.getElementById("instructionButton");
var debug = document.getElementById("debug");

var portrait = false;

function updateDebug() {
  debug.setAttribute('style', 'white-space: pre-wrap;');

  debug.textContent = "";
  debug.textContent
    += "("
    + screen.width + ", "
    + screen.height + ")"
    + " -->  SCREEN --> screen (width, height) \r\n";
  debug.textContent
    += "("
    + window.innerWidth + ", "
    + window.innerHeight + ")"
    + " -->  WINDOW --> window (innerWidth, innerHeight) \r\n";
  debug.textContent
    += "("
    + document.querySelector('#inputVideo').videoWidth + ", "
    + document.querySelector('#inputVideo').videoHeight + ")" 
    + " --> VIDEO --> document.querySelector('#inputVideo') (videoWidth, videoHeight)\r\n";
  debug.textContent
    += "("
    + stage.width() + ", "
    + stage.height() + ")" 
    + " --> STAGE --> stage (width(), height())\r\n";
  debug.textContent += isSafari ? "Safari" : "Not Safari";
  debug.textContent += "\r\n";
  debug.textContent += isIPad ? "iPad" : "Not iPad";
  debug.textContent += "\r\n";
  debug.textContent += isAndroid ? "Android" : "Not Android";
  debug.textContent += "\r\n";
  debug.textContent += isPortrait ? "Portrait" : "Not Portrait";
  debug.textContent += "\r\n";
  debug.textContent += "Requested stream parameters: " + JSON.stringify(streamParameters) + "\r\n";
  debug.textContent 
    += "userAgent: " + navigator.userAgent + "\r\n";
  debug.textContent 
    += "Orientation: " + screen.orientation.type + "\r\n";
  debug.textContent 
    += "Error: " + errorMessage + "\r\n";

  console.log(debug.textContent);
}