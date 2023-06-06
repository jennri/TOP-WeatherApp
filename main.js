//Take note here
//to see whether checkbox is true or false, you queryselect the input, 
//not the input container nor the label
const search = document.querySelector('[cityform]')
const checkBox = document.querySelector('.checkbox')
const unitLabel = document.querySelector('#unitName')


search.addEventListener('click', e => {
    e.preventDefault();
    const city = document.querySelector('[cityinput]')
    const unitSwitch = document.querySelector('#switchContainer')
    const content = document.querySelector('#content')
    const form = document.querySelector('[cityform]')
    if (city.value === null || city.value === "") return
    clearContent()
    unitSwitch.classList.add('active')
    content.classList.add('active')
    form.classList.add('active')
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
        unitLabel.innerHTML = '°C'
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=` + key() + `&q=` + cityName, {
            mode: 'cors'
        }).then(function (response) {
            return response.json();
        }).then(function (response) {
            const tempC = document.querySelector('#currentTempId')
            tempC.textContent = response.current.temp_c + "°C"

            const feelsTempC = document.querySelector('#feelsLikeId')
            feelsTempC.textContent = "Feels like " + response.current.feelslike_c + "°C"
        })
    } else {
        unitLabel.innerHTML = '°F'
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=` + key() + `&q=` + cityName, {
            mode: 'cors'
        }).then(function (response) {
            return response.json();
        }).then(function (response) {
            const tempC = document.querySelector('#currentTempId')
            tempC.textContent = response.current.temp_f + "°F"

            const feelsTempC = document.querySelector('#feelsLikeId')
            feelsTempC.textContent = "Feels like " + response.current.feelslike_f + "°F"
        })
    }
}




function key(){
    const APIkey= '88261321c9f046fcade100409230306';
    return APIkey;
}

async function getWeatherData(cityValue) {
    //All of this is how to retrieve data using API
    //Fetch takes the API Key and the city input, followed by two .then funcitons
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=` + key() + `&q=` + cityValue, {
        mode: 'cors'
    }).then(function (response) {
        return response.json();
    })
        .then(function (response) {
            //Linking to the HTML div, then creating another div that will display and render all the data
            const content = document.querySelector('#content')
            const pageContent = document.createElement('div')
            pageContent.classList.add('page-content')

            //Appending location to weather card
            const displayCityName = document.createElement('h2')
            displayCityName.setAttribute('id', 'cityNameId')
            displayCityName.textContent = response.location.name + ", " + response.location.country
            pageContent.appendChild(displayCityName)

            //Appending current temp, min/max temperatures and weather icon
            const tempContent = document.createElement('div')
            const tempContentContainer = document.createElement('div')
            tempContentContainer.classList.add('temp-container')
            const weatherIcon = document.createElement('div')
            const weatherContainer = document.createElement('div')
            weatherContainer.classList.add('weather-content')

            //Used icons from the free weather API website. Downloaded them all and since each condition comes with a unique number,
            //the number is used to bring up the icon most suitable to the weather condition
            let iconValue = response.current.condition.icon.slice(-7, -4)
            const iconImg = new Image(100, 100)
            iconImg.setAttribute("src", "img/day/" + iconValue + ".png")
            weatherIcon.appendChild(iconImg)

            const tempC = document.createElement('h1')
            tempC.setAttribute('id', 'currentTempId')
            tempC.textContent = response.current.temp_c + "°C"
            tempContent.appendChild(tempC)

            const feelsTempC = document.createElement('p')
            feelsTempC.setAttribute('id', 'feelsLikeId')
            feelsTempC.textContent = "Feels like " + response.current.feelslike_c + "°C"
            tempContent.appendChild(feelsTempC)

            tempContentContainer.appendChild(tempContent)
            weatherContainer.appendChild(weatherIcon)
            weatherContainer.appendChild(tempContentContainer)

            //Appending other details to weather card
            const detailsContent = document.createElement('div')
            detailsContent.classList.add('details-content')

            const humidity = document.createElement('h3')
            humidity.setAttribute('class', 'contentDetailsHumidity')
            humidity.textContent = 'Humidity ' + response.current.humidity + " %"
            detailsContent.appendChild(humidity)

            const uv = document.createElement('h3')
            uv.textContent = 'UV ' + response.current.uv
            detailsContent.appendChild(uv)

            const windSpeed = document.createElement('h3')
            windSpeed.setAttribute('class', 'contentDetailsSpeed')
            windSpeed.textContent = response.current.wind_kph + ' kp/h'
            detailsContent.appendChild(windSpeed)

            content.appendChild(pageContent)
            content.appendChild(weatherContainer)
            content.appendChild(detailsContent)
        })

}
