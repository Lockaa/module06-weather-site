const weatherBtn = document.querySelector('#weather-btn');

function outputWeather() {
  const cityInput = document.querySelector('#city-input');
  const apiKey = '820214c8a31808ffafdb376998c9d618';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=imperial`;

  fetch(url)
    .then(function (responseObj) {
      return responseObj.json();
    })
    .then(function (data) {
      const html = `
    <h2>Temp: ${data.main.temp}</h2>
    `;
      const outputDiv = document.querySelector('.output');

      outputDiv.innerHTML = html;
    })
    .catch(function (error) {
      console.log(error);
    });
}

weatherBtn.addEventListener('click', outputWeather);