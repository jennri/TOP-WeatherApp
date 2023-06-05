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
    const content = document.querySelector("#content")
    const pageContent = document.querySelector(".page-content");
    const detailsContent = document.querySelector(".details-content")
    if (pageContent){
        content.removeChild(pageContent)
        content.removeChild(detailsContent)
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

        const feelsTempC = document.createElement('p')
        feelsTempC.textContent = "Feels like " + response.current.feelslike_c + "°C"
        pageContent.appendChild(feelsTempC)

        const tempC = document.createElement('h1')
        tempC.textContent = response.current.temp_c + "°C"
        pageContent.appendChild(tempC)

        const img = document.createElement('h2')
        img.textContent = response.current.condition.text
        pageContent.appendChild(img)

        // const imgg = document.createElement(img)
        // imgg.src = response.current.condition.icon
        // pageContent.appendChild(imgg)

        console.log(response)
        // switch (response.current.condition){
        //     case 'Sunny':
        //         image.src = 'images/clear.png';
        //         break;

        //     case 'Rain':
        //         image.src = 'images/rain.png';
        //         break;

        //     case 'Snow':
        //         image.src = 'images/snow.png';
        //         break;

        //     case 'Partly cloudy':
        //         image.src = 'images/cloud.png';
        //         break;

        //     case 'Haze':
        //         image.src = 'images/mist.png';
        //         break;

        //     default:
        //         image.src = '';
        // }  

        const uv = document.createElement('h3')
        uv.textContent = 'UV ' + response.current.uv
        pageContent.appendChild(uv)


        const detailsContent = document.createElement('div')
        detailsContent.classList.add('details-content')

        const humidity = document.createElement('h3')
        humidity.setAttribute('class', 'contentDetailsHumidity')
        humidity.textContent = 'Humidity ' + response.current.humidity + " %"
        detailsContent.appendChild(humidity)

        const windSpeed = document.createElement('h3')
        windSpeed.setAttribute('class', 'contentDetailsSpeed')
        windSpeed.textContent = response.current.wind_kph + ' kp/h'
        detailsContent.appendChild(windSpeed)

        content.appendChild(pageContent)
        content.appendChild(detailsContent)
    
    })
 
}

