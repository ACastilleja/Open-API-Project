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
const beachInput = document.getElementById('beach-name');
const weatherContainer = document.querySelector('.localWeather');

//Creating Eventlistener for searchBtn for Beach input
searchBtn.addEventListener('click', async ()=> {

    const beachName = beachInput.value;
    if (!beachName) {
        weatherContainer.textContent = "Please type in a beach name."
        return;
        
    }
    
    try {
        // Geolocation API
        const geoRes = await fetch (`https://geocoding-api.open-meteo.com/v1/search?name=${beachName}&count=1&language=en&format=json&countryCode=US`);
        const geoData = await geoRes.json();
        console.log(geoData);

        if(!geoData.results){
            weatherContainer.textContent = "Beach not found please try again";
            return;
        }

        //geo API json data variable
        const {latitude, longitude, name, admin1 } = geoData.results[0];
        console.log(latitude, longitude, name, admin1);
        // Current Weather API
        const weatherRes = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=precipitation_probability,temperature_2m,apparent_temperature,wind_gusts_10m,cloud_cover&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`);
        const weatherData = await weatherRes.json();
        console.log(weatherData);
        // Current UV index API
        const uvRes = await fetch (`https://currentuvindex.com/api/v1/uvi?latitude=${latitude}&longitude=${longitude}`);
        const uvIndex = await uvRes.json();
        console.log(uvIndex);

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
        const currentUV = uvIndex.now.uvi;
        console.log(`UV Index: ${currentUV}`);
        
        
        //Creating ul list element
        const weatherList = document.createElement('ul');
    
        //Creating data array to use with for Each loop
        const displayData = [
            `Location: ${name}, ${admin1}`,
            `Temperatur: ${temp}°F`,
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
        weatherContainer.classList.add("weatherCard"); 

    } catch (error){
        console.log("Error",error);
        weatherContainer.textContent = "Something went wrong. Unable to load weather";
        
    }


});//end of searchBtn eventlistener








// OLD API command
// async function getWeather(){
//     try{
//         const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=27.7253&longitude=-82.7412&daily=uv_index_max,weather_code&current=temperature_2m,wind_gusts_10m,precipitation&timezone=America%2FNew_York&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch");
//         if(!response.ok){
//             throw new Error (`Error: ${response.status}`);
//         }
//         const weatherData = await response.json();
//         console.log(weatherData);
//     }catch(error){
//     console.error(error);
// }
// };

//getWeather();