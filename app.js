const weatherCard = document.querySelector('.weather-card')

// hides weather card from the start
weatherCard.style.display = 'none'

// selected city variable
let selectedCity;

function getData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=41f916b31af679c8c31a9e458d33d1a5`)
    .then(response => response.json())
    .then(data => htmlSetter(data))
    // shows weather card
    .then(weatherCard.style.display = 'block')

}

const cityName = document.querySelector('.city-name')
const cityStatus = document.querySelector('.city-weather-status')
const cityTemperature = document.querySelector('.city-temperature')
const tempIcon = document.querySelector('.city-temp-icon')

function htmlSetter(data) {
    cityName.innerHTML = `<img src="./Images/pin.svg" class="location-icon" alt="">${data.name}`

    cityStatus.textContent = data.weather[0].main
    
    // gets kelvin and converts it to celcius
    cityTemperature.innerHTML = (data.main.temp - 273).toFixed(0)

    // city temp icon changer function
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


// list of cities 
const cityList = document.getElementById('city-list')

// city changer function, which calls fetch after choosing a city
cityList.onchange = () => {
    selectedCity = cityList[cityList.selectedIndex].value
    getData(selectedCity)
}
