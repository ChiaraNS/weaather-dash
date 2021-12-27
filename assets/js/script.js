var apiLink = "api.openweathermap.org/data/2.5/weather?q=";
var apiKey = "&units=imperial&appid=6d2b688ce78d42718e021dc380b3cf82";
var cityInput = document.querySelector("#city-input");
var submitBtn = document.querySelector(".submit-btn");
var pastSearch = document.querySelector(".past-search");
var currentSearch = document.querySelector("#current-search");
var currentDate = document.querySelector("#current-date");
var currentTemp = document.querySelector(".current-temp");
var currentWind = document.querySelector(".current-wind");
var currentHumid = document.querySelector(".current-humidity");
var currentUv = document.querySelector(".current-uv");
var cityData = document.querySelector(".city-data");
var card = document.querySelector(".card");
var pastCities = JSON.parse(localStorage.getItem('cities')) || [];

submitBtn.addEventListener("click", function() {
    var cityValue = cityInput.value
    if (cityValue !=""){
        cityData.style.display="block"
        forecast(cityValue)
        
        cityInput.value = "";
        localStorage.setItem("cities", JSON.stringify(searches))
    } else{
        alert("Invalid Search")
    }
});

function citySearch(){
    pastSearch.innerHTML = ""
    for(var i = 0; i< pastCities.length; i++) {
        
    }
}