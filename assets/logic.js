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
var weather = "";

window.onload = function (){
    var dayOneDate = moment().format('MMMM Do');
    var dayTwoDate = moment().add(1, 'days').format('MMMM Do');
    var dayThreeDate = moment().add(1, 'days').format('MMMM Do');
    var dayFourDate = moment().add(2, 'days').format('MMMM Do');
    var dayFiveDate = moment().add(3, 'days').format('MMMM Do');

    var dayOneText = document.querySelector('#dayOne')
    dayOneText.textContent += dayOneDate
    var dayTwoText = document.querySelector('#dayTwo')
    dayTwoText.textContent += dayTwoDate
    var dayThreeText = document.querySelector('#dayThree')
    dayThreeText.textContent += dayThreeDate
    var dayFourText = document.querySelector('#dayFour')
    dayFourText.textContent += dayFourDate
    var dayFiveText = document.querySelector('#dayFive')
    dayFiveText.textContent += dayFiveDate
}

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
        var todaysTemperature = document.querySelector("#temperatureInfo")
        todaysTemperature.textContent = "Temperature: " + temperature
        var todaysWind = document.querySelector("#windSpeedInfo")
        todaysWind.textContent = "Wind Speed: " + windSpeed
        var todaysHumidity = document.querySelector("#humidityInfo")
        todaysHumidity.textContent = "Humidity: " + humidity
        var todaysWeather = document.querySelector("#weatherInfo")
        todaysWeather.textContent = "Weather: " + weather
    })
}

//search button
var searchButton = document.querySelector("#searchBtn")
searchButton.addEventListener('click', function() {
    var searchText = document.querySelector("#searchBox")
    var cityName = searchText.value
    grabWeather(cityName)
    grabForecast(cityName)
    hideRemove()
})


//weatherIcon function 
//if statements based on weather variable etc "clear, cloudy, rain, snow, mist"

// function weatherIcon () {
//     var weather = document.querySelectorAll("#weatherInfo")
//     var image = document.querySelector("#img")
//     image.classList.add('clear')
//     if (weather.value == 'clear'){
//         image.classList.add('clear')
//     } else if (weather.value == 'cloudy')
//         image.classList.add('clouds')
// }

//function to remove hide property
function hideRemove () {
    let weatherBox = document.querySelectorAll('.weatherBox');
    for (var i = 0 ; i < weatherBox.length; i++) {
        weatherBox[i].style.display = 'inline-block'
    }
}

function grabForecast(cityName){
    var urlTwo = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
        fetch(urlTwo)
        .then(response => response.json())
        .then(data => {
            var dataWeather = data.list
            for (i = 0; i < dataWeather.length; i++) {
                var dateTimestamp = dataWeather[i].dt_txt
                var timeTimestamp = dateTimestamp.slice(11, 19)
                if (timeTimestamp == "12:00:00") {
                    console.log(dataWeather[i])
            }
        }
    })
}