import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentWeather, getFiveDayForecast, formatForecastData } from '../services/weatherService';
import { 
  formatTemperature, 
  formatDate, 
  formatShortDate, 
  getWeatherIconUrl, 
  capitalizeWords,
  formatWindSpeed,
  formatHumidity
} from '../utils/formatters';

/**
 * Componente WeatherDetail - Pagina dei dettagli meteo per una città specifica
 */
const WeatherDetail = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /**
   * Carica i dati meteo quando il componente viene montato
   */
  useEffect(() => {
    const loadWeatherData = async () => {
      if (!city) return;

      setLoading(true);
      setError('');

      try {
        const decodedCity = decodeURIComponent(city);
        const [cityName, countryCode] = decodedCity.split(',');
        
        // Carica dati meteo attuali e previsioni in parallelo
        const [currentData, forecastData] = await Promise.all([
          getCurrentWeather(cityName, countryCode || ''),
          getFiveDayForecast(cityName, countryCode || '')
        ]);

        setCurrentWeather(currentData);
        setForecast(formatForecastData(forecastData));
      } catch (err) {
        setError('Errore nel caricamento dei dati meteo. Riprova più tardi.');
        console.error('Errore nel caricamento dei dati:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, [city]);

  /**
   * Torna alla homepage
   */
  const handleBackToHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" size="lg" />
        <p className="mt-3">Caricamento dati meteo...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <h4>Oops! Qualcosa è andato storto</h4>
          <p>{error}</p>
          <Button variant="primary" onClick={handleBackToHome}>
            Torna alla Home
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!currentWeather) {
    return (
      <Container className="py-5">
        <Alert variant="warning" className="text-center">
          <h4>Nessun dato disponibile</h4>
          <Button variant="primary" onClick={handleBackToHome}>
            Torna alla Home
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Meteo attuale */}
      <Row className="mb-5">
        <Col>
          <Card className="shadow-lg border-0 bg-gradient weather-main-card" style={{background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)'}}>
            <Card.Body className="text-white p-3 p-md-4 p-lg-5">
              <Row className="align-items-center">
                <Col md={8}>
                  <h1 className="display-4 mb-1">
                    {currentWeather.name}, {currentWeather.sys.country}
                  </h1>
                  <p className="lead mb-3">{formatDate(new Date())}</p>
                  <h2 className="display-2 mb-0">
                    {formatTemperature(currentWeather.main.temp)}
                  </h2>
                  <p className="h4 mb-0">
                    {capitalizeWords(currentWeather.weather[0].description)}
                  </p>
                  <p className="mb-0">
                    Percepita: {formatTemperature(currentWeather.main.feels_like)}
                  </p>
                </Col>
                <Col md={4} className="text-center">
                  <img
                    src={getWeatherIconUrl(currentWeather.weather[0].icon)}
                    alt={currentWeather.weather[0].description}
                    style={{ width: '120px', height: '120px' }}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Dettagli meteo attuali */}
      <Row className="mb-5 weather-details-grid">
        <Col xs={6} md={3} className="mb-3">
          <Card className="h-100 text-center border-0 shadow-sm weather-details-card">
            <Card.Body className="p-3 p-md-4">
              <i className="bi bi-thermometer-half text-danger" style={{fontSize: '2rem'}}></i>
              <h5 className="mt-2">Min/Max</h5>
              <p className="h6 mb-0">
                {formatTemperature(currentWeather.main.temp_min)} / {formatTemperature(currentWeather.main.temp_max)}
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3} className="mb-3">
          <Card className="h-100 text-center border-0 shadow-sm weather-details-card">
            <Card.Body className="p-3 p-md-4">
              <i className="bi bi-droplet text-primary" style={{fontSize: '2rem'}}></i>
              <h5 className="mt-2">Umidità</h5>
              <p className="h6 mb-0">{formatHumidity(currentWeather.main.humidity)}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3} className="mb-3">
          <Card className="h-100 text-center border-0 shadow-sm weather-details-card">
            <Card.Body className="p-3 p-md-4">
              <i className="bi bi-wind text-info" style={{fontSize: '2rem'}}></i>
              <h5 className="mt-2">Vento</h5>
              <p className="h6 mb-0">{formatWindSpeed(currentWeather.wind.speed)}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3} className="mb-3">
          <Card className="h-100 text-center border-0 shadow-sm weather-details-card">
            <Card.Body className="p-3 p-md-4">
              <i className="bi bi-eye text-secondary" style={{fontSize: '2rem'}}></i>
              <h5 className="mt-2">Visibilità</h5>
              <p className="h6 mb-0">{(currentWeather.visibility / 1000).toFixed(1)} km</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Previsioni 5 giorni */}
      <Row>
        <Col>
          <div className="forecast-container">
            <h3 className="mb-4 text-center text-md-start">📅 Previsioni per i prossimi 5 giorni</h3>
            <Row>
              {forecast.map((day, index) => (
                <Col key={index} xs={12} className="mb-3">
                  <Card className="border-0 shadow-sm forecast-card">
                    <Card.Body className="p-3 p-md-4">
                      <Row className="align-items-center">
                        <Col xs={12} sm={6} md={3} className="mb-2 mb-md-0">
                          <h6 className="mb-1">{formatShortDate(day.date)}</h6>
                          <small className="text-muted">
                            {capitalizeWords(day.description)}
                          </small>
                        </Col>
                        <Col xs={6} sm={3} md={2} className="text-center mb-2 mb-md-0">
                          <img
                            src={getWeatherIconUrl(day.icon)}
                            alt={day.description}
                            style={{ width: '50px', height: '50px' }}
                            className="weather-icon"
                          />
                        </Col>
                        <Col xs={6} sm={3} md={2} className="mb-2 mb-md-0">
                          <div className="text-center">
                            <strong className="d-block">{formatTemperature(day.temp_max)}</strong>
                            <small className="text-muted">{formatTemperature(day.temp_min)}</small>
                          </div>
                        </Col>
                        <Col xs={6} sm={6} md={2} className="mb-2 mb-sm-0">
                          <div className="text-center text-md-start">
                            <small className="text-muted">
                              <i className="bi bi-droplet me-1"></i>
                              {formatHumidity(day.humidity)}
                            </small>
                          </div>
                        </Col>
                        <Col xs={6} sm={6} md={3}>
                          <div className="text-center text-md-start">
                            <small className="text-muted">
                              <i className="bi bi-wind me-1"></i>
                              {formatWindSpeed(day.wind_speed)}
                            </small>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherDetail;