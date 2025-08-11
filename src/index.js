// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import MUI ThemeProvider and CssBaseline
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // Import the custom theme

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap App with ThemeProvider and apply the custom theme */}
    <ThemeProvider theme={theme}>
      {/* CssBaseline provides a consistent baseline */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// Measure performance if needed
reportWebVitals();
