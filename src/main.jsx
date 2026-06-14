import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import theme from './theme.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colors: {
          brand: [
            "#f3e6e4",
            "#e0c2be",
            "#cc9d97",
            "#b87870",
            "#a4534a",
            "#631D15", // 👈 main color
            "#521813",
            "#42130f",
            "#310e0b",
            "#210907",
          ],
        },
        primaryColor: "brand",
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </MantineProvider>
  </StrictMode>
);