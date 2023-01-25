"use strict";

const buttons = document.querySelectorAll('.button');
const input = document.querySelector(".form-control");
const temp = document.querySelector(".main-temp");
const weather = document.querySelector(".main-weather");
const city = document.querySelector(".city");
const icon = document.querySelector(".icon");
const feelslike = document.querySelector(".feels");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");
const high = document.querySelector(".high");
const low = document.querySelector(".low");
const bg = document.querySelector(".left-container")

var lat = 0;
var lon = 0;

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  getData('load');
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Sorry, browser does not support geolocation!");
  }
}

input.addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    buttons[1].click();
  }
});

function randomInt(max) {
  return Math.floor(Math.random() * (max + 1))
}

buttons.forEach(function(button) {
  button.addEventListener('click', function(e) {
    const buttonId = e.currentTarget.id;
    getData(buttonId);
  })
})

function getData(button) {
  let unit = "metric";
  let symbol = "&#8451";
  if (button === buttons[0].id) {
    unit = "imperial";
    symbol = "&#8457";
  }
  let link = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=${unit}&appid=b4589d851907c84c0a9c58f444fc3710`
  if (button === 'load') {
    link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=b4589d851907c84c0a9c58f444fc3710`
  }
  fetch(link)
  .then(response => response.json())
  .then(data => {
    const tempValue = data['main']['temp'];
    const nameValue = data['name'];
    const descValue = data['weather'][0]['description'];
    const countryValue = data['sys']['country'];
    const iconValue = data['weather'][0]['icon'];
    const feelsValue = data['main']['feels_like'];
    const humidityValue = data['main']['humidity'];
    const pressureValue = data['main']['pressure'];
    const highValue = data['main']['temp_max'];
    const lowValue = data['main']['temp_min'];

    temp.innerHTML = tempValue + " " + symbol;
    city.innerHTML = nameValue + ", " + countryValue;
    weather.innerHTML = descValue;
    icon.src = "http://openweathermap.org/img/w/" + iconValue + ".png";
    feelslike.innerHTML = feelsValue + " " + symbol;
    humidity.innerHTML = humidityValue + " %";
    pressure.innerHTML = pressureValue + " hPa";
    high.innerHTML = highValue + " " + symbol;
    low.innerHTML = lowValue + " " + symbol;
    fetch('https://pixabay.com/api/?key=30557093-e3a371281b0c10edee259ab8c&q='+descValue+'&image_type=photo')
    .then(response => response.json())
    .then(data => {
      const num = randomInt(data['hits'].length - 1);
      const bgValue = data['hits'][num]['largeImageURL'];
      bg.style.backgroundImage = "linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url(" + bgValue + ")";
    })
  })
  .catch(err => alert("Enter a valid city name!"));
}

getLocation();