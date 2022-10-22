//GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var apiKey = "10866f66ad6bb865c9dbba843aef9fb8";

function grabWeather (cityName) {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    fetch(url)
    .then(response => response.json())
    .then(data => {console.log(data)
    //parse weather data, weather data is JSON format
        var temperature = data.main.temp
        var windSpeed = data.wind.speed
        var humidity = data.main.humidity
        var weather = data.weather[0].main
        //call weatherIcon function
        //take weather data, put into html
        var todaysWeather = document.querySelector("#todaysWeather")
        todaysWeather.textContent = temperature + "\n" + windSpeed + "\n" + humidity + "\n" + weather
    })
}

// grabWeather(cityName)

//search button
var searchButton = document.querySelector("#searchBtn")
searchButton.addEventListener('click', function() {
    var searchText = document.querySelector("#searchBox")
    var cityName = searchText.value
    grabWeather(cityName)
})





//weatherIcon function 
//if statements based on weather variable etc "clear, cloudy, rain, snow, mist"