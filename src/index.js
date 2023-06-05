
import getWeatherData from './getWeather';
const search = document.querySelector('[cityform]')


search.addEventListener('click', e => {
    e.preventDefault();
    const city = document.querySelector('[cityinput]')
        if (city.value == null || city.value === "") return
    
    clearContent()
    let cityValue = city.value.toLowerCase();
    getWeatherData(cityValue)
    city.value = null;

})

//When another city is submitted, clears all the divs
function clearContent(){
    const content = document.querySelector('#content')
    const pageContent = document.querySelector('.page-content');
    const detailsContent = document.querySelector('.details-content')
    const weatherContainer = document.querySelector('.weather-content')
    if (pageContent){
        content.removeChild(pageContent)
        content.removeChild(detailsContent)
        content.removeChild(weatherContainer)
    }
}

const checkBox = document.querySelector('#checkbox')
const unitLabel = document.querySelector('#unitName')

checkBox.addEventListener('click', () => {
    if (checkBox.checked == true){
        unitLabel.innerHTML = 'celsius'
    } else {
        unitLabel.innerHTML = 'fahrenheit'
     }
})
