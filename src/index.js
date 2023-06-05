
const search = document.querySelector('[cityform]')

search.addEventListener('click', e => {
    e.preventDefault();
    const APIkey= '88261321c9f046fcade100409230306'
    const city = document.querySelector('[cityinput]')
        if (city.value == null || city.value === "") return

    let cityValue = city.value.toLowerCase();

    //All of this is how to retrieve data using API
    //Fetch takes the API Key and the city input, followed by two .then funcitons
    fetch(`https://api.weatherapi.com/v1/current.json?key=`+APIkey+`&q=`+cityValue, {
        mode: 'cors'
    }).then(function(response) {
        return response.json();
    })
    .then(function(response) {
        const weather = {
            cityName: response.location.name,
            cityTime: response.location.localtime,
            feelsLike: response.current.condition,
            temp_c: response.current.temp_c,
            temp_c_feels: response.current.feelslike_c,
            humidity: response.current.humidity, 
            uv: response.current.uv,
            windSpeed: response.current.wind_kph,
            windDir: response.current.wind_dir,
        }
        return weather;
    })
    
    city.value = null;

})


function renderDisplay(weather){
    // const content = document.querySelector('#content')
    // const pageContent = document.createElement('div')
    // pageContent.classList.add('page-content')

    // const displayCityName = document.createElement('h1')
    // displayCityName.textContent = response.location.name;

    // pageContent.appendChild(displayCityName)



}