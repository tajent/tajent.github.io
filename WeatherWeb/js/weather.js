var temp;

if (navigator.geolocation) {
  console.log("Getting coords");
  navigator.geolocation.getCurrentPosition(function onPosition(position) {
    console.log("Got coords");

    function updateBackground(image) {
      document.getElementById("body").style.backgroundImage = "url(" + image + ")";
    }

    function showWeather(weather) {
      switch (weather) {
        case "rain":
          updateBackground("/img/rain.jpg");
          break;
        case "cloudy":
          updateBackground("/img/cloudy.jpg");
          break;
        case "clear-day":
          updateBackground("/img/clear-day.jpg");
          break;
        case "clear-night":
          updateBackground("/img/clear-night.jpg");
          break;
        case "snow":
          updateBackground("/img/snow.jpg");
          break;
        case "sleet":
          updateBackground("/img/rain.jpg");
          break;
        case "wind":
          updateBackground("/img/wind.jpg");
          break;
        case "fog":
          updateBackground("/img/fog.jpg");
          break;
        case "partly-cloudy-day":
          updateBackground("/img/partly-cloudy-day.jpg");
          break;
        case "partly-cloudy-night":
          updateBackground("/img/partly-cloudy-night.jpg");
          break;
        default:
          updateBackground("/img/default.jpg");
      }
    }

    function buildWeatherUrl(coords) {
      return "https://crossorigin.me/https://api.darksky.net/forecast/4924a4b17c6e9ad716b4b67b4c27b67f/"
        + coords.latitude
        + ","
        + coords.longitude
        + "?units=si";
    }

    console.log('Checking weather...');
    $.getJSON(buildWeatherUrl(position.coords), function(json) {
      console.log("Got weather, updating page");
      $(".loader").hide();

  		temp = parseInt(json.currently.temperature);
      $(".temperature").html(temp);
      $("#cel").html("&deg;C");
      $("#far").html("&deg;F");
      $(".city").html(json.timezone);
      $(".weather_type").html(json.currently.icon);
      showWeather(json.currently.icon)
    });
  });
  function showCelsius() {
    $(".temperature").html(temp);
    document.getElementById("far").style.fontSize = "small";
    document.getElementById("cel").style.fontSize = "large";

  }
  function showFahrenheit() {
    var fahrenheit = parseInt(temp) * 9/5 + 32;
        $(".temperature").html(fahrenheit);
        document.getElementById("far").style.fontSize = "large";
        document.getElementById("cel").style.fontSize = "small";

  }
}
