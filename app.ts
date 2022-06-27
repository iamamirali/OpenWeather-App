import { IWeatherData } from './models/weatherData.model'

const weatherCard: HTMLElement = document.querySelector('.weather-card')

// hides weather card from the start
weatherCard.setAttribute('style', 'display: none')

let loading = false

let selectedCity: HTMLElement;

function getData(city) {
    // loading is shown until data is loaded compeletely
    loading = true
    loadingSetter(undefined)

    weatherCard.setAttribute('style', 'display: block')

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=41f916b31af679c8c31a9e458d33d1a5`)
        .then(response => response.json())
        .then((data: IWeatherData | undefined) => {
            loading = false
            loadingSetter(data)
        })
}

// shows loading until data is loaded compeletely
function loadingSetter(data: IWeatherData | undefined) {
    if (loading) {
        weatherCard.innerHTML = `<div class="loading"><div/>`
    } else {
        htmlSetter(data)
    }
}

function htmlSetter(data: IWeatherData | undefined) {
    let statusImgSrc = toggleStatus(data)

    weatherCard.innerHTML = `
        <div class="city-name">
        <img src="./Images/pin.svg" class="location-icon" alt="">
        ${data.name}
        </div>
        
        <div class="city-weather-status">
        ${data.weather[0].main}
        </div>
        
        <div class="city-temperature">
            ${(data.main.temp - 273).toFixed(0)}
        </div>
        
        <div class="city-temp-icon-container">
        <img class="city-temp-icon" src=${statusImgSrc} alt="">
        </div>`
}

function toggleStatus(data: IWeatherData | undefined) {
    let imgSrc: string
    switch (data.weather[0].main.toLowerCase()) {
        case "clouds": imgSrc = './Images/cloud&sun.svg'
            break;
        case "clear": imgSrc = './Images/sunny.svg'
            break;
        case 'rain': imgSrc = './Images/rain.svg'
            break;
        case "cloudy": imgSrc = './Images/cloud.svg'
            break;
        default: imgSrc = './Images/sunny.svg'
    }
    return imgSrc
}

const cityList = document.getElementById('city-list') as HTMLElement

// city changer function, which calls fetch after choosing a city
cityList.onchange = () => {
    selectedCity = cityList[cityList.selectedIndex].value
    getData(selectedCity)
}