const weatherCard = document.querySelector('.weather-card')

// hides weather card from the start
weatherCard.style.display = 'none'

// data loading variable
let loading = false

// selected city variable
let selectedCity;

function getData(city) {
    // loading is shown until data is loaded compeletely
    loading = true
    loadingSetter()

    // shows weather card
    weatherCard.style.display = 'block'

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=41f916b31af679c8c31a9e458d33d1a5`)
    .then(response => response.json())
    .then(data => {
        loading = false
        loadingSetter(data)
    })
}

// shows loading until data is loaded compeletely
function loadingSetter(data) {
   if(loading) {
    weatherCard.innerHTML = `<div class="loading"><div/>`
   } else  {
    htmlSetter(data)
   }
}

function htmlSetter(data) {
    // status img src value
    let statusImgSrc;
    // swithching status src 
    switch (data.weather[0].main.toLowerCase()) {
        case "clouds": statusImgSrc = './Images/cloud&sun.svg'
        break;
        case "clear": statusImgSrc = './Images/sunny.svg'
        break;
        case 'rain': statusImgSrc = './Images/rain.svg'
        break;
        case "cloudy": statusImgSrc = './Images/cloud.svg'
        break;
        default: statusImgSrc = './Images/sunny.svg'
    }
    
    // setting card content with given data
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

// list of cities 
const cityList = document.getElementById('city-list')

// city changer function, which calls fetch after choosing a city
cityList.onchange = () => {
    selectedCity = cityList[cityList.selectedIndex].value
    getData(selectedCity)
}
