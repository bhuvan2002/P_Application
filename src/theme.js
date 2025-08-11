// src/theme.js
import { createTheme } from '@mui/material/styles';

// Define your custom theme here
const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Customize your primary color (e.g., green)
    },
    secondary: {
      main: '#f44336', // Customize your secondary color (e.g., red)
    },
    background: {
      default: '#f5f5f5', // Light grey background
    },
  },
  typography: {
    // Define typography settings if needed
    fontFamily: 'Roboto, Arial',
  },
});

export default theme;
