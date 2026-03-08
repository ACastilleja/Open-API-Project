//Footer element
var footerElement = document.createElement('footer');
document.body.appendChild(footerElement);

// Copyright Text in Footer variables
var today = new Date();
var thisYear = today.getFullYear();
var footer = document.querySelector('footer');
var copyright = document.createElement('p');

//Adding variables to p element of copyright
copyright.innerHTML = ` BEACH WEATHER by Arturo Castilleja ${thisYear} &copy;`;

//adding class to footer for css styling
footer.classList.add('footer');

//appending copyright to footer and to html body
footer.appendChild(copyright);
document.body.appendChild(footer);

// Getting html elements for DOM
const searchBtn = document.getElementById('search-btn');
const forecastBtn = document.getElementById('forecast-btn');
const beachInput = document.getElementById('beach-name');
const weatherContainer = document.querySelector('.localWeather');

//Geo cordinates finder
// let currentCoord = null;

async function getCoord() {
    const beachName = beachInput.value.trim();
    if (!beachName) {
        errorDino(beachName);
        return;
        
    }
    showLoading();
    try{
        // Geolocation API
        const geoRes = await fetch (`https://geocoding-api.open-meteo.com/v1/search?name=${beachName}&count=1&language=en&format=json&countryCode=US`);
        const geoData = await geoRes.json();
        console.log(geoData);

        if(!geoData.results){
            errorDino(beachName);
            return;
        }

        //geo API json data variable
        
    return currentCoord = {
            latitude: geoData.results[0].latitude,
            longitude: geoData.results[0].longitude,
            name: geoData.results[0].name,
            state: geoData.results[0].admin1
        };
        
    }catch (error){
        console.log("Error",error);
        weatherContainer.textContent = "Unable to find Beach";
    }
};



//Creating Eventlistener for searchBtn for current weather
searchBtn.addEventListener('click', async ()=> {

        //Getting Geocoordinates with helper function
        const location = await getCoord();
        if(!location) return;

        const {latitude,longitude,name,state}=currentCoord;
        try{
        // Current Weather API
        const weatherRes = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=precipitation_probability,temperature_2m,apparent_temperature,wind_gusts_10m,cloud_cover,uv_index&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`);
        const weatherData = await weatherRes.json();
        console.log(weatherData);
        
        //Weather variables
        const temp = weatherData.current.temperature_2m;
        console.log(`Temperature: ${temp}F`);
        const realFeel = weatherData.current.apparent_temperature;
        console.log(`Real Feel: ${realFeel}F`);
        const currentPrecip = weatherData.current.precipitation_probability;
        console.log(`Rain Chance: ${currentPrecip}%`);
        const gust = weatherData.current.wind_gusts_10m;
        console.log(`Wind Gust: ${gust}mph`);
        const cloudCover = weatherData.current.cloud_cover;
        console.log(`Cloud Cover= ${cloudCover}`);
        const currentUV = weatherData.current.uv_index;
        console.log(`UV Index: ${currentUV}`);
        
        
        //Creating ul list element
        const weatherList = document.createElement('ul');
    
        //Creating data array to use with for Each loop
        const displayData = [
            `Location: ${name}, ${state}`,
            `Temperature: ${temp}°F`,
            `Real Feel: ${realFeel}°F`,
            `Wind Gust: ${gust}mph`,
            `Rain Probability: ${currentPrecip}%`,
            `Cloud Cover: ${cloudCover}%`,
            `UV Index: ${currentUV}`
            
        ];
        // for Each loop to create li element
        displayData.forEach ( text =>{
            const li = document.createElement('li');
            li.textContent = text;
            weatherList.appendChild(li);
        });

        //appending Weatherlist li list to HTML and adding a class for css
        weatherContainer.textContent = '';
        weatherContainer.appendChild(weatherList);
        weatherContainer.classList.add("weatherCardCurrent"); 

    } catch (error){
        console.log("Error",error);
        weatherContainer.textContent = "Something went wrong. Unable to load weather";
        
    }


});//end of searchBtn current weather eventlistener

//Time formating helper function
function formatLocalTime(isoString, timezone) {
    const date = new Date(isoString + "Z");
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'

    });
}

//Eventlistener of forcastBtn for 5hr forcasteweather
forecastBtn.addEventListener('click', async ()=> {

        //Getting Geocoordinates with helper function
        const location = await getCoord();
        if(!location) return;
        
        //Clear weather container
        weatherContainer.innerHTML = "";
        const {latitude,longitude,name,state}=currentCoord;

        try{
        // Current Weather API
        const weatherRes = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=precipitation_probability,temperature_2m,apparent_temperature,wind_gusts_10m,cloud_cover,uv_index&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch&forecast_days=2`);
        const weatherData = await weatherRes.json();
        
        //Local Beach time 
        const beachNowISO = new Date().toLocaleString("sv-SE",{timeZone: weatherData.timezone})
        .replace(' ', 'T')
        .substring(0,13) + ":00";
        const startIndex = weatherData.hourly.time.findIndex(t=>t.startsWith(beachNowISO));
        
        const currentHour = startIndex !== -1 ? startIndex : 0;

        //looping through the next 5-hrs forecast
        for (let i=currentHour; i<currentHour+5; i++){
            const timeValue = weatherData.hourly.time[i];

            
            //Weather variables
            const time = formatLocalTime(timeValue, weatherData.timezone);
            console.log(`Time: ${time}`);
            const temp = weatherData.hourly.temperature_2m[i];
            console.log(`Temperature: ${temp}F`);
            const realFeel = weatherData.hourly.apparent_temperature[i];
            console.log(`Real Feel: ${realFeel}F`);
            const hourlyPrecip = weatherData.hourly.precipitation_probability[i];
            console.log(`Rain Chance: ${hourlyPrecip}%`);
            const gust = weatherData.hourly.wind_gusts_10m[i];
            console.log(`Wind Gust: ${gust}mph`);
            const cloudCover = weatherData.hourly.cloud_cover[i];
            console.log(`Cloud Cover= ${cloudCover}`);
            const hourlyUV = weatherData.hourly.uv_index[i];
            console.log(`UV Index: ${hourlyUV}`);
            
            //creating ul list
            const weatherList = document.createElement('ul');
            weatherList.classList.add("weatherCard");
        
    
            //Creating data array to use with for Each loop
            const displayData = [
                `Location: ${name}, ${state}`,
                `Time: ${time}`,
                `Temperature: ${temp}°F`,
                `Real Feel: ${realFeel}°F`,
                `Wind Gust: ${gust}mph`,
                `Rain Probability: ${hourlyPrecip}%`,
                `Cloud Cover: ${cloudCover}%`,
                `UV Index: ${hourlyUV}`
                
            ];
            // for Each loop to create li element
            displayData.forEach ( text =>{
                const li = document.createElement('li');
                li.textContent = text;
                weatherList.appendChild(li);
            });

            //appending Weatherlist li list to HTML 

            weatherContainer.appendChild(weatherList);     
            
        }
    } catch (error){
        console.log("Error",error);
        weatherContainer.textContent = "Something went wrong. Unable to load weather";
        
    }


});//end of forcastBtn eventlistener

//helper error dino function
function errorDino(beachName){
    if (!beachName){
    weatherContainer.innerHTML = '<div class ="error-message"><p>Oops! Please type in a Beach Name!</p><img src="images/Confused_dino.jpg" alt="Error placeholder" class="placeholder-img"></div>'; 
    }else {
    weatherContainer.innerHTML = '<div class ="error-message"><p>Oops! Beach not found please try again!</p><img src="images/Confused_dino.jpg" alt="Error placeholder" class="placeholder-img"></div>';
    };
};

//helper spinner function
function showLoading(){
    weatherContainer.innerHTML = '<div class="loader"></div><p class="loading-text">Catching some Data waves...</p>';
    return;
};



