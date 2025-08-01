import React, { useState, useEffect } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

/**
 * Componente Navbar - Barra di navigazione dell'applicazione
 */
const Navbar = () => {
  const location = useLocation();
  
  // Stato per il tema (true = scuro, false = chiaro)
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // Recupera la preferenza dal localStorage o usa il tema chiaro come default
    const savedTheme = localStorage.getItem('meteoapp-theme');
    return savedTheme === 'dark';
  });
  
  // Effetto per applicare il tema al body e salvare nel localStorage
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('meteoapp-theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('meteoapp-theme', 'light');
    }
  }, [isDarkTheme]);
  
  // Funzione per cambiare tema
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <BootstrapNavbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold">
          <i className="bi bi-cloud-sun me-2"></i>
          MeteoApp
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={location.pathname === '/' ? 'active fw-bold' : ''}
            >
              <i className="bi bi-house me-1"></i>
              Home
            </Nav.Link>
            
            {/* Pulsante toggle tema */}
            <Button
              variant="outline-light"
              size="sm"
              onClick={toggleTheme}
              className="ms-2 theme-toggle-btn"
              title={isDarkTheme ? 'Passa al tema chiaro' : 'Passa al tema scuro'}
            >
              <i className={`bi ${isDarkTheme ? 'bi-sun' : 'bi-moon'}`}></i>
            </Button>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;