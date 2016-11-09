var churchsArr = [];
var churchsObj = (function() {
  function churchsObj(name, lat, long, img, sunday, week, vigil, holy) {
    churchsArr.push(this);
    this.churchname = name;
    this.img = img;
    this.lat = lat;
    this.long = long;
    this.sunday = sunday;
    this.week = week;
    this.vigil = vigil;
    this.holy = holy;
  }

    churchsObj.each = function(cb) {
    for (var i in churchsArr) {
      if (churchsArr.hasOwnProperty(i)) {
        cb(churchsArr[i]);
      }
    }
  }
  return churchsObj;
})();
var x = new churchsObj('Athenry', 53.299975, -8.748693,'../www/img/Athenry.PNG', "11:00,  19:30", "10:00", "19:30", "As Above" );
localStorage.setItem("abc", JSON.stringify(x));
var y = JSON.parse(localStorage.getItem("abc"));
console.log("Church is " + y);
new churchsObj('Abbey', 53.275244, -9.054041,'../www/img/Franciscan.jpg', "08:00, 11:00, 12:30, 15:00 (Filipino Community Mass; third Sunday only)", "Mon-Fri 13:10, 16:00, Mon + Tues + Sat 10:30, 13:10", "19:30", "Vigil 19:30, 13:10, 16:00");
new churchsObj('Galway Cathedral', 53.275154, -9.057522,'../www/img/Cathedral.jpg', "09:00, 10:00 (Gaeilge), 11:00, 12:30, 18:00", "09:00, 10:00, 18:00", "18:00", "Vigil 18:00, 09:00, 11:00, 18:00");
new churchsObj('Augustinian', 53.272145, -9.052120,'../www/img/Augustinian.JPG', "11:00, 18:30", "Mon-Sat 08:30, 10:00, 11:00", "18:30", "Vigil 18:30, 10:00, 11:00, 13:10, 18:30");
new churchsObj('Ballinfoyle', 53.291674, -9.040509,'../www/img/Ballinfoyle.jpg', "10:30, 13:00, 18:00", "Mon-Fri 09:30, Sat 11:00", "18:30", "Vigil 19:30, 13:10");
new churchsObj('Ballybane', 53.284807, -9.000950, '../www/img/Ballybane.JPG', "10:30, 12:00", "Mon, Tues, Fri, 10:00", "19:00", "Vigil 19:00, 10:30");
new churchsObj('Barna', 53.256205, -9.133771,'../www/img/barnachurch.jpg', "10:00, 12:00", "Mon, Tues, Wed, Fri, 10:00 Thurs 19:30", "19:30", "As above");
new churchsObj('Bushypark', 53.294214, -9.057522,'../www/img/Bushypark.jpg', "11:00", "Tues-Fri 10:00", "18:30", "10:00, 18:00");
new churchsObj('Castlegar', 53.294905, -9.012939,'../www/img/Castlegar.jpg', "11:00", "Mon - Wed 09:30, Thur + Fri 19:30", "20:00", "As Above");
new churchsObj('Claddagh', 53.266317, -9.057584, '../www/img/claddagh.jpg', "07:20, 10:00, 12:00, 19:30", "07:20, 10:00, 19:30", "19:30",  "Vigil 19:30, 07:30, 10:00, 12:00, 19:30");
new churchsObj('Coolough', 53.295633, -9.053011, '../www/img/coolchurch.jpg', "09:30", "N/A", "N/A", "19:30");
new churchsObj("Doughiska", 53.284046, -8.981242, '../www/img/Doughiska.jpg', "11:00", "09:30 (Mon-Fri)", "N/A", "As above" );
new churchsObj('Esker', 53.282522, -8.682143, '../www/img/Esker.PNG', "08:00, 10.00", "08:00, 10.00", "N/A", "08:00, 10:00");
new churchsObj('Knocknacarra', 53.263009, -9.118493, '../www/img/Knocknacarra.jpg', "09:30, 10:45, 12:00, 17:30", "09:30, 19:00, Thurs 20:00", "18:30", "Vigil 18:30, 09:30, 10:45, 19:30");
new churchsObj("Mervue", 53.282120, -9.015878, "../www/img/Mervue.jpg", "09:30, 11:30, 12:30", "Mon, Wed-Sat 10:00, Tues 19:30", "18:30", "Vigil 18:30, 09:30, 12:30");
new churchsObj("Newcastle", 53.342883, -8.682690, '../www/img/Newcastle.PNG', "10.00", "N/A", "N/A", "10:00");
new churchsObj('Renmore', 53.277143, -9.018907, '../www/img/Renmore.jpg', "10:00, 12:00", "Mon-Fri, 10:00 Thurs + Fri 19:30", "18:00", "Vigil 19:30, 10:00, 12:00");
new churchsObj('Westside', 53.276920, -9.073944, '../www/img/Westside.jpg', "10:00, 11:30", "Mon-Fri 10:00", "17:30", "10:00, 11:30");
new churchsObj("Salthill", 53.260797, -9.076168, "../www/img/Salthill.png", "09:30, 11:00, 12:30, 18:00", "10:00, 19:30", "17:30", "Vigil 19:30, 10:00, 19:30");

churchsObj.each(function(item) {

});

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
        creatNewChurchObject(newChurchName, changeChurchImage, newChurchLat, newChurchLong);
      } else if (newChurchLong !== false && changeChurchImage !== "../www/img/Generic.PNG"){
        creatNewChurchObject(newChurchName, changeChurchImage, newChurchLat, newChurchLong);
      }
    }
  }
}

var newChurchIndex = 0;
var newChurch = "";


var creatNewChurchObject = function (newChurchName, changeChurchImage, newChurchLat, newChurchLong) {
  newChurchName = new churchsObj(newChurchName, changeChurchImage, newChurchLat, newChurchLong, "n/a", "n/a", "n/a", "n/a");
  localStorage.setItem("appendedChurch", JSON.stringify(newChurch));
  newChurchIndex++;
  //console.log(retrievedObject);
  alert(newChurchName + " " + newChurchLat + " " + newChurchLong + " " + changeChurchImage);
  arrayRefresh(newChurchName);
  newChurchImage="";
}

function arrayRefresh(newChurchName) {
var churchName = newChurchName.churchname;
$('#selectChurch')
.append($("<option></option>")
.attr("value", churchsArr.length-1)
.text(churchName));
}

function arrayPop(){
  //var myDiv = document.getElementById("churchsDiv");
  //Create array of options to be added
  //Create and append select list
  var appendedChurch = JSON.parse(localStorage.getItem("appendedChurch"));
  var selectList = document.getElementById('selectChurch');
  //Create and append the options
  console.log(churchsArr.length);
  for (var i = 0; i < churchsArr.length; i++) {
    var option = document.createElement("option");
    option.id = churchsArr[i].churchname;
    option.value = [i];
    option.text = churchsArr[i].churchname;
    selectList.appendChild(option);
  }
  var option2 = document.createElement("option");
  option2.id = appendedChurch.churchname;
  option2.text = appendedChurch.churchname;
  selectList.appendChild(option2);
}

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
  massTimes(closest);
}

var selectedChurch = function() {
  var churchs = $("#selectChurch");
  $('option:selected').each(function() {
    var selectedChurch = churchs.val();
    console.log(selectedChurch);
    selected(selectedChurch);
    massTimes(selectedChurch);
  });
}

var selected = function(selectedChurch) {
  var selectBox = document.getElementById("mySelect");
  var selectedValue = JSON.stringify(churchsArr[selectedChurch].churchname);
  changeSelected(selectedChurch);
  return selectedValue;
}

function changeSelected(selected) {
  var backgroundImage = $ ('#home');
  backgroundImage.css('background-image', 'url(' + churchsArr[selected].img + ')');
  var closestChurch = $('#closest');
  closestChurch.text("You have selected the " + churchsArr[selected].churchname + " church");
}

function changeImage(imageData){
  var selectedValue = selected();
  churchsArr[selectedValue].img = imageData;
  changeSelected(selectedValue);
}

function massTimes(church) {
  var sunTimes = $('#Sunday');
  var weekTimes = $('#Weekly');
  var vigilTimes = $('#Vigil');
  var holydayTimes = $('#Holyday')
  sunTimes.text("Sunday - " + churchsArr[church].sunday +".");
  weekTimes.text("Weekdays - " + churchsArr[church].week +".");
  vigilTimes.text("Saturday Vigil - " + churchsArr[church].vigil +".");
  holydayTimes.text("Holydays - " + churchsArr[church].holy +".");
}

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

function start() {
  button();
  arrayPop();
}
window.onload = start;
