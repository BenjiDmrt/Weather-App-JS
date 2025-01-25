const keyAPI = `YOU API KEY`; //Enter your openweather api key before using. You can create one on https://home.openweathermap.org/users/sign_up.

let cityInput = document.getElementById("inputs");
let weatherImg = document.getElementById("weatherImg");
let temperature = document.getElementById("temperature");
let humidity = document.getElementById("humidityInfo");
let wind = document.getElementById("windInfo");
let cityName =  document.getElementById("city-name");
let humidImg =  document.getElementById("humidImg");
let windImg =  document.getElementById("windImg");




document.addEventListener("keydown", event =>{
    let key = event.key;
    switch(key){
        case "Enter":
            search();
            break;
        default:
            break;
    }
})

async function search(){
    city = cityInput.value;
    if(!city){
        handleErrors()
        temperature.textContent = "Enter a city name";
        return
    }

    try{

        const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyAPI}`;
        const response = await fetch(API);
        if(!response.ok){
            throw new Error("Could not fetch weather data");
        }

        const data =  await response.json();
        displayWeather(data, city);
    }
    catch(error){
        console.error(error);
        handleErrors()
    }
    
    
}
// function errorsCheck(){
// }
function displayWeather(data, city){
    let temp = Math.round((data.main.temp) - 273.15);
    let description = data.weather[0].description;
    let id = data.weather[0].id;
    let windSpeed = data.wind.speed
    let humidityPer = String(data.main.humidity);   
    let returnSrc = getEmoji(id);

    weatherImg.src = returnSrc;
    weatherImg.style.display = "block";
    temperature.textContent = `${temp}°C`;
    cityName.textContent = city.charAt(0).toUpperCase() + city.slice(1);
    humidImg.style.display = "block";
    windImg.style.display = "block";
    humidity.textContent = `${humidityPer}%`;
    wind.textContent = `${windSpeed}m/s`;
}
function getEmoji(id){
    if (id >= 200 && id <= 232) {
        return "images/rain.png";
    } else if (id >= 300 && id <= 321) {
        return "images/drizzle.png";
    } else if (id >= 500 && id <= 531) {
        return "images/rain.png";
    } else if (id >= 600 && id <= 622) {
        return "images/snow.png";
    } else if (id >= 701 && id <= 771) {
        return "images/mist.png";
    } else if (id == 781) {
        return "images/wind.png";
    } else if (id == 800) {
        return "images/clear.png";
    } else if (id >= 801 && id <= 804) {
        return "images/clouds.png";
    } else {
        return "";
    }
}
function handleErrors(){
        weatherImg.src = "images/error.png";
        weatherImg.style.display = "block";
        weatherImg.style.width = "300px"

        temperature.textContent = "Could not fetch weather data.";
        temperature.style.fontSize = "3em"

        humidity.textContent = "";
        wind.textContent = "";
        cityName.textContent = "";

        humidImg.style.display = "none";
        windImg.style.display = "none";
    }