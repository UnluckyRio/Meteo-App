import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// Importa i componenti
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import WeatherDetail from './pages/WeatherDetail';

/**
 * Componente principale dell'applicazione MeteoApp
 * Configura il routing e il layout generale
 */
function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar */}
        <Navbar />
        
        {/* Contenuto principale */}
        <main className="flex-grow-1">
          <Routes>
            {/* Rotta per la homepage */}
            <Route path="/" element={<Home />} />
            
            {/* Rotta per i dettagli meteo di una città */}
            <Route path="/weather/:city" element={<WeatherDetail />} />
            
            {/* Rotta di fallback - reindirizza alla home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
