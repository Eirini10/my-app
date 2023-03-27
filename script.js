let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function formatDate(date) {
  return `${days[date.getDay()]} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

document.querySelector('.current\-weather').innerHTML = formatDate(new Date());

let form = document.getElementById("searchForm");
let cityElement = document.getElementById("cityLabel");
let searchInput = document.getElementById("searchTerm");
let temperatureElement = document.getElementById("temperature");
let conditionElement = document.getElementById("condition");
let locationButton = document.getElementById("location");

function formSubmit(e) {
  e.preventDefault();
  let term = searchInput.value.trim();
  if (term.length > 0) {
    getWeather(term).then((result)=>{
      cityElement.innerHTML = result.data.name;
      searchInput.value = '';
      temperatureElement.innerHTML=Math.round(result.data.main.temp);
      conditionElement.innerHTML=result.data.weather[0].description;
    });
  }
}
form.addEventListener("submit", formSubmit);

locationButton.addEventListener("click", ()=>{
  navigator.geolocation.getCurrentPosition((pos)=>{
    getWeatherByLocation(pos.coords.latitude, pos.coords.latitude).then((result)=>{
      cityElement.innerHTML = result.data.name;
      temperatureElement.innerHTML=Math.round(result.data.main.temp);
      conditionElement.innerHTML=result.data.weather[0].description;
    });
  });
});

function getWeather(city){
  return axios({
    method: 'get',
    url: 'https://api.openweathermap.org/data/2.5/weather',
    params:{
      q:city, appid:apiKey, units:"metric"
    }
  })
}


function getWeatherByLocation(lat, lon){
  return axios({
    method: 'get',
    url: 'https://api.openweathermap.org/data/2.5/weather',
    params:{
      lat, lon, appid:apiKey, units:"metric"
    }
  })
}

let apiKey = "1059416004a19b6c0b13fe44fddf0f90"
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=1059416004a19b6c0b13fe44fddf0f90"