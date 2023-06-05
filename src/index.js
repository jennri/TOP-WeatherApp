import key from './APIkey';
const search = document.querySelector('[cityform]')


search.addEventListener('click', e => {
    e.preventDefault();
    const city = document.querySelector('[cityinput]')
        if (city.value == null || city.value === "") return

    let cityValue = city.value.toLowerCase();
    getWeatherData(cityValue)
    city.value = null;

})

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
        displayCityName.textContent = response.location.name;
        pageContent.appendChild(displayCityName)

        const displayLocalTime = document.createElement('p')
        displayLocalTime.textContent = response.location.localtime;
        pageContent.appendChild(displayLocalTime)

        const tempC = document.createElement('h1')
        tempC.textContent = response.current.temp_c + "°C"
        pageContent.appendChild(tempC)

        const feelsTempC = document.createElement('h2')
        feelsTempC.textContent = response.current.feelslike_c + "°C"
        pageContent.appendChild(feelsTempC)

        const humidity = document.createElement('h2')
        humidity.textContent = response.current.humidity + "%"
        pageContent.appendChild(humidity)

        const uv = document.createElement('h2')
        uv.textContent = response.current.uv
        pageContent.appendChild(uv)

        const windSpeed = document.createElement('h2')
        windSpeed.textContent = response.current.wind_kph 
        pageContent.appendChild(windSpeed)

        const windDir = document.createElement('h2')
        windDir.textContent = response.current.wind_dir
        pageContent.appendChild(windDir)

        content.appendChild(pageContent)
    
    })
 
}

