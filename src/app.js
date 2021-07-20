function displayTemperature(response) {
   
   
   let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
}


let apiKey = "03d6fc18f4129451c7039b706c3c6aa5";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=New York,uk&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);