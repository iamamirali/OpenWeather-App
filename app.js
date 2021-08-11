// whole data variable
let weatherData;

// gets data with api
function getData() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=eslamshahr&appid=41f916b31af679c8c31a9e458d33d1a5')
    .then(response => response.json())
    .then(data => htmlSetter(data))
}
getData()

// 