const weatherBtn = document.getElementById('weather-btn');

function outputWeather() {
  const cityInput = document.getElementById('city-input');
  const apiKey = '820214c8a31808ffafdb376998c9d618';

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=${apiKey}&units=imperial`;
  //https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLong}&appid=${apiKey}
  fetch(weatherUrl)
    .then(function (responseObj) {
      return responseObj.json();
    })
    .then(function (data) {
      const html = `
      <h2>
        Temp: ${data.main.temp}
        <br>
        Wind: ${data.main.wind}
        <br>
        Humidity: ${data.main.humidity}
      </h2>
      `;
      const outputDiv = document.querySelector('.output');

      outputDiv.innerHTML = html;
    })
    .catch(function (error) {
      console.log(error);
    });
}

if(weatherBtn) {
  weatherBtn.addEventListener('click', outputWeather);
  console.log("button's good");
}
else {
  console.log("button potatoed");
}