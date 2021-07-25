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


function displayForcast() {
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    forecastHTML = 
     forecastHTML + 
     ` 
        <div class="col-2">
            <div class="weather-forcast-date">
                Thu
            </div>
            <img src="http://openweathermap.org/img/wn/04n@2x.png" alt="" width="60" />
            <div class="weather-forcast-temperatures">
                <span class="weather-forcast-temperature-max">
                    18°
                </span>
                <span class="weather-forcast-temperatures-min">
                    12°
                </span>
            </div>
        </div>
    `;

      forecastHTML = 
     forecastHTML + 
     ` 
        <div class="col-2">
            <div class="weather-forcast-date">
                Thu
            </div>
            <img src="http://openweathermap.org/img/wn/04n@2x.png" alt="" width="60" />
            <div class="weather-forcast-temperatures">
                <span class="weather-forcast-temperature-max">
                    18°
                </span>
                <span class="weather-forcast-temperatures-min">
                    12°
                </span>
            </div>
        </div>
    `;

 forecastElement.innerHTML = forecastHTML;
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
       `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
       iconElement.setAttribute("alt", response.data.weather[0].description);

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


function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event) {
    event.preventDefault();
    celciusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;



let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

search("New York");
displayForcast();