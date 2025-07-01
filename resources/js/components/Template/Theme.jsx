// src/components/Template/Theme.jsx
import { createTheme } from "@mui/material/styles";
import "./css/theme.css";

const getDesignTokens = (mode) => ({
  palette: {
    mode: mode ? 'dark' : 'light',
    primary: {
      main: "#9F63FF",
    },
    ...(mode === true
      ? {
          // Dark mode palette
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#ffffff',
            secondary: '#bbbbbb',
          },
        }
      : {
          // Light mode palette
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
          text: {
            primary: '#333333',
            secondary: '#666666',
          },
        }),
    success: {
      main: "#10d915",
    },
    error: {
      main: "#f27474",
    },
    warning: {
      main: "#f7e119",
    },
    secondary: {
      main: "#0f85d9",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
      },
    },
  },
});

export default (darkMode) => createTheme(getDesignTokens(darkMode));
