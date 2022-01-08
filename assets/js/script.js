var apiLink = "https://api.openweathermap.org/data/2.5/weather?q=";
var forecastApi = "https://api.openweathermap.org/data/2.5/forecast?q=";
var apiKey = "&units=imperial&appid=6d2b688ce78d42718e021dc380b3cf82";
var uvApi = "https://api.openweathermap.org/data/2.5/onecall?";
var cityInput = document.querySelector(".city-input");
var submitBtn = document.querySelector(".submit-btn");
var pastSearch = document.querySelector(".past-search");
var currentSearch = document.querySelector("#current-search");
var currentDate = document.querySelector("#current-date");
var currentTemp = document.querySelector(".current-temp");
var currentWind = document.querySelector(".current-wind");
var currentHumid = document.querySelector(".current-humidity");
var currentUv = document.querySelector(".current-uv");
var cityData = document.querySelector(".city-data");
var card = document.querySelector(".future-days");
var pastCities = JSON.parse(localStorage.getItem('cities')) || [];


function getWeather(inputSearch) {
  //weather Api
    var cityCall = apiLink + inputSearch + apiKey;
    fetch(cityCall)
    .then(function(search) {
     // console.log(cityCall);
        return search.json();
    })
    .then(function(search) {
        //console.log(search.coord.lat);
        // console.log(search.coord.lon);
        var lat = search.coord.lat;
        var lon = search.coord.lon;
        fetch(uvApi + "lat=" + lat + "&lon=" + lon + apiKey) //lat & lon for Uv Index
        .then(function(res) {
            return res.json();
        })
        .then(function(uvData) {
            // console.log(uvData.current.uvi)
            var uvInfo = uvData.current.uvi;
            currentSearch.textContent = inputSearch
            currentDate.textContent = moment().format('MMM D, YYYY');
            currentTemp.textContent = "Temperature: " + search.main.temp + " °F";
            currentWind.textContent = "Wind: " + search.wind.speed + " MPH";
            currentHumid.textContent = "Humidity: " + search.main.humidity + "%";
            currentUv.textContent = "UV Index: " + uvInfo;

            //color coding Uv Index
            if(uvInfo <= 3) {
                currentUv.className = "badge alert-success"
            } else if(uvInfo <= 6) {
                currentUv.className = "badge alert-warning"
            } else {
                currentUv.className = "badge alert-danger"
            }
        })
        
    })
}

//creating the list of the past searches 
function renderCities(){
  pastSearch.innerHTML = ""
  for(var i = 0; i< pastCities.length ; i++) {
    var previousCity = document.createElement('div');
    var pastList  = document.createTextNode(pastCities[i]);
    previousCity.className = '(previousCity d-block bg-light p-2 mb-1';
    previousCity.appendChild(pastList);
    previousCity.addEventListener('click' ,function(){
      getWeather(this.textContent)
      this.classList.add("active")
    })
    pastSearch.appendChild(previousCity);  
  }
}  

//five day forecast
function forecast(fiveDays) {
  var forcastCall= forecastApi + fiveDays + apiKey;
  fetch(forcastCall)
  .then(function(response) {
    //console.log(forcastCall);
    return response.json();
  })
  .then(function(data) {
    console.log(data.list)  
    console.log(data)  

    card.textContent = "";

    for (var i = 5; i < data.list.length; i = i + 8) {
    
      var cardJs = document.createElement('div')
      cardJs.classList.add("card");
      
      var cardDay = document.createElement('h3');
      cardDay.classList.add("card-day");
      cardDay.textContent = moment.unix(data.list[i].dt).format("MMM D, YYYY");
      cardJs.appendChild(cardDay);

      var img = document.createElement('img');
      img.classList.add("img");
      img.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png");
      cardJs.appendChild(img);

      var cardTemp = document.createElement('p');
      cardTemp.classList.add("card-temp");
      cardTemp.textContent = "Temp: " + data.list[i].main.temp + "°F";
      cardJs.appendChild(cardTemp);

      var cardWind = document.createElement('p');
      cardWind.classList.add("card-wind");
      cardWind.textContent = "Wind: " + data.list[i].wind.speed + "mps";
      cardJs.appendChild(cardWind);

      var cardHumid = document.createElement('p');
      cardHumid.classList.add("card-humidity");
      cardHumid.textContent = "Humidity: " + data.list[i].main.humidity + "%";
      cardJs.appendChild(cardHumid);
    
      card.append(cardJs);
    }
  }) 
};

//search button
submitBtn.addEventListener("click", function() {
  var inputVal = cityInput.value
  if (inputVal !=""){
  cityData.style.display="block"
  getWeather(inputVal)
  forecast(inputVal)
  pastCities.unshift(inputVal); 
  renderCities()
  cityInput.value = "";
  localStorage.setItem("cities", JSON.stringify(pastCities))
  }else{
  alert("Enter a city")
  }
  });
