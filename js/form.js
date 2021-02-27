var CodaAPI = new Coda('c36df09b-a6a2-45fb-a559-cab96705b999');  // Replace with your token.

var SCORES_DOC_ID = 'zZux2jvFqR';  // Replace with your new doc's ID.
var SCORES_TABLE_ID = 'grid-8J4PtXXMKB';          // Fill this in after running printDocTables() below
var SCORES_COLUMN_ID = 'c-doXoMa9lvz';
var SCORES_COLUMN_UUID = 'c-C8zd53J9kg';
var SCORES_COLUMN_SCORE = 'c-WSJqvhS-es';
var SCORES_COLUMN_NAME = 'c-L8xMncGpy4';
var SCORES_COLUMN_EMAIL = 'c-EJi3f1U2cn';
var SCORES_COLUMN_FEEDBACK = 'c-4IPCRzU-gF';
var SCORES_COLUMN_DEBUG_INFO = 'c-SzT4y15ZnN';
var SCORES_COLUMN_GAME = 'c--jcceXXB69';
var SCORES_COLUMN_VERSION = 'c-PfoaOPXZP0';
var SCORES_COLUMN_LEVEL = 'c-btJMu6IEIK';


var CodaAPI_IOS = new Coda('head:77d4b7b7-a1a8-444a-b26b-f3d71a0f3b87');
CodaAPI_IOS.protocolAndHost = 'https://head.coda.io';
var SCORES_DOC_ID_IOS = 'VzUL0cQBz5';
var SCORES_TABLE_ID_IOS = 'grid-1Ogn-mhoQw';
var SCORES_COLUMN_ID_IOS = 'c-PaOrA14Jgx';
var SCORES_COLUMN_UUID_IOS = 'c-oSaKUixd33';
var SCORES_COLUMN_SCORE_IOS = 'c-4EAwSP6ZQ6';
var SCORES_COLUMN_NAME_IOS = 'c-b1b_fCpYky';
var SCORES_COLUMN_EMAIL_IOS = 'c-zr6-a4ZOQQ';
var SCORES_COLUMN_FEEDBACK_IOS = 'c-37mttdP9o3';
var SCORES_COLUMN_DEBUG_INFO_IOS = 'c-YmMjfwO04p';


function getID() {
  // See if device has cookie, otherwise generate one/
  document.cookie = "test=testcookie";
  var lookupGeneratedID = getCookie("generatedID");
  var newGeneratedID = lookupGeneratedID;
  if (lookupGeneratedID === "") {
    newGeneratedID = Math.floor((Math.random() * 10000000));
    document.cookie = "generatedID=" + newGeneratedID;
  }

  return newGeneratedID;
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function clearFormInputs() {
	var inputs = document.getElementsByTagName("input");
	for (i=0; i < inputs.length; i++) {
		inputs[i].value ="";
	}
  
}

function submitFormData() {
  var form = document.getElementById("recordForm");
  var deviceUUID = 0;
  if (typeof device != 'undefined') {
    deviceUUID = device.uuid;
  }

  if (!isMac) {
    submitScore(
      getID(),
      deviceUUID,
      score,
      form.elements["NameInput"].value,
      form.elements["EmailInput"].value,
      form.elements["FeedbackInput"].value,
      game,
      version,
      level
    );
  }
  else {
     submitScoreIOS(
      getID(),
      deviceUUID,
      score,
      form.elements["NameInput"].value,
      form.elements["EmailInput"].value,
      form.elements["FeedbackInput"].value,
      game,
      version,
      level
    );
  }   

  clearFormInputs();
  transitionFromDeadToGame();
}

function submitEmptyForm() {
  clearFormInputs();
  submitFormData();
}


async function submitScore(id, uuid, score, name, email, feedback, game, version, level) {
  var rows = [];

   rows.push({
      cells: [
        { column: SCORES_COLUMN_ID,         value: id },
        { column: SCORES_COLUMN_UUID,       value: uuid },
        { column: SCORES_COLUMN_SCORE,      value: score },
        { column: SCORES_COLUMN_NAME,       value: name },
        { column: SCORES_COLUMN_EMAIL,      value: email },
        { column: SCORES_COLUMN_FEEDBACK,   value: feedback },
        { column: SCORES_COLUMN_DEBUG_INFO, value: debugString },
        { column: SCORES_COLUMN_GAME,       value: game },
        { column: SCORES_COLUMN_VERSION,    value: version },
        { column: SCORES_COLUMN_LEVEL,      value: level },

      ],
    });
 
  var body = {rows: rows};
  var result = await CodaAPI.upsertRows(SCORES_DOC_ID, SCORES_TABLE_ID, {}, body);
}

async function submitScoreIOS(id, uuid, score, name, email, feedback, game, version, level) {
  submitScore(id, uuid, score, name, email, feedback, game, version, level);
  var rows = [];

   rows.push({
      cells: [
        { column: SCORES_COLUMN_ID_IOS,       value: id },
        { column: SCORES_COLUMN_UUID_IOS,     value: uuid },
        { column: SCORES_COLUMN_SCORE_IOS,    value: score },
        { column: SCORES_COLUMN_NAME_IOS,     value: name },
        { column: SCORES_COLUMN_EMAIL_IOS,    value: email },
        { column: SCORES_COLUMN_FEEDBACK_IOS, value: feedback },
        { column: SCORES_COLUMN_DEBUG_INFO_IOS, value: debugString },

      ],
    });
 
  var body = {rows: rows};
  var result = await CodaAPI_IOS.upsertRows(SCORES_DOC_ID_IOS, SCORES_TABLE_ID_IOS, {}, body);
}

document.getElementById("submitButton").onclick = submitFormData;
document.getElementById("skipButton").onclick = submitEmptyForm;