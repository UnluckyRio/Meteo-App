import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

/**
 * Componente Footer - Piè di pagina dell'applicazione
 */
const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={6}>
            <h5 className="mb-3">
              <i className="bi bi-cloud-sun me-2"></i>
              MeteoApp
            </h5>
            <p className="mb-0">
              La tua app di fiducia per le previsioni meteo in tempo reale.
              Dati forniti da OpenWeatherMap.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <h6 className="mb-3">Informazioni</h6>
            <p className="mb-1">
              <small>
                <i className="bi bi-globe me-1"></i>
                Dati meteo da{' '}
                <a 
                  href="https://openweathermap.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-light"
                >
                  OpenWeatherMap
                </a>
              </small>
            </p>
            <p className="mb-0">
              <small className="text-muted">
                © {new Date().getFullYear()} MeteoApp. Tutti i diritti riservati.
              </small>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;