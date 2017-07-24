var temp;

if (navigator.geolocation) {
  console.log("Getting coords");
  navigator.geolocation.getCurrentPosition(function onPosition(position) {
    console.log("Got coords");
    $(document).ready(
      function updateWeather() {
        function updateBackground(image) {
          document.getElementById("body").style.backgroundImage = "url(" + image + ")";
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

      		temp = parseInt(json.currently.temperature);
          $(".temperature").html(temp);

          $(".city").html(json.timezone);
          $(".type").html(json.currently.icon);
          if (json.currently.icon == "cloudy") {
            updateBackground("/img/clouds.jpg");
          } else if (json.currently.icon == "rain") {
            updateBackground("/img/rain.jpg");
          } else {
            updateBackground("/img/default.jpg");
          }
        });
      });
  });
}

$("#unit").on("click", function() {
if ($("#unit").html() == "&deg;C") {
    $("#unit").html("&deg;F");
    var fahrenheit = parseInt(temp) * 9/5 + 32;
        $(".temperature").html(fahrenheit);
} else {
  $("#unit").html("&deg;C");
  $(".temperature").html(temp);
}
});
