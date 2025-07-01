import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import OrderAnalyticsDetails1Page from './OrderAnalyticsDetails1Page';
import OrderAnalyticsDetails2Page from './OrderAnalyticsDetails2Page';
import GoogleAnalyticSection1Page from './GoogleAnalyticSection1Page';
import GoogleAnalyticSection2Page from './GoogleAnalyticSection2Page';
import WeatherReport from './WeatherReport';
import LocationDetails from './LocationDetails';
import UserLocations from './UserLocations';
import ShopLocations from './ShopLocations';
import DataReport from './DataReport';
import DeliveryBoyLocations from './DeliveryBoyLocations';
import { LoadScript } from '@react-google-maps/api';

const DashboardPage = () => {
    const [token, setToken] = useState('');
    const [timeRange, setTimeRange] = useState('last_7_days');
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        const localStorageToken = localStorage.getItem('token');
        setToken(localStorageToken);
    }, []);

    const handleTimeRangeChange = (event) => {
        setTimeRange(event.target.value);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <LoadScript
                googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
                onLoad={() => setScriptLoaded(true)}
                onError={() => console.error("Google Maps failed to load")}
            >
                <Grid container spacing={2} mt={0.5}>
                    {/* Grid item for the dropdown on the left */}
                    <Grid item xs={12} sm={6} md={3.95} sx={{ textAlign: 'left' }}>
                        <FormControl fullWidth>
                            <InputLabel id="time-range-select-label">Time Range</InputLabel>
                            <Select
                                labelId="time-range-select-label"
                                id="time-range-select"
                                value={timeRange}
                                label="Time Range"
                                onChange={handleTimeRangeChange}
                                size='small'
                            >
                                <MenuItem value="last_day">Last Day</MenuItem>
                                <MenuItem value="last_7_days">Last 7 Days</MenuItem>
                                <MenuItem value="last_14_days">Last 14 Days</MenuItem>
                                <MenuItem value="last_30_days">Last 30 Days</MenuItem>
                                <MenuItem value="last_90_days">Last 90 Days</MenuItem>
                                <MenuItem value="all_time">All Time</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* The rest of the content will remain centered */}
                    <Grid container item xs={12} spacing={2} justifyContent="center">
                        <Grid container item xs={12} spacing={2}>
                            <Grid item xs={12} md={6}>
                                <WeatherReport token={token} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <LocationDetails token={token} />
                            </Grid>
                        </Grid>
                          <Grid item xs={12}>
                            <DataReport token={token} timeRange={timeRange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <UserLocations token={token} timeRange={timeRange} scriptLoaded={scriptLoaded} />
                        </Grid>
                        <Grid container item xs={12} spacing={2}>
                            <Grid item xs={12} md={6}>
                                <ShopLocations token={token} timeRange={timeRange} scriptLoaded={scriptLoaded} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DeliveryBoyLocations token={token} timeRange={timeRange} scriptLoaded={scriptLoaded} />
                            </Grid>
                        </Grid>

                        {/* Other Components */}
                        <Grid item xs={12}>
                            <GoogleAnalyticSection1Page token={token} timeRange={timeRange} />
                        </Grid>
                        <Grid item xs={12}>
                            <OrderAnalyticsDetails1Page token={token} />
                        </Grid>
                        <Grid item xs={12}>
                            <OrderAnalyticsDetails2Page token={token} />
                        </Grid>
                        <Grid item xs={12}>
                            <GoogleAnalyticSection2Page token={token} timeRange={timeRange} />
                        </Grid>
                    </Grid>
                </Grid>
            </LoadScript>
        </Box>
    );
};

export default DashboardPage;
