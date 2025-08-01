# 🚀 Setup GitHub Pages per MeteoApp

## Passi da completare per hostare il sito su GitHub Pages:

### 1. 📝 Aggiorna i file di configurazione

Devi sostituire `USERNAME` e `REPOSITORY_NAME` nei seguenti file:

#### In `package.json`:
```json
"homepage": "https://TUO_USERNAME.github.io/NOME_REPOSITORY"
```

#### In `vite.config.js`:
```javascript
base: '/NOME_REPOSITORY/',
```

**Esempio:**
- Se il tuo username GitHub è `mario123` e il repository si chiama `meteo-app`:
  - `"homepage": "https://mario123.github.io/meteo-app"`
  - `base: '/meteo-app/',`

### 2. 🔧 Crea il repository su GitHub

1. Vai su [GitHub](https://github.com) e crea un nuovo repository
2. Nomina il repository (es. `meteo-app`)
3. **NON** inizializzare con README, .gitignore o licenza (il progetto esiste già)

### 3. 📤 Collega il repository locale a GitHub

```bash
# Aggiungi il remote origin (sostituisci USERNAME e REPOSITORY_NAME)
git remote add origin https://github.com/USERNAME/REPOSITORY_NAME.git

# Verifica che il remote sia stato aggiunto
git remote -v

# Push del codice
git push -u origin main
```

### 4. ⚙️ Configura GitHub Pages

1. Vai nelle **Settings** del tuo repository su GitHub
2. Scorri fino alla sezione **Pages**
3. In **Source**, seleziona **GitHub Actions**
4. Il workflow si attiverà automaticamente al prossimo push

### 5. 🚀 Deploy automatico

Ogni volta che fai push su `main`, il sito verrà automaticamente:
- Buildato
- Deployato su GitHub Pages
- Disponibile all'URL: `https://USERNAME.github.io/REPOSITORY_NAME`

### 6. 🔍 Verifica il deployment

- Vai nella tab **Actions** del repository per vedere lo stato del deployment
- Una volta completato, il sito sarà disponibile all'URL configurato

## 📋 Checklist finale:

- [ ] Sostituito USERNAME e REPOSITORY_NAME nei file di configurazione
- [ ] Creato repository su GitHub
- [ ] Collegato repository locale a GitHub
- [ ] Configurato GitHub Pages nelle Settings
- [ ] Fatto push del codice
- [ ] Verificato che il workflow funzioni nella tab Actions

## 🆘 Risoluzione problemi:

- **404 Error**: Verifica che la `base` in `vite.config.js` corrisponda al nome del repository
- **Workflow fallito**: Controlla i logs nella tab Actions per vedere gli errori
- **Sito non aggiornato**: Aspetta qualche minuto, GitHub Pages può impiegare tempo per aggiornare

---

✅ **Una volta completati questi passi, la tua MeteoApp sarà live su GitHub Pages!**