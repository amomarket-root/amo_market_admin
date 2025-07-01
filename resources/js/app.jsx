import React, { lazy, Suspense } from 'react';
import { ThemeProvider as CustomThemeProvider, useTheme } from './components/Template/ThemeContext';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { SweetAlertProvider } from './components/Template/SweetAlert';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import createAppTheme from './components/Template/Theme';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import './bootstrap';

const AdminRoutes = lazy(() => import('./components/Route/AdminRoutes'));
const loaderGif = '/image/loader.gif';

const ThemeWrapper = ({ children }) => {
    const { darkMode } = useTheme();
    const theme = createAppTheme(darkMode);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
};

function App() {
    return (
        <CustomThemeProvider>
            <ThemeWrapper>
                <SweetAlertProvider>
                    <BrowserRouter>
                        <Suspense fallback={
                            <div className="loader-container">
                                <img src={loaderGif} alt="Loading..." className="loader" />
                            </div>
                        }>
                            <Routes>
                                <Route path="/*" element={<AdminRoutes />} />
                            </Routes>
                        </Suspense>
                    </BrowserRouter>
                </SweetAlertProvider>
            </ThemeWrapper>
        </CustomThemeProvider>
    );
}

const rootElement = document.getElementById('app');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
}
