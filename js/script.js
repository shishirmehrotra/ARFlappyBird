var CodaAPI = new Coda('c36df09b-a6a2-45fb-a559-cab96705b999');  // Replace with your token.

// prettyPrint will be used throughout to make the API's output more readable.
function prettyPrint(value) {
  return JSON.stringify(value, null, 2);
}
  
function createStarterDoc() {
  (async () => {
    var doc = await CodaAPI.createDoc({ title: 'Tutorial' });
    console.log('New doc created! %s', prettyPrint(doc, null, 2));
  })();
}


DOC_ID = 'JBOcMsjSfc';  // Replace with your new doc's ID.
TABLE_ID = 'grid-52Qj0I07a4';          // Fill this in after running printDocTables() below


function printDocTables() {
  (async () => {
    var tables = await CodaAPI.listTables(DOC_ID);
    console.log('Doc tables are: %s', prettyPrint(tables));
  })();
}


CITY_COLUMN_ID = 'c-x0OZ1-drxU';  // Fill these out.
IMAGE_URL_COLUMN_ID = 'c-dFAvgp0Zj3';


function printSatelliteColumns() {
  (async () => {

    var columns = await CodaAPI.listColumns(DOC_ID, TABLE_ID);
    console.log('Columns are: %s', prettyPrint(columns, null, 2));
  })();

}


function getCityLocation(city) {
  return "not implemented";
  //var geocoderResponse = Maps.newGeocoder().geocode(city);
  //return geocoderResponse.results[0].geometry.location;
}

function getSatelliteImageUrl(city) {
  /*
  var location = getCityLocation(city);
  var cityLat = location.lat;
  var cityLong = location.lng;
  
  var nasaUrl = 'https://api.nasa.gov/planetary/earth/assets/?api_key=DEMO_KEY&dim=0.1' + 
    "&lat=" + cityLat +
    "&lon=" + cityLong;

  var nasaResponse = JSON.parse(UrlFetchApp.fetch(nasaUrl)); 
  return nasaResponse.url;
  */
  return "not implemented";

}

/** Run me to see the latest pic of Paris! */
function printImageUrlTest() {
  var imgUrl = getSatelliteImageUrl('Paris');
  console.log(imgUrl);
}

var citiesGlobal;

async function getDesiredCities() {
 // (async () => {
    var rowsResponse = await CodaAPI.listRows(DOC_ID, TABLE_ID);

    var cities = [];
    for (var row of rowsResponse.items) {
      cities.push(row.values[CITY_COLUMN_ID]);
    }

    console.log('Fetched cities from Coda: %s', prettyPrint(cities));
    citiesGlobal = cities;
    return cities;
 // })();

}
async function addImages() {
  var cities = await getDesiredCities();

 // (async () => {
    var rows = [];
//    for (var city of Object.entries(citiesGlobal)) {
    for (var city of citiesGlobal) {
      var satImage = getSatelliteImageUrl(city);
      rows.push({
        cells: [
          { column: CITY_COLUMN_ID, value: city },
          { column: IMAGE_URL_COLUMN_ID, value: satImage },
        ],
      });
    }

    var body = {
      rows: rows,
      keyColumns: [CITY_COLUMN_ID],
    };

    var result = await CodaAPI.upsertRows(DOC_ID, TABLE_ID, {}, body);
//  })()
  
}

/*
async function addImagesNew() {
  var cities = await getDesiredCities();

 // (async () => {
    var rows = [];
//    for (var city of Object.entries(citiesGlobal)) {
    for (var city of citiesGlobal) {
      var satImage = getSatelliteImageUrl(city);
      rows.push({
        cells: [
          { column: CITY_COLUMN_ID, value: city },
//          { column: IMAGE_URL_COLUMN_ID, value: satImage },
        ],
      });
    }

    var body = {
      rows: rows,
      //keyColumns: [CITY_COLUMN_ID],
    };

    var result = await CodaAPI.upsertRows(DOC_ID, TABLE_ID, body);
//  })()
  
}

*/
async function testAddJustOneRow() {
  try {
    /*
    var rows = [];
    rows.push({cells: [{ column: CITY_COLUMN_ID, value: "new row" }]});
    var body = {rows: rows};
    var result = await CodaAPI.upsertRows(DOC_ID, TABLE_ID, {}, body); 
    console.log(result);
    */
    var rows = [{cells: [{ column: CITY_COLUMN_ID, value: Date.now() }]}];
    var body = {rows: rows};
    var result = await CodaAPI.upsertRows(DOC_ID, TABLE_ID, {}, body); 
  }
  catch(err) {
    console.log(err);
  }
}


/*
getCityLocation();

getSatelliteImageUrl();

getDesiredCities();

addImages();*/
