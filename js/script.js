const weatherBtn = document.getElementById('weather-btn');
const cityArray = [];
//function for outputting the weather
function outputWeather() {
  event.preventDefault()
  const cityInput = document.getElementById('city-input');
  const apiKey = '820214c8a31808ffafdb376998c9d618';

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?
                      q=${cityInput.value}&appid=${apiKey}&units=imperial`;
  fetch(weatherUrl)
    .then(function (responseObj) {
      return responseObj.json();
    })
    .then(function (data) {
      const html = `
      <h2>
        Temp: ${data.main.temp}
      </h2>
      `;
      //  <br>
      //  Wind: ${data.main.wind}
      //  <br>
      //  Humidity: ${data.main.humidity}
      
      const outputDiv = document.querySelector('.output');

      outputDiv.innerHTML = html;
    })
    .catch(function (error) {
      console.log(error);
    });
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
