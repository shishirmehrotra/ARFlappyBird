var SCORES_DOC_ID = 'zZux2jvFqR';  // Replace with your new doc's ID.
var SCORES_TABLE_ID = 'grid-8J4PtXXMKB';          // Fill this in after running printDocTables() below
var SCORES_COLUMN_ID = 'c-doXoMa9lvz';
var SCORES_COLUMN_UUID = 'c-C8zd53J9kg';
var SCORES_COLUMN_SCORE = 'c-WSJqvhS-es';
var SCORES_COLUMN_NAME = 'c-L8xMncGpy4';
var SCORES_COLUMN_EMAIL = 'c-EJi3f1U2cn';
var SCORES_COLUMN_FEEDBACK = 'c-4IPCRzU-gF';


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
  
  /*
  document.getElementById("NameInput").value = "";
  document.getElementById("EmailInput").value = "";
  document.getElementById("FeedbackInput").value = "";
  document.getElementById("recordForm").elements["score"].value = 0;
  document.getElementById("recordForm").elements["generatedID"].value = "";
  document.getElementById("recordForm").elements["generatedUUID"].value = "";

  console.log() */
  }

function submitFormData() {
  var form = document.getElementById("recordForm");
/*
  //  form.elements["score"].value = currentScore;
  form.elements["score"].value = 1000;

  form.elements["generatedID"].value = newGeneratedID;
  */

  var deviceUUID = 0;
  if (typeof device != 'undefined') {
    deviceUUID = device.uuid;
  }


  //form.submit();
  submitScore(
    getID(),
    deviceUUID,
    score,
    form.elements["NameInput"].value,
    form.elements["EmailInput"].value,
    form.elements["FeedbackInput"].value
  );
  clearFormInputs();
  transitionFromDeadToGame();
  //summary();
  return false;

}


async function submitScore(id, uuid, score, name, email, feedback) {
  var rows = [];

   rows.push({
      cells: [
        { column: SCORES_COLUMN_ID,       value: id },
        { column: SCORES_COLUMN_UUID,     value: uuid },
        { column: SCORES_COLUMN_SCORE,    value: score },
        { column: SCORES_COLUMN_NAME,     value: name },
        { column: SCORES_COLUMN_EMAIL,    value: email },
        { column: SCORES_COLUMN_FEEDBACK, value: feedback },

      ],
    });
 
  var body = {rows: rows};
  var result = await CodaAPI.upsertRows(SCORES_DOC_ID, SCORES_TABLE_ID, {}, body);
}



document.getElementById("submitButton").onclick = submitFormData;
document.getElementById("skipButton").onclick = transitionFromDeadToGame;





// initializeForm();

/* 
function initializeForm() {

  // Add score and ID elements to recordForm
  var form = document.getElementById("recordForm");
  var scoreInput = document.createElement('input');
  scoreInput.type = 'hidden';
  scoreInput.name = 'score';
  scoreInput.value = 0;
  form.appendChild(scoreInput);

  var generatedIDInput = document.createElement('input');
  generatedIDInput.type = 'hidden';
  generatedIDInput.name = 'generatedID';
  generatedIDInput.value = "";
  form.appendChild(generatedIDInput);

  var generatedUUIDInput = document.createElement('input');
  generatedUUIDInput.type = 'hidden';
  generatedUUIDInput.name = 'generatedUUID';
  if (typeof device != 'undefined') { generatedUUIDInput.value = device.uuid; }
  form.appendChild(generatedUUIDInput);


  clearFormInputs();
  }

*/

