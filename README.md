# 🌤️ MeteoApp

Un'applicazione React moderna e responsive per controllare il meteo in tutto il mondo, costruita con Vite, React-Bootstrap e React Router.

## ✨ Caratteristiche

- **🏠 Homepage intuitiva**: Ricerca facile delle città con suggerimenti
- **📊 Dettagli meteo completi**: Temperatura attuale, umidità, vento, visibilità
- **📅 Previsioni 5 giorni**: Previsioni dettagliate per i prossimi giorni
- **📱 Design responsive**: Ottimizzato per tutti i dispositivi
- **🌙 Tema scuro/chiaro**: Toggle per passare tra modalità chiara e scura
- **💾 Persistenza tema**: Il tema scelto viene salvato nel localStorage
- **🎨 UI moderna**: Interfaccia pulita e accattivante con transizioni fluide
- **📱 Layout mobile ottimizzato**: Navbar compatta con elementi affiancati su mobile
- **⚡ Navigazione veloce**: Single Page Application con React Router

## 🛠️ Tecnologie Utilizzate

- **React 19** - Libreria UI con hooks (useState, useEffect)
- **Vite** - Build tool e dev server
- **React Router DOM** - Routing client-side
- **React-Bootstrap** - Componenti UI
- **Bootstrap 5** - Framework CSS
- **Bootstrap Icons** - Icone per UI e tema toggle
- **CSS Variables** - Per la gestione dinamica dei temi
- **localStorage** - Persistenza delle preferenze utente
- **OpenWeatherMap API** - Dati meteo in tempo reale

## 🚀 Installazione e Avvio

1. **Installa le dipendenze**:

   ```bash
   npm install
   ```

2. **Avvia il server di sviluppo**:

   ```bash
   npm run dev
   ```

3. **Apri il browser** e vai su `http://localhost:5173`

## 🔑 API Key

L'applicazione utilizza le API di OpenWeatherMap. La chiave API è già configurata nel file `src/services/weatherService.js`.

## 📁 Struttura del Progetto

```
src/
├── components/          # Componenti riutilizzabili
│   ├── Navbar.jsx      # Barra di navigazione
│   └── Footer.jsx      # Piè di pagina
├── pages/              # Pagine dell'applicazione
│   ├── Home.jsx        # Homepage con ricerca
│   └── WeatherDetail.jsx # Dettagli meteo e previsioni
├── services/           # Servizi per API
│   └── weatherService.js # Gestione chiamate OpenWeatherMap
├── utils/              # Utility e helper
│   └── formatters.js   # Formattazione dati
├── App.jsx             # Componente principale
├── App.css             # Stili personalizzati
└── main.jsx            # Entry point
```

## 🌐 Funzionalità API

### Meteo Attuale

- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Dati**: Temperatura, descrizione, umidità, vento, visibilità

### Previsioni 5 Giorni

- **Endpoint**: `https://api.openweathermap.org/data/2.5/forecast`
- **Dati**: Previsioni ogni 3 ore per 5 giorni

## 🎯 Come Usare l'App

1. **Ricerca Città**:

   - Inserisci il nome della città nella homepage
   - Opzionalmente aggiungi il codice del paese (es: IT, US, FR)
   - Clicca "Cerca Meteo" o usa i pulsanti delle città popolari

2. **Visualizza Dettagli**:

   - Vedi il meteo attuale con temperatura e condizioni
   - Controlla i dettagli: min/max, umidità, vento, visibilità
   - Scorri le previsioni per i prossimi 5 giorni

3. **Navigazione**:

   - La navbar ti permette di tornare sempre alla home
   - Usa il pulsante del tema (🌙/☀️) per passare tra modalità scura e chiara

4. **Personalizzazione Tema**:
   - Clicca l'icona del sole/luna nella navbar per cambiare tema
   - Il tema scelto viene automaticamente salvato e ripristinato alla prossima visita
   - Modalità scura: sfondo scuro con testo chiaro per una migliore esperienza notturna
   - Modalità chiara: sfondo chiaro con testo scuro per l'uso diurno

## 📱 Responsive Design

L'applicazione è completamente responsive e si adatta a:

- 📱 **Mobile** (< 768px) - Layout compatto con navbar orizzontale
- 📟 **Tablet** (768px - 1024px) - Layout bilanciato per touch screen
- 🖥️ **Desktop** (> 1024px) - Layout completo con tutte le funzionalità

### Ottimizzazioni Mobile:

- **Navbar compatta**: Home e toggle tema affiancati per un accesso rapido
- **Touch-friendly**: Pulsanti e controlli ottimizzati per il tocco
- **Layout fluido**: Contenuti che si adattano perfettamente agli schermi piccoli

## 🔧 Script Disponibili

Nel directory del progetto, puoi eseguire:

- `npm run dev` - Avvia il server di sviluppo
- `npm run build` - Crea la build di produzione
- `npm run preview` - Anteprima della build di produzione
- `npm run lint` - Controlla il codice con ESLint
- `npm run deploy` - Deploy su GitHub Pages (dopo la configurazione)

## 🌐 Deployment su GitHub Pages

Il progetto è configurato per il deployment automatico su GitHub Pages tramite GitHub Actions.

### Setup rapido:
1. Segui le istruzioni dettagliate in [`GITHUB_PAGES_SETUP.md`](./GITHUB_PAGES_SETUP.md)
2. Sostituisci `USERNAME` e `REPOSITORY_NAME` nei file di configurazione
3. Crea il repository su GitHub e configura Pages
4. Il sito sarà disponibile su: `https://USERNAME.github.io/REPOSITORY_NAME`

### Deployment automatico:
- ✅ Build automatico ad ogni push su `main`
- ✅ Deploy automatico tramite GitHub Actions
- ✅ Ottimizzato per produzione con Vite---

**Sviluppato con ❤️ da Valerio Di Felice usando React e OpenWeatherMap API**

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
