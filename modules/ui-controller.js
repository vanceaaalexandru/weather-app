// modules/ui-controller.js

export const elements = {
  cityInput: document.querySelector('#city-input'),
  searchBtn: document.querySelector('#search-btn'),
  locationBtn: document.querySelector('#location-btn'),
  loading: document.querySelector('#loading'),
  error: document.querySelector('#error'),
  weatherDisplay: document.querySelector('#weather-display'),
  cityName: document.querySelector('#city-name'),
  temperature: document.querySelector('#temperature'),
  description: document.querySelector('#description'),
  humidity: document.querySelector('#humidity'),
  windSpeed: document.querySelector('#wind-speed'),
  sunrise: document.querySelector('#sunrise'),
  sunset: document.querySelector('#sunset')
}

export const showLoading = () => {
  elements.loading.classList.remove('hidden')
}

export const hideLoading = () => {
  elements.loading.classList.add('hidden')
}

export const showError = (message) => {
  elements.error.textContent = message
  elements.error.classList.remove('hidden')
}

export const hideError = () => {
  elements.error.classList.add('hidden')
}

export const displayWeather = (data) => {
  const { name, main, weather, wind, sys } = data;

  const temperature = Math.round(main.temp);
  const humidity = main.humidity;
  const description = weather[0].description;
  const windSpeed = (wind.speed * 3.6).toFixed(1);
  const sunrise = formatUnixTime(sys.sunrise);
  const sunset = formatUnixTime(sys.sunset);

  const iconCode = weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  elements.weatherDisplay.innerHTML = `
    <h2>${name}</h2>
    <img src="${iconUrl}" alt="Weather icon">
    <p>Temperatură: ${temperature}°C</p>
    <p>Descriere: ${description}</p>
    <p>Umiditate: ${humidity}%</p>
    <p>Vânt: ${windSpeed} km/h</p>
    <p>Răsărit: ${sunrise}</p>
    <p>Apus: ${sunset}</p>
  `;

  elements.weatherDisplay.classList.add('fade-in');
  elements.weatherDisplay.classList.remove('hidden');

  setTimeout(() => {
    elements.weatherDisplay.classList.remove('fade-in');
  }, 500);
}


export const getCityInput = () => elements.cityInput.value.trim()

export const clearInput = () => {
  elements.cityInput.value = ''
}

export const hideWeather = () => {
  elements.weatherDisplay.classList.add('hidden')
}

const formatUnixTime = (unixTime) => {
  const date = new Date(unixTime * 1000)
  return date.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })
}
