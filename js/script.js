const weatherBtn = document.getElementById('weather-btn');
const cityArray = [];
//function for outputting the weather
function outputWeather() {
  event.preventDefault()
  const cityInput = document.getElementById('city-input');
  const apiKey = '820214c8a31808ffafdb376998c9d618';

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=imperial`;
  fetch(weatherUrl)
    .then(function (responseObj) {
      return responseObj.json();
    })
    .then(function (data) {
      const html = 
      `<h2>
        lon: ${data.coord.lon}
        <br>
        lat: ${data.coord.lat}
        <br>
        ${data.dt}
        <br>
        Temp: ${data.main.temp}
        <br>
        Wind: ${data.wind.speed}
        <br>
        Humidity: ${data.main.humidity}
      </h2>`;
      const outputDiv = document.querySelector('.output');
      
      const cityCoord = data.coord;
      //call the forcast function since we have the values
      outputForecast(coord.lat, coord.lon);
      outputDiv.innerHTML = html;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function outputForecast(cityLatIn, cityLonIn) {
  event.preventDefault()
  const cityInput = document.getElementById('city-input');
  const apiKey = '820214c8a31808ffafdb376998c9d618';

  //throwing back an 'unauthorized' error
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${cityLatIn}&lon=${cityLonIn}&cnt=${5}&appid=${apiKey}&units=imperial`;
  fetch(forecastUrl)
    .then(function (responseObj) {
      return responseObj.json();
    })
    .then(function (data) {
      const html = 
      `<h2>
      
        Temp: ${data.list.temp.day}
      </h2>`;
      const outputDiv = document.querySelector('.output');

      outputDiv.innerHTML = html;
    })
}

//function for storing the city to localStorage
function storeCity() {
  const cityInput = document.getElementById('city-input');
  cityArray.push(cityInput.value);
  localStorage.setItem("data", JSON.stringify(cityArray));
  console.log(JSON.parse(localStorage.getItem("data")));
}

weatherBtn.addEventListener('click', outputWeather);
weatherBtn.addEventListener('click', outputForecast);
weatherBtn.addEventListener('click', storeCity);


//TODO: 
//figure out bad fetch (something with cityInput.value)
//print out the local storage
//format stuff
