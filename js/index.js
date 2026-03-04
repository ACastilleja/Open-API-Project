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

// Weather API
async function getWeather(){
    try{
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=27.7253&longitude=-82.7412&daily=uv_index_max&hourly=temperature_2m,wind_gusts_10m,cloud_cover,precipitation_probability&current=temperature_2m,apparent_temperature,rain,wind_gusts_10m&timezone=America%2FNew_York&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch");
        if(!response.ok){
            throw new Error (`Error: ${response.status}`);
        }
        const weatherData = await response.json();
        console.log(weatherData);
    }catch(error){
    console.error(error);
}
};
getWeather();