var currentDegree;

$(document).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var longPos = "lon=" + position.coords.longitude;
      var latPos = "lat=" + position.coords.latitude;
      GetWeather(longPos, latPos);
    });
  }
  else {
    $("#locName").text("Weather information is unavailable.");
  }
  
  $("#degreeLetter").click(function(){
    if ($("#degreeLetter").text() == "C") {
      var fahren = ((currentDegree) * 9 / 5 + 32).toFixed(2);
      $("#temp").text(fahren + " " + String.fromCharCode(176));
      $("#degreeLetter").text("F"); 
    }
    else {
      $("#temp").text(currentDegree + " " + String.fromCharCode(176));
      $("#degreeLetter").text("C");
    }
  });
});



function GetWeather(longitude, latitude) {
  var urlString = "https://fcc-weather-api.glitch.me/api/current?" + longitude + "&" + latitude;
  $.ajax({
    url: urlString,
    success: function(response) {
      $("#locName").text(response.name + ", " + response.sys.country);
      $("#desc").text(response.weather[0].main);
      $("#temp").text(response.main.temp + " " + String.fromCharCode(176));
      $("#degreeLetter").text("C");
      currentDegree = response.main.temp;
      IconGen(response.weather[0].main);   
    }
  })
}

function IconGen(desc) {
  var desc = desc.toLowerCase()
  switch (desc) {
    case 'drizzle':
      addIcon(desc)
      break;
    case 'clouds':
      addIcon(desc)
      break;
    case 'rain':
      addIcon(desc)
      break;
    case 'snow':
      addIcon(desc)
      break;
    case 'clear':
      addIcon(desc)
      break;
    case 'thunderstom':
      addIcon(desc)
      break;
    default:
      $('div.clouds').removeClass('hide');
  }
}

function addIcon(desc) {
  $('div.' + desc).removeClass('hide');
}
