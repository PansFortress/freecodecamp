var state = {
  "measurement":"C",
  "weather":{}
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

     console.log("Hello");
    $.getJSON(get_endpoint(lat,long), function(r){
      state.weather = {
        "celsius": Math.round(r.main.temp),
        "fahrenheit": convert_to_fahrenheit(r.main.temp),
        "description": r.weather[0].description,
        "icon": r.weather[0].icon,
        "city":r.name,
        "country": r.sys.country
      }
      render();
    });
    
  });
}

var get_endpoint = function(lat, long){
  return `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`;
};

var convert_to_fahrenheit = function(celsius){
  return Math.round(celsius * (9/5) + 32);
};

var convert_to_celsius = function(fahrenheit){
  return Math.round(fahrenheit - 32 * (5/9));
};

var render = function(){
  if(state.weather){
    $("#welcome").html("<h2>Currently in " + state.weather.city + ", " + state.weather.country + "</h2>")
    $("#details").html("<img src=" + state.weather.icon+" class='weather-icon' alt='" + state.weather.description + "icon '" + "/>");
    if(state.measurement=="C"){
      $("#temperature").html("<h3>Celsius: " + state.weather.celsius + "°</h3>");
    }else if(state.measurement=="F"){
      $("#temperature").html("<h3>Fahrenheit: " + state.weather.fahrenheit + "°</h3>");
    }
  }
};

//event listener
$("#temperature").on("click", function(){
  if(state.measurement=="C"){
    state.measurement = "F";
    $("#temperature").html("<h3>Fahrenheit: " + state.weather.fahrenheit + "°</h3>");
  } else{
    state.measurement = "C";
    $("#temperature").html("<h3>Celsius: " + state.weather.celsius + "°</h3>");
    }
});