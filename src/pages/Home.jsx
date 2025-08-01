import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getCurrentWeather } from '../services/weatherService';

/**
 * Componente Home - Pagina principale per la ricerca delle città
 */
const Home = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * Gestisce la ricerca della città
   */
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!city.trim()) {
      setError('Per favore inserisci il nome di una città');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Verifica che la città esista facendo una chiamata all'API
      await getCurrentWeather(city, country);
      
      // Se la chiamata ha successo, naviga alla pagina dei dettagli
      const searchQuery = country ? `${city},${country}` : city;
      navigate(`/weather/${encodeURIComponent(searchQuery)}`);
    } catch (err) {
      setError('Città non trovata. Controlla il nome e riprova.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <Card className="shadow-lg border-0 home-card">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <h1 className="display-4 text-primary mb-3">
                  🌤️ MeteoApp
                </h1>
                <p className="lead text-muted">
                  Scopri le previsioni meteo per qualsiasi città del mondo
                </p>
              </div>

              <Form onSubmit={handleSearch}>
                <Row>
                  <Col xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Nome della Città</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Es: Roma, Milano, Napoli..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        size="lg"
                        className="border-2"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Paese (opzionale)</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Es: IT, US, FR..."
                        value={country}
                        onChange={(e) => setCountry(e.target.value.toUpperCase())}
                        size="lg"
                        className="border-2"
                        maxLength={2}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {error && (
                  <Alert variant="danger" className="mb-3">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </Alert>
                )}

                <div className="d-grid">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={loading}
                    className="py-3"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Ricerca in corso...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-search me-2"></i>
                        Cerca Meteo
                      </>
                    )}
                  </Button>
                </div>
              </Form>

              <div className="text-center mt-4">
                <small className="text-muted">
                  💡 Suggerimento: Puoi specificare il codice del paese per risultati più precisi
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Sezione con esempi di città popolari */}
      <Row className="justify-content-center mt-5">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <Card className="border-0 home-card">
            <Card.Body className="text-center p-3 p-md-4">
              <h5 className="mb-3">🏙️ Città Popolari</h5>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {['Roma', 'Milano', 'Napoli', 'Firenze', 'Venezia', 'Torino'].map((cityName) => (
                  <Button
                    key={cityName}
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {
                      setCity(cityName);
                      setCountry('IT');
                    }}
                    className="mb-2 px-3"
                  >
                    {cityName}
                  </Button>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;