import { elements, showLoading, hideLoading, showError, hideError, displayWeather, getCityInput, clearInput, hideWeather } from './modules/ui-controller.js'
import { getCurrentWeather, getWeatherByCoords } from './modules/weather-service.js'

const setupEventListeners = () => {
  elements.searchBtn.addEventListener('click', handleSearch)
  elements.cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  })

  elements.locationBtn.addEventListener('click', handleLocationSearch)
}

const handleSearch = async () => {
  const city = elements.cityInput.value.trim();

  if (!isValidCity(city)) {
    showError('Introdu un nume valid de oraș!');
    return;
  }

  showLoading();

  try {
    const data = await getCurrentWeather(city);
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
    clearInput();
  }
};


const handleLocationSearch = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      hideError()
      hideWeather()
      showLoading()

      try {
        const weatherData = await getWeatherByCoords(latitude, longitude)
        displayWeather(weatherData)
      } catch (error) {
        showError('Eroare la obținerea datelor pe baza locației.')
      } finally {
        hideLoading()
      }
    }, () => {
      showError('Nu am putut accesa locația.')
    })
  } else {
    showError('Browser-ul tău nu suportă geolocația.')
  }
}

const isValidCity = (city) => {
  return city.length >= 2 && /^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/.test(city)
}

setupEventListeners()
