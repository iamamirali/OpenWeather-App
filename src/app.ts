import { IWeatherData } from './models/WeatherData.model'
import { WeatherIcon } from './models/weatherStatus.model';
import { Loading } from './services/loading.service';

const weatherCard: HTMLElement = document.querySelector('.weather-card')

// hides weather card from the start
weatherCard.setAttribute('style', 'display: none')

let selectedCity: HTMLElement;

const cityList = document.getElementById('city-list') as HTMLElement

const loading = new Loading()
loading.setContainer(weatherCard)

// city changer function, which calls fetch after choosing a city
cityList.onchange = () => {
    selectedCity = cityList[cityList.selectedIndex].value
    getData(selectedCity)
}

function getData(city) {
    weatherCard.setAttribute('style', 'display: block')

    // loading is shown until data is loaded compeletely
    loading.toggleLoading('')

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=41f916b31af679c8c31a9e458d33d1a5`)
        .then(response => response.json())
        .then((data: IWeatherData | undefined) => {
            let statusImgSrc = toggleStatus(data)
            loading.setData(data)
            loading.toggleLoading(`
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
            </div>`)
        })
}

function toggleStatus(data: IWeatherData | undefined) {
    // return one of properties of enum dynamically by data status
    return WeatherIcon[`${data.weather[0].main.toLowerCase()}`]
}