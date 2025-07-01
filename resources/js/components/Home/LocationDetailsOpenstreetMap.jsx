import React, { useEffect, useState } from 'react';
import { Paper, Typography, Skeleton, Box } from '@mui/material';

const LocationDetails = ({ token }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [locationData, setLocationData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocationData = async (latitude, longitude) => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
                );

                if (!response.ok) {
                    const secondResponse = await fetch(
                        `${apiUrl}/admin/city_location?latitude=${latitude}&longitude=${longitude}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (!secondResponse.ok) {
                        throw new Error('Error fetching current location');
                    }

                    const data = await secondResponse.json();
                    setLocationData(data || data.data || 'Unable to fetch address');
                } else {
                    const data = await response.json();
                    setLocationData(data || 'Unable to fetch address');
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching address:', error);
                setLocationData('Unable to fetch address');
                setLoading(false);
            }
        };

        const getPosition = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        fetchLocationData(latitude, longitude);
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

    return (
        <Paper elevation={10} className="card-animation" style={{ padding: 20, height: '100%', borderRadius: 10 }}>
            {loading ? (
                <Box>
                    <Skeleton variant="rectangular" width="100%" height={150} />
                    <Typography style={{ fontWeight: 'bold', textAlign: 'left', margin: '10px 0', fontSize: '1.5rem' }}>
                        <Skeleton width="60%" />
                    </Typography>
                    <Skeleton height={30} />
                    <Skeleton height={30} />
                    <Skeleton height={30} />
                    <Skeleton height={30} />
                    <Skeleton height={30} />
                    <Skeleton height={30} />
                    <Skeleton height={30} />
                </Box>
            ) : (
                <>
                    <img
                        src="/image/Current_Location.webp"
                        alt="Location"
                        style={{
                            maxWidth: '100%',
                            height: '150px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                            marginBottom: '10px'
                        }}
                        loading="eager"
                        decoding="async"
                    />
                    <Typography style={{ fontWeight: 'bold', textAlign: 'left', marginBottom: '15px', fontSize: '1.5rem' }}>
                        Location Details
                    </Typography>
                    {locationData && locationData.address ? (
                        <>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                                Address Type: {locationData.addresstype || 'N/A'}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                                Road: {locationData.address.road || 'N/A'}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                                Neighborhood: {locationData.address.neighbourhood || 'N/A'}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                                Suburb: {locationData.address.suburb || 'N/A'}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                                County: {locationData.address.county || 'N/A'}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                                State District: {locationData.address.state_district || 'N/A'}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                                Postcode: {locationData.address.postcode || 'N/A'}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                                Country: {locationData.address.country || 'N/A'}
                            </Typography>
                        </>
                    ) : (
                        <Typography variant="body1" color="error">
                            Location data not available
                        </Typography>
                    )}
                </>
            )}
        </Paper>
    );
};

export default LocationDetails;
