const weatherBtn = document.getElementById('weather-btn');
const apiKey = '820214c8a31808ffafdb376998c9d618';
const secondApiKey = '996b5fa3416b1804f4d4cda0e5653d5d';
const cityArray = [];
//function for outputting the weather
function outputWeather() {
  event.preventDefault();
  const cityInput = document.getElementById('city-input');

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=imperial`;
  $.get(weatherUrl)
    .then(function (data) {
      currentDate = new Date();
      const weatherResults = 
      `<h2>
        ${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}
        <br>
        Temp: ${data.main.temp} &deg
        <br>
        Wind: ${data.wind.speed} MPH
        <br>
        Humidity: ${data.main.humidity}%
      </h2>`;
      const outputDiv = document.getElementById('weather-output');
      outputDiv.innerHTML = weatherResults;      
      //call the forcast function since we have the values
      outputForecast(data.coord.lat, data.coord.lon);
      
    }
  )
}

function outputForecast(cityLatIn, cityLonIn) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLatIn}&lon=${cityLonIn}&appid=${secondApiKey}&units=imperial`;
  $.get(forecastUrl)
    .then(function (data) {
      const outputDiv = document.getElementById('forecast-output');
      const forecastResult = 'YIPPEE!';
      outputDiv.innerHTML = forecastResult;
    }
  )
}

//function for storing the city to localStorage
function storeCity() {
  const cityInput = document.getElementById('city-input');
  cityArray.push(cityInput.value);
  localStorage.setItem("data", JSON.stringify(cityArray));
  console.log(JSON.parse(localStorage.getItem("data")));
}

weatherBtn.addEventListener('click', outputWeather);
weatherBtn.addEventListener('click', storeCity);


//TODO: 
//figure out bad fetch (something with cityInput.value)
//print out the local storage
//format stuff
