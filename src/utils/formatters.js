// Utility per formattare date, temperature e altri dati

/**
 * Formatta la temperatura con il simbolo dei gradi Celsius
 * @param {number} temp - Temperatura in gradi Celsius
 * @returns {string} - Temperatura formattata
 */
export const formatTemperature = (temp) => {
  return `${Math.round(temp)}°C`;
};

/**
 * Formatta la data in formato italiano
 * @param {Date|string} date - Data da formattare
 * @returns {string} - Data formattata
 */
export const formatDate = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('it-IT', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Formatta la data in formato breve
 * @param {Date|string} date - Data da formattare
 * @returns {string} - Data formattata in formato breve
 */
export const formatShortDate = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('it-IT', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Ottiene l'URL dell'icona meteo da OpenWeatherMap
 * @param {string} iconCode - Codice dell'icona dall'API
 * @returns {string} - URL completo dell'icona
 */
export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

/**
 * Capitalizza la prima lettera di ogni parola
 * @param {string} str - Stringa da capitalizzare
 * @returns {string} - Stringa capitalizzata
 */
export const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Converte la velocità del vento da m/s a km/h
 * @param {number} windSpeed - Velocità del vento in m/s
 * @returns {string} - Velocità del vento formattata in km/h
 */
export const formatWindSpeed = (windSpeed) => {
  const kmh = Math.round(windSpeed * 3.6);
  return `${kmh} km/h`;
};

/**
 * Formatta l'umidità con il simbolo percentuale
 * @param {number} humidity - Umidità in percentuale
 * @returns {string} - Umidità formattata
 */
export const formatHumidity = (humidity) => {
  return `${humidity}%`;
};