import key from './APIkey';
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

async function getWeatherData(cityValue) {

    //All of this is how to retrieve data using API
    //Fetch takes the API Key and the city input, followed by two .then funcitons
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=`+key()+`&q=`+cityValue, {
        mode: 'cors'
    }).then(function(response) {
        return response.json();
    })
    .then(function(response) {
        const content = document.querySelector('#content')
        const pageContent = document.createElement('div')
        pageContent.classList.add('page-content')
    
        const displayCityName = document.createElement('h2')
        displayCityName.textContent = response.location.name + ", " + response.location.country
        pageContent.appendChild(displayCityName)


        const weatherContent = document.createElement('div')
        const weatherIcon = document.createElement('div')

        const weatherContainer = document.createElement('div')
        weatherContainer.classList.add('weather-content')

        let iconValue = response.current.condition.icon.slice(-7, -4)

        const imgg = new Image(100, 100)
        imgg.setAttribute("src", "E:/Programming Learning/Git Repos/TOP-WeatherApp/dist/img/day/" + iconValue + ".png")
        weatherIcon.appendChild(imgg)

        const tempC = document.createElement('h1')
        tempC.textContent = response.current.temp_c + "°C"
        weatherContent.appendChild(tempC)

        const feelsTempC = document.createElement('p')
        feelsTempC.textContent = "Feels like " + response.current.feelslike_c + "°C"
        weatherContent.appendChild(feelsTempC)


        weatherContainer.appendChild(weatherIcon)
        weatherContainer.appendChild(weatherContent)

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

