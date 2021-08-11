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
    cityName.textContent = data.name

    cityStatus.textContent = data.weather[0].main
    
    // gets kelvin and converts it to celcius
    cityTemperature.textContent = (data.main.temp - 273).toFixed(0)

    // city tem icon changer function
    tempIconSetter(data)
}

function tempIconSetter(data) {
    switch (data.weather[0].main.toLowerCase()) {
        case "clouds": tempIcon.src = './Images/cloud&sun.svg'
        break;
        case "sunny": tempIcon.src = './Images/sunny.svg'
        break;
        case "cloudy": tempIcon.src = './Images/cloud.svg'
        break;
        default: tempIcon.src = './Images/sunny.svg'
    }
}