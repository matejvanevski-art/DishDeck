
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthProvider';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
