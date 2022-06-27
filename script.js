"use strict";
exports.__esModule = true;
var weatherCard = document.querySelector('.weather-card');
// hides weather card from the start
weatherCard.setAttribute('style', 'display: none');
var loading = false;
var selectedCity;
function getData(city) {
    // loading is shown until data is loaded compeletely
    loading = true;
    loadingSetter(undefined);
    // shows weather card
    weatherCard.setAttribute('style', 'display: block');
    fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&appid=41f916b31af679c8c31a9e458d33d1a5"))
        .then(function (response) { return response.json(); })
        .then(function (data) {
        loading = false;
        loadingSetter(data);
    });
}
// shows loading until data is loaded compeletely
function loadingSetter(data) {
    if (loading) {
        weatherCard.innerHTML = "<div class=\"loading\"><div/>";
    }
    else {
        htmlSetter(data);
    }
}
function htmlSetter(data) {
    // swithching status src 
    var statusImgSrc = toggleStatus(data);
    // setting card content with given data
    weatherCard.innerHTML = "\n        <div class=\"city-name\">\n        <img src=\"./Images/pin.svg\" class=\"location-icon\" alt=\"\">\n        ".concat(data.name, "\n        </div>\n        \n        <div class=\"city-weather-status\">\n        ").concat(data.weather[0].main, "\n        </div>\n        \n        <div class=\"city-temperature\">\n            ").concat((data.main.temp - 273).toFixed(0), "\n        </div>\n        \n        <div class=\"city-temp-icon-container\">\n        <img class=\"city-temp-icon\" src=").concat(statusImgSrc, " alt=\"\">\n        </div>");
}
function toggleStatus(data) {
    var imgSrc;
    switch (data.weather[0].main.toLowerCase()) {
        case "clouds":
            imgSrc = './Images/cloud&sun.svg';
            break;
        case "clear":
            imgSrc = './Images/sunny.svg';
            break;
        case 'rain':
            imgSrc = './Images/rain.svg';
            break;
        case "cloudy":
            imgSrc = './Images/cloud.svg';
            break;
        default: imgSrc = './Images/sunny.svg';
    }
    return imgSrc;
}
// list of cities 
var cityList = document.getElementById('city-list');
// city changer function, which calls fetch after choosing a city
cityList.onchange = function () {
    selectedCity = cityList[cityList.selectedIndex].value;
    getData(selectedCity);
};
