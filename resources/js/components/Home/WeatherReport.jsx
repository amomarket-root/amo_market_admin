import React, { useEffect, useState } from 'react';
import { Paper, Typography, Skeleton, Grid, Box, Divider } from '@mui/material';
import { Thermostat, WaterDrop, Air, LocationOn, Visibility, Speed, Flag } from '@mui/icons-material';

// Function to convert Kelvin to Celsius
const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
};

const WeatherReport = ({ token }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeatherData = async (latitude, longitude) => {
            try {
                const response = await fetch(`${apiUrl}/admin/weather?latitude=${latitude}&longitude=${longitude}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const weatherData = await response.json();
                    setWeatherData(weatherData.data);
                    setLoading(false);
                } else {
                    console.error('Failed to fetch weather data');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setLoading(false);
            }
        };

        const getPosition = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        fetchWeatherData(latitude, longitude);
                    },
                    (error) => {
                        console.error('Error getting user location:', error);
                        setLoading(false);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
                setLoading(false);
            }
        };

        if (token) {
            getPosition();
        }
    }, [token, apiUrl]);

    const weatherIconUrl = weatherData && weatherData.weather && weatherData.weather[0] ?
        `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` : '';

    return (
        <Paper elevation={10} className="card-animation"
         style={{ padding: 20, borderRadius: 10 }}>
            {loading ? (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Skeleton variant="rectangular" width="100%" height={200} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>
                            <Skeleton width="60%" />
                        </Typography>
                        <Box display="flex" alignItems="center" mb={2}>
                            <Skeleton variant="circular" width={40} height={40} />
                            <Box ml={2} width="100%">
                                <Skeleton width="80%" />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        {[...Array(6)].map((_, i) => (
                            <Box key={i} display="flex" alignItems="center" mb={1}>
                                <Skeleton variant="circular" width={24} height={24} />
                                <Box ml={2} width="100%">
                                    <Skeleton width="70%" />
                                </Box>
                            </Box>
                        ))}
                    </Grid>
                </Grid>
            ) : (
                <>
                    {/* Top Section - Image and weather info */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: { xs: 2, md: 4 },
                        mb: 3
                    }}>
                        {/* Image Section */}
                        <Box sx={{
                            width: { xs: '100%', md: '50%' },
                            height: { xs: '200px', md: 'auto' },
                            flexShrink: 0
                        }}>
                            <img
                                src="/image/Location_Weather_Report.webp"
                                alt="weather"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                }}
                                loading="eager"
                                decoding="async"
                            />
                        </Box>

                        {/* Weather Info Section */}
                        <Box sx={{
                            width: { xs: '100%', md: '50%' },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Current Weather
                            </Typography>
                            {weatherData && weatherData.weather && weatherData.weather[0] ? (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {weatherIconUrl && (
                                        <img
                                            src={weatherIconUrl}
                                            alt="weather_icon"
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                marginRight: '16px'
                                            }}
                                        />
                                    )}
                                    <Box>
                                        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                                            {kelvinToCelsius(weatherData.main.temp)}°C
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                                            {weatherData.weather[0].description}
                                        </Typography>
                                    </Box>
                                </Box>
                            ) : (
                                <Typography variant="body1" color="error">
                                    Weather data not available
                                </Typography>
                            )}
                        </Box>
                    </Box>

                    {/* Bottom Section - Weather details */}
                    {weatherData && weatherData.weather && weatherData.weather[0] && (
                        <Box>
                            <Divider sx={{ my: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <Thermostat color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body1">
                                            Feels like: {kelvinToCelsius(weatherData.main.feels_like)}°C
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <WaterDrop color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body1">
                                            Humidity: {weatherData.main.humidity}%
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <Air color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body1">
                                            Wind: {weatherData.wind.speed} m/s
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <Air color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body1">
                                            Direction: {weatherData.wind.deg}°
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <Speed color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body1">
                                            Pressure: {weatherData.main.pressure} hPa
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <Visibility color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body1">
                                            Visibility: {(weatherData.visibility / 1000).toFixed(1)} km
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <Flag color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body1">
                                            {weatherData.name}, {weatherData.sys.country}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <LocationOn color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body1">
                                            Coords: {weatherData.coord.lat.toFixed(4)}, {weatherData.coord.lon.toFixed(4)}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </>
            )}
        </Paper>
    );
};

export default WeatherReport;
