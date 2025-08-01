// Servizio per gestire le chiamate alle API di OpenWeatherMap
const API_KEY = '256927939845cd4aec814aa5e0390758';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Ottiene i dati meteo attuali per una città
 * @param {string} city - Nome della città
 * @param {string} country - Codice del paese (opzionale)
 * @returns {Promise} - Dati meteo attuali
 */
export const getCurrentWeather = async (city, country = '') => {
  try {
    const query = country ? `${city},${country}` : city;
    const response = await fetch(
      `${BASE_URL}/weather?q=${query}&appid=${API_KEY}&units=metric&lang=it`
    );
    
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Errore nel recupero dei dati meteo attuali:', error);
    throw error;
  }
};

/**
 * Ottiene le previsioni meteo per 5 giorni
 * @param {string} city - Nome della città
 * @param {string} country - Codice del paese (opzionale)
 * @returns {Promise} - Previsioni meteo per 5 giorni
 */
export const getFiveDayForecast = async (city, country = '') => {
  try {
    const query = country ? `${city},${country}` : city;
    const response = await fetch(
      `${BASE_URL}/forecast?q=${query}&appid=${API_KEY}&units=metric&lang=it`
    );
    
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Errore nel recupero delle previsioni:', error);
    throw error;
  }
};

/**
 * Formatta i dati delle previsioni raggruppandoli per giorno
 * @param {Object} forecastData - Dati delle previsioni dall'API
 * @returns {Array} - Array di previsioni giornaliere
 */
export const formatForecastData = (forecastData) => {
  const dailyForecasts = {};
  
  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = {
        date: date,
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        wind_speed: item.wind.speed,
        forecasts: []
      };
    }
    
    // Aggiorna min e max temperature
    dailyForecasts[date].temp_min = Math.min(dailyForecasts[date].temp_min, item.main.temp_min);
    dailyForecasts[date].temp_max = Math.max(dailyForecasts[date].temp_max, item.main.temp_max);
    
    // Aggiungi la previsione oraria
    dailyForecasts[date].forecasts.push({
      time: new Date(item.dt * 1000).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
      temp: item.main.temp,
      description: item.weather[0].description,
      icon: item.weather[0].icon
    });
  });
  
  return Object.values(dailyForecasts).slice(0, 5); // Ritorna solo i primi 5 giorni
};