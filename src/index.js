
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



function unitChange(){
    if (checkBox.checked){
        unitLabel.innerHTML = 'celsius'
        console.log('cel')
    } else {
        unitLabel.innerHTML = 'fahrenheit'
        console.log('Fa')
     }
}