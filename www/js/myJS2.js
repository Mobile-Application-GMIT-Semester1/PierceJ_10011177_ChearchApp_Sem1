Storage.prototype.setArray = function(key, value) {
  this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getArray = function(key) {
  var values = this.getItem(key); // get the String from Local Storage
  //var value = values.split(";"); // get an Array back
  return JSON.parse(values);
}
var churchsArr = localStorage.getArray("churchsArr");

function churchsObj(name, lat, long, img) { //object constructor for objects
  churchsArr.push(this); //push this object into array
  this.churchname = name;
  this.img = img;
  this.lat = lat;
  this.long = long;
}

if (churchsArr === null) {
  churchsArr = [];
  //create new instances of the object so that the applicaiton has some preloaded data
  new churchsObj('Athenry', 53.299975, -8.748693,'../www/img/Athenry.PNG');
  new churchsObj('Abbey', 53.275244, -9.054041,'../www/img/Franciscan.jpg');
  new churchsObj('Galway Cathedral', 53.275154, -9.057522,'../www/img/Cathedral.jpg');
  new churchsObj('Augustinian', 53.272145, -9.052120,'../www/img/Augustinian.JPG');
  new churchsObj('Ballinfoyle', 53.291674, -9.040509,'../www/img/Ballinfoyle.jpg');
  new churchsObj('Ballybane', 53.284807, -9.000950, '../www/img/Ballybane.JPG');
  new churchsObj('Barna', 53.256205, -9.133771,'../www/img/barnachurch.jpg');
  new churchsObj('Bushypark', 53.294214, -9.057522,'../www/img/Bushypark.jpg');
  new churchsObj('Castlegar', 53.294905, -9.012939,'../www/img/Castlegar.jpg');
  new churchsObj('Claddagh', 53.266317, -9.057584, '../www/img/claddagh.jpg');
  new churchsObj('Coolough', 53.295633, -9.053011, '../www/img/coolchurch.jpg');
  new churchsObj("Corpus Christi Athlone", 53.424326, -7.946559, "../www/img/ccAthlone.jpg");
  new churchsObj("Coosan", 53.438009, -7.933903, "../www/img/coosan.png");
  new churchsObj("Doughiska", 53.284046, -8.981242, '../www/img/Doughiska.jpg');
  new churchsObj('Esker', 53.282522, -8.682143, '../www/img/Esker.PNG');
  new churchsObj('Knocknacarra', 53.263009, -9.118493, '../www/img/Knocknacarra.jpg');
  new churchsObj("Mervue", 53.282120, -9.015878, "../www/img/Mervue.jpg");
  new churchsObj("Newcastle", 53.342883, -8.682690, '../www/img/Newcastle.PNG');
  new churchsObj('Renmore', 53.277143, -9.018907, '../www/img/Renmore.jpg');
  new churchsObj('Westside', 53.276920, -9.073944, '../www/img/Westside.jpg');
  new churchsObj("Salthill", 53.260797, -9.076168, "../www/img/Salthill.png");

}

// Put the object into storage
localStorage.setArray("churchsArr", churchsArr);

//these funtions calculate the users position and returns the closets "pre-populated" church to that position
var button = function(){
  // HTML5/W3C Geolocation
  if ( navigator.geolocation )
  {
    navigator.geolocation.getCurrentPosition( UserLocation );
  }
  // Default to Galway, IRE
  else
  NearestChurch( 53.2706, -9.0567 );
}

// Callback function for asynchronous call to HTML5 geolocation
function UserLocation( position )
{
  NearestChurch( position.coords.latitude, position.coords.longitude );
}


// Convert Degress to Radians
function Deg2Rad( deg ) {
  return deg * Math.PI / 180;
}

function PythagorasEquirectangular( lat1, lon1, lat2, lon2 )
{
  lat1 = Deg2Rad(lat1);
  lat2 = Deg2Rad(lat2);
  lon1 = Deg2Rad(lon1);
  lon2 = Deg2Rad(lon2);
  var R = 6371; // km
  var x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
  var y = (lat2-lat1);
  var d = Math.sqrt(x*x + y*y) * R;
  return d;
}

function NearestChurch( latitude, longitude )
{
  var mindif=99999;
  var closest;

  for (index = 0; index < churchsArr.length; ++index) {
    var long = JSON.stringify(churchsArr[index].long);
    var lat = JSON.stringify(churchsArr[index].lat);
    var dif =  PythagorasEquirectangular( latitude, longitude, lat, long );
    if ( dif < mindif )
    {
      closest=index;
      mindif = dif;
    }
  }

  // echo the nearest city
  var church = JSON.stringify(churchsArr[closest].churchname);
  var churchImage = JSON.stringify(churchsArr[closest].img);
  closestChurch = $('#closest');
  var backgroundImage = $('#home');
  closestChurch.text("The closest church is, " + church);
  backgroundImage.css('background-image', 'url(' + churchImage + ')');
}

//this function populates the dropdown list item on the right menu
function arrayPop(){
  //Create array of options to be added
  //Create and append select list
  var selectList = document.getElementById('selectChurch');
  selectList.options.length=0
  //Create and append the options
  console.log(churchsArr.length);
  for (var i = 0; i < churchsArr.length; i++) {
    var option = document.createElement("option");
    option.id = churchsArr[i].churchname;
    option.value = [i];
    option.text = churchsArr[i].churchname;
    selectList.appendChild(option);
  }
}

function disableSelect() {
  if ($('#edit').is(':checked')) {
    $('#selectChurch').prop('disabled', false);
  } else {
    $("#selectChurch").prop('disabled', 'disabled');
  }
}

//These functions allow the user to select any church and view its details
var selectedChurch = function() {
  var churchs = $("#selectChurch");
  $('option:selected').each(function() {
    $('#deleteButton').show();
    var selectedChurch = churchs.val();
    console.log(selectedChurch);
    selected(selectedChurch);
    massTimes(selectedChurch);
  });
  return churchs;
}

var selected = function(selectedChurch) {
  var selectBox = document.getElementById("mySelect");
  var selectedValue = JSON.stringify(churchsArr[selectedChurch].churchname);
  changeSelected(selectedChurch);
  return selectedValue;
}

function changeSelected(selected) {
  var backgroundImage = $ ('#delete');
  backgroundImage.css('background-image', 'url(' + churchsArr[selected].img + ')');
  var closestChurch = $('#select');
  closestChurch.text("You have selected the " + churchsArr[selected].churchname + " church");
}

function delSelectedChurch() {
  var x = $("#select").text();
  var churchs = $("#selectChurch");
  var selectedChurch = churchs.val();
  if (x === "") {
    alert("Nothing Selected");
  } else {
    if (churchsArr.length <= 10){
      alert("Churchs are at a minimum.")
    } else {
      var deleteYesNo = confirm("Delete! "+ churchsArr[selectedChurch].churchname + " Church \n \"OK\" to Delete \n \"Cancel\" to keep")
      if (deleteYesNo === false) {
        //do nothing
      } else {
        $('option:selected').each(function() {
          delete churchsArr[selectedChurch];
          churchsArr.splice(selectedChurch, 1);
          localStorage.setArray("churchsArr", churchsArr);
          arrayPop();
          $("#select").text("");
          var backgroundImage = $ ('#delete');
          backgroundImage.css('background-image', 'url(\'\')');
        });
      }
    }
  }
}

function changeImage(imageData){
  var selectedValue = selected();
  churchsArr[selectedValue].img = imageData;
  changeSelected(selectedValue);
}

// these functions use the pintpoint button on tab2. it will located the users longitude and latitude
// AND populate the corresponding text input area
function pinpoint() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    //x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  var latitudeText = $("#newLatitude").val(position.coords.latitude);
  var longitudeText = $("#newLongitude").val(position.coords.longitude);
}

//This function returns false if input
//is not a number NaN, or if input is
//outside of the specified range
var checkInput = function(input) {
  var checkNum = parseFloat(input);
  if (isNaN(checkNum)) {
    return false;
  }
  return checkNum;
};

var newChurchImage = ""

var checkImage = function (imageData) {
  if (imageData === "") {
    newChurchImage = "../www/img/Generic.PNG"
    return newChurchImage;
  } else {
    newChurchImage = imageData;
    return newChurchImage;
  }
}

var newChurchDetails = function() {
  var changeChurchImage=checkImage(newChurchImage);
  var newChurchName = $("#newChurchName").val();
  if (newChurchName === "") {
    alert("Enter Church Name")
  } else {
    var newChurchLat = checkInput($("#newLatitude").val());
    if (newChurchLat !== false) {
      var newChurchLong = checkInput($("#newLongitude").val());
      if (newChurchLong !== false && changeChurchImage === "../www/img/Generic.PNG") {
        $("#newChurchName").val("");
        $("#newLatitude").val("");
        $("#newLongitude").val("");
        creatNewChurchObject(newChurchName, newChurchLat, newChurchLong, changeChurchImage);
      } else if (newChurchLong !== false && changeChurchImage !== "../www/img/Generic.PNG"){
        creatNewChurchObject(newChurchName, newChurchLat, newChurchLong, changeChurchImage);
      }
    }
  }
}

var creatNewChurchObject = function (newChurchName, newChurchLat, newChurchLong, changeChurchImage) {
  new churchsObj(newChurchName, newChurchLat, newChurchLong, changeChurchImage);
  localStorage.setArray("churchsArr", churchsArr);
  alert(newChurchName + " " + newChurchLat + " " + newChurchLong + " " + changeChurchImage);
  arrayPop();
  newChurchImage="";
}

function start() {
  button();
  arrayPop();
  disableSelect();
}
window.onload = start;
