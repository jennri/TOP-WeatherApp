import key from './APIkey';
import getWeatherData from './getWeather';

//Take note here
//to see whether checkbox is true or false, you queryselect the input, 
//not the input container nor the label
const search = document.querySelector('[cityform]')
const checkBox = document.querySelector('.checkbox')
const unitLabel = document.querySelector('#unitName')


search.addEventListener('click', e => {
    e.preventDefault();
    const city = document.querySelector('[cityinput]')
    if (city.value == null || city.value === "") return

    clearContent()
    let cityValue = city.value.toLowerCase();
    getWeatherData(cityValue)
    city.value = null;
})


checkBox.addEventListener('click', () => {
        unitChange()
})

//When another city is submitted, clears all the divs
function clearContent() {
    const content = document.querySelector('#content')
    const pageContent = document.querySelector('.page-content');
    const detailsContent = document.querySelector('.details-content')
    const weatherContainer = document.querySelector('.weather-content')
    if (pageContent) {
        content.removeChild(pageContent)
        content.removeChild(detailsContent)
        content.removeChild(weatherContainer)
    }
}


async function unitChange() {
    const displayCityName = document.querySelector('#cityNameId')
    let nameArr = displayCityName.innerHTML.split(",")
    let cityName = nameArr[0];

    if (checkBox.checked) {
        unitLabel.innerHTML = 'celsius'
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=` + key() + `&q=` + cityName, {
            mode: 'cors'
        }).then(function (response) {
            return response.json();
        }).then(function (response) {
            const tempC = document.querySelector('#currentTempId')
            tempC.textContent = response.current.temp_c + "°C"

            const feelsTempC = document.querySelector('#feelsLikeId')
            feelsTempC.textContent = "Feels like " + response.current.feelslike_c + "°C"
            console.log(tempC, feelsTempC)
        })
    } else {
        unitLabel.innerHTML = 'fahrenheit'
        console.log('Fa')
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=` + key() + `&q=` + cityName, {
            mode: 'cors'
        }).then(function (response) {
            return response.json();
        }).then(function (response) {
            const tempC = document.querySelector('#currentTempId')
            tempC.textContent = response.current.temp_f + "°F"
        
            const feelsTempC = document.querySelector('#feelsLikeId')
            feelsTempC.textContent = "Feels like " + response.current.feelslike_f + "°F"
            console.log(tempC, feelsTempC)
        })
    }
}




