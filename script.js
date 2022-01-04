const loader = document.getElementById('loader');
const weather = document.getElementById('weather');
const knopje = document.getElementById('knopje');
const mijnBody = document.querySelector("body");

async function getWeather(lat, lon) {
  const apikey = 'd9457c41095a88216c1b30432c6d0fa1';
  const url =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric&lang=nl`;
  console.log(url);

  const response = await fetch(url);
  const json = await response.json();
  console.log(json);

  for (let i = 0; i < 7; i++) {
    document.getElementById('weather-'+ i +'-icon').src = `images/weather/${json.daily[i].weather[0].icon}.png`;
    document.getElementById('weather-'+ i +'-temperature').innerHTML = `${Math.round(json.daily[i].temp.day)}°C`;
    document.getElementById('weather-'+ i +'-text').innerHTML = json.daily[i].weather[0].description;
    document.getElementById('weather-'+ i +'-icon').style.display = 'flex';
    document.getElementById('weather').style.display = 'flex';
    knopje.style.display = 'inline';
  }
  loader.style.display = 'none';
}

knopje.addEventListener("click",function () {
  mijnBody.classList.toggle("light-mode");
  knopje.classList.toggle("light-mode");
})

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  getWeather(pos.coords.latitude, pos.coords.longitude);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
