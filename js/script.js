const weatherBtn = document.getElementById('weather-btn');
const apiKey = '820214c8a31808ffafdb376998c9d618';
const secondApiKey = '996b5fa3416b1804f4d4cda0e5653d5d';
const cityArray = [];
//function for outputting the weather
function outputWeather(cityIn) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityIn}&appid=${apiKey}&units=imperial`;
  $.get(weatherUrl)
    .then(function (data) {
      currentDate = new Date();
      const weatherResults = 
      `<div>
        <h1>${cityIn}</h1>
        <br>
        <h2>${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}</h2>
        <br>
        <img src= "https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon image">
        <br>
        Temp: ${data.main.temp} &deg
        <br>
        Wind: ${data.wind.speed} MPH
        <br>
        Humidity: ${data.main.humidity} %
      </div>`;
      const weatherOutput = document.getElementById('weather-output');
      weatherOutput.innerHTML = weatherResults;     
      //call the forcast function since we have the values
      outputForecast(data.coord.lat, data.coord.lon);
      
    }
  )
}

function outputForecast(cityLatIn, cityLonIn) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLatIn}&lon=${cityLonIn}&appid=${secondApiKey}&units=imperial`;
  $.get(forecastUrl)
    .then(function (data) {
      var $forecastOutput = $('.forecast-output');
      // Filter out from the 40 weather objects you receive, the 5 noon time weather objects for the next 5 days
      const filtered = data.list.filter(function (weatherObj) {
        if (weatherObj.dt_txt.includes('12')) return true;
      });
      //clearing out the previous result
      $forecastOutput.empty();
      //outputing the first 5
      for(var i = 0; i < 5; i++) {
        tempObj = filtered[i];
        forecastDate = new Date(tempObj.dt_txt);
        $forecastOutput.append(
          `<div>
            <h2>${forecastDate.getMonth()+1}/${forecastDate.getDate()}/${forecastDate.getFullYear()}</h2>
            <br>
            <img src="https://openweathermap.org/img/wn/${tempObj.weather[0].icon}@2x.png" alt="weather icon image">
            <br>
            Temp: ${tempObj.main.temp} &deg
            <br>
            Wind: ${tempObj.wind.speed} MPH
            <br>
            Humidity: ${tempObj.main.humidity} %
          </div>`
        )
      }
    })
}
//function for storing the city to localStorage
function outputCities() {
  const cityInput = document.getElementById('city-input');
  cityArray.push(cityInput.value);
  localStorage.setItem("data", JSON.stringify(cityArray));
  const $cityOutput = $('.storage-output');
  $cityOutput.empty();
  
  //could also do forEach here, just JS forEach's are weird
  for(var i = 0; i < JSON.parse(localStorage.getItem("data")).length; i++) {
    let newButton = $("<div>");
    newButton.text(JSON.parse(localStorage.getItem("data"))[i])
    newButton.click(historySearch)
    $cityOutput.append(newButton)
  }
  localStorage.clear();

}

function historySearch(event){
outputWeather(event.target.innerHTML);
}

function startWeather(event){
  event.preventDefault();
  const cityInput = document.getElementById('city-input');
  outputWeather(cityInput.value)
  outputCities();
}

weatherBtn.addEventListener("submit", startWeather);


