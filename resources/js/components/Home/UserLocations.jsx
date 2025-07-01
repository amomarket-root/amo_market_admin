import React, { useState, useEffect, useCallback } from 'react';
import { Grid } from '@mui/material';
import axios from 'axios';
import MapComponent from './MapComponent';

const UserLocations = ({ token, timeRange, scriptLoaded }) => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchLocations = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${apiUrl}/admin/locations/popular`, {
                params: { time_range: timeRange },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            setLocations(response.data);
        } catch (err) {
            setError(err.message || 'Failed to fetch location data');
        } finally {
            setLoading(false);
        }
    }, [apiUrl, timeRange, token]);

    return (
        <Grid item xs={12}>
            <MapComponent
                title="User Visited Locations"
                token={token}
                timeRange={timeRange}
                scriptLoaded={scriptLoaded}
                apiEndpoint="/admin/locations/popular"
                dataKey="user_count"
                markerColor="#10d915"
                loading={loading}
                error={error}
                locations={locations}
                fetchLocations={fetchLocations}
            />
        </Grid>
    );
};

export default UserLocations;
