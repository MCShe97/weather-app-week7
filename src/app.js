function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours <10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes <10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;

}

function formatDay(timeStamp) {
    let date = new Date (timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days [day];
}


function displayForcast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    
    forecast.forEach(function(forecastDay, index) {
        if (index < 6) {
     forecastHTML = forecastHTML + 
     ` 
        <div class="col-2">
            <div class="weather-forcast-date">${formatDay (forecastDay.dt)}</div>
            ${index}
            <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="60" />
            <div class="weather-forcast-temperatures">
                <span class="weather-forcast-temperature-max"> 
                    ${Math.round (forecastDay.temp.max)}°
                </span>
                <span class="weather-forcast-temperatures-min">
                    ${Math.round (forecastDay.temp.min)}°
                </span>
            </div>
        </div>
    `;
    }
    });
     

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "03d6fc18f4129451c7039b706c3c6aa5";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForcast);
}


function displayTemperature(response) {
   let temperatureElement = document.querySelector("#temperature");
   let cityElement = document.querySelector("#city");
   let descriptionElement = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windElement = document.querySelector("#wind");
   let dateElement = document.querySelector("#date");
   let iconElement = document.querySelector("#icon");

   celciusTemperature = response.data.main.temp;


   temperatureElement.innerHTML = Math.round(celciusTemperature);
   cityElement.innerHTML = response.data.name;
   descriptionElement.innerHTML=response.data.weather[0].description;
   humidityElement.innerHTML=response.data.main.humidity;
   windElement.innerHTML = Math.round(response.data.wind.speed);
   dateElement.innerHTML = formatDate(response.data.dt * 1000); 
   iconElement.setAttribute(
       "src",
       `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
       iconElement.setAttribute("alt", response.data.weather[0].description);


   getForecast (response.data.coord);

} 

function search(city) {
    let apiKey = "03d6fc18f4129451c7039b706c3c6aa5";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city},&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");