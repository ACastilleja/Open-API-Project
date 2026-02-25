//Footer element
var footerElement = document.createElement('footer');
document.body.appendChild(footerElement);

// Copyright Text in Footer variables
var today = new Date();
var thisYear = today.getFullYear();
var footer = document.querySelector('footer');
var copyright = document.createElement('p');

//Adding variables to p element of copyright
copyright.innerHTML = ` Arturo Castilleja ${thisYear} &copy;`;

//adding class to footer for css styling
footer.classList.add('footer');

//appending copyright to footer and to html body
footer.appendChild(copyright);
document.body.appendChild(footer);

// Weather API
async function getWeather(){
    try{
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=27.9658&longitude=-82.8001&daily=uv_index_max,wind_gusts_10m_max,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_hours&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,apparent_temperature,soil_temperature_6cm,cloud_cover&current=temperature_2m,rain,wind_gusts_10m&timezone=America%2FNew_York&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch");
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