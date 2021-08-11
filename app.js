function getData() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=tehran&appid=41f916b31af679c8c31a9e458d33d1a5')
    .then(response => response.json())
    .then(data => htmlSetter(data))
}
getData()

const cityName = document.querySelector('.city-name')
const cityStatus = document.querySelector('.city-weather-status')
const cityTemperature = document.querySelector('.city-temperature')
const tempIcon = document.querySelector('.city-temp-icon')

function htmlSetter(data) {
    console.log(data);
    cityName.textContent = data.name
    cityStatus.textContent = data.weather[0].main
    // gets kelvin and converts it to celcius
    cityTemperature.textContent = (data.main.temp - 273).toFixed(0)
}