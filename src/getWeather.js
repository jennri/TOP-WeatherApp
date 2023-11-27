import key from './APIkey';

async function getWeatherData(cityValue) {
    //All of this is how to retrieve data using API
    //Fetch takes the API Key and the city input, followed by two .then funcitons
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=` + key() + `&q=` + cityValue, {
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

            //Appending current temp and weather icon
            const tempContent = document.createElement('div')
            const tempContentContainer = document.createElement('div')
            tempContentContainer.classList.add('temp-container')
            const weatherIcon = document.createElement('div')
            const weatherContainer = document.createElement('div')
            weatherContainer.classList.add('weather-content')

            //Used icons from the free weather API website. Downloaded them all and since each condition comes with a unique number,
            //the number is used to bring up the icon most suitable to the weather condition
            let iconDayNight = response.current.condition.icon.slice(35)
            const iconImg = new Image(100, 100)
            iconImg.setAttribute("src", "../dist/img/" + iconDayNight)
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
            const minmaxContent = document.createElement('div')
            minmaxContent.classList.add('minmax-content')
            const detailsContent = document.createElement('div')
            detailsContent.classList.add('details-content')

            const minTemp = document.createElement('h3')
            minTemp.setAttribute('id', 'minTempId')
            minTemp.textContent = "Min " + response.forecast.forecastday[0].day.mintemp_c + "°C" 
            minmaxContent.appendChild(minTemp)

            const maxTemp = document.createElement('h3')
            maxTemp.setAttribute('id', 'maxTempId')
            maxTemp.textContent = "Max " + response.forecast.forecastday[0].day.maxtemp_c + "°C"
            minmaxContent.appendChild(maxTemp)
            
            const humidity = document.createElement('h3')
            humidity.textContent = 'Humidity ' + response.current.humidity + " %"
            detailsContent.appendChild(humidity)

            const uv = document.createElement('h3')
            uv.textContent = 'UV ' + response.current.uv
            detailsContent.appendChild(uv)

            const windSpeed = document.createElement('h3')
            windSpeed.textContent = response.current.wind_kph + ' kp/h ' + response.current.wind_dir
            detailsContent.appendChild(windSpeed)

            content.appendChild(pageContent)
            content.appendChild(weatherContainer)
            content.appendChild(minmaxContent)
            content.appendChild(detailsContent)
        })

}

export default getWeatherData;