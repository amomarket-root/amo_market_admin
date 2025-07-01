import React, { useState, useEffect, useCallback } from 'react';
import { Grid } from '@mui/material';
import axios from 'axios';
import MapComponent from './MapComponent';

const defaultCenter = {
    lat: 20.9517,
    lng: 85.0985
};

const DeliveryBoyLocations = ({ token, timeRange, scriptLoaded }) => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchLocations = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${apiUrl}/admin/locations/delivery-boy`, {
                params: { time_range: timeRange },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            setLocations(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error('Error fetching delivery boy locations:', err);
            setError(err.response?.data?.message || err.message || 'Failed to fetch delivery boy location data');
            setLocations([]);
        } finally {
            setLoading(false);
        }
    }, [apiUrl, timeRange, token]);

    return (
        <Grid item xs={12}>
            <MapComponent
                title="Delivery Boy Locations"
                token={token}
                timeRange={timeRange}
                scriptLoaded={scriptLoaded}
                apiEndpoint="/admin/locations/delivery-boy"
                dataKey="total_delivery_boy"
                activeKey="active_delivery_boy"
                inactiveKey="inactive_delivery_boy"
                markerColor="#10d915"
                defaultCenter={defaultCenter}
                loading={loading}
                error={error}
                locations={locations}
                fetchLocations={fetchLocations}
            />
        </Grid>
    );
};

export default DeliveryBoyLocations;
