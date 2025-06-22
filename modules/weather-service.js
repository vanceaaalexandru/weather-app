import { API_KEY, BASE_URL } from './config.js';

export const getCurrentWeather = async (city) => {
  try {
    const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=ro`);
    if (!response.ok) {
      throw new Error('Orașul nu a fost găsit!');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Eroare la preluarea datelor!');
  }
};

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ro`);
    if (!response.ok) {
      throw new Error('Locația nu a fost găsită!');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Eroare la preluarea datelor!');
  }
};
