import React, { useEffect, useState } from 'react';
import { Paper, Typography, Skeleton, Grid, Box, Divider, Tooltip } from '@mui/material';
import {
    LocationOn,       // For coordinates
    Home,             // For street address
    Groups,           // For neighborhood
    LocationCity,     // For city
    Map,              // For county
    Flag,             // For state
    LocalPostOffice,  // For postal code
    Public,           // For country
} from '@mui/icons-material';

const LocationDetails = ({ token }) => {
    const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const [locationData, setLocationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocationData = async (latitude, longitude) => {
            try {
                const googleResponse = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApiKey}`
                );

                if (!googleResponse.ok) {
                    throw new Error('Failed to fetch from Google Maps API');
                }

                const googleData = await googleResponse.json();

                if (googleData.status !== 'OK' || googleData.results.length === 0) {
                    throw new Error('No results found from Google Maps API');
                }

                // Process Google API response
                const result = googleData.results[0];
                const addressComponents = {};

                result.address_components.forEach(component => {
                    if (component.types.includes('street_number')) {
                        addressComponents.streetNumber = component.long_name;
                    } else if (component.types.includes('route')) {
                        addressComponents.street = component.long_name;
                    } else if (component.types.includes('neighborhood')) {
                        addressComponents.neighborhood = component.long_name;
                    } else if (component.types.includes('locality')) {
                        addressComponents.city = component.long_name;
                    } else if (component.types.includes('administrative_area_level_2')) {
                        addressComponents.county = component.long_name;
                    } else if (component.types.includes('administrative_area_level_1')) {
                        addressComponents.state = component.long_name;
                    } else if (component.types.includes('country')) {
                        addressComponents.country = component.long_name;
                    } else if (component.types.includes('postal_code')) {
                        addressComponents.postalCode = component.long_name;
                    }
                });

                setLocationData({
                    formattedAddress: result.formatted_address,
                    address: addressComponents,
                    geometry: result.geometry
                });
                setLoading(false);

            } catch (err) {
                console.error('Error fetching address:', err);
                setError('Unable to fetch address details. Please try again later.');
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
                    (err) => {
                        console.error('Error getting user location:', err);
                        setError('Geolocation access denied or not supported');
                        setLoading(false);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
                setError('Geolocation not supported');
                setLoading(false);
            }
        };

        if (token) {
            getPosition();
        }
    }, [token, googleApiKey]);

    return (
        <Paper elevation={10} className="card-animation" style={{ padding: 20, borderRadius: 10 }}>
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
                        {[...Array(4)].map((_, i) => (
                            <Box key={i} display="flex" alignItems="center" mb={1}>
                                <Skeleton variant="circular" width={24} height={24} />
                                <Box ml={2} width="100%">
                                    <Skeleton width="70%" />
                                </Box>
                            </Box>
                        ))}
                    </Grid>
                </Grid>
            ) : error ? (
                <Typography variant="body1" color="error">
                    {error}
                </Typography>
            ) : (
                <>
                    {/* Top Section - Image and address info */}
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
                                src="/image/Current_Location_Details.webp"
                                alt="Location"
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

                        {/* Address Info Section */}
                        <Box sx={{
                            width: { xs: '100%', md: '50%' },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Location Details
                            </Typography>
                            {locationData ? (
                                <Box>
                                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        Full Address:
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        <Tooltip title={locationData.formattedAddress || 'N/A'} arrow>
                                            <span>
                                                {(() => {
                                                    const fullAddress = locationData.formattedAddress || 'N/A';
                                                    const words = fullAddress.split(' ');

                                                    // Limit to first 10 words
                                                    return words.length > 10
                                                        ? words.slice(0, 10).join(' ') + ' ...'
                                                        : fullAddress;
                                                })()}
                                            </span>
                                        </Tooltip>
                                    </Typography>
                                </Box>
                            ) : (
                                <Typography variant="body1" color="error">
                                    Location data not available
                                </Typography>
                            )}
                        </Box>
                    </Box>

                    {/* Bottom Section - Location details */}
                    {locationData && locationData.address && (
                        <Box>
                            <Divider sx={{ my: 2 }} />
                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <Home color="primary" sx={{ mr: 1 }} />
                                        <Tooltip
                                            title={
                                                locationData?.address?.streetNumber
                                                    ? `${locationData.address.streetNumber} ${locationData.address.street}`
                                                    : locationData?.address?.street || 'N/A'
                                            }
                                            arrow
                                        >
                                            <Typography variant="body1" noWrap sx={{ maxWidth: 250 }}>
                                                Street:{' '}
                                                {(() => {
                                                    const fullText = locationData?.address?.streetNumber
                                                        ? `${locationData.address.streetNumber} ${locationData.address.street}`
                                                        : locationData?.address?.street || 'N/A';

                                                    const words = fullText.split(' ');
                                                    return words.length > 10
                                                        ? words.slice(0, 10).join(' ') + '...'
                                                        : fullText;
                                                })()}
                                            </Typography>
                                        </Tooltip>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <Groups color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body1">
                                            Neighborhood: {locationData.address.neighborhood || 'N/A'}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <LocationCity color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body1">
                                            City: {locationData.address.city || 'N/A'}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <Flag color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body1">
                                            State: {locationData.address.state || 'N/A'}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <LocalPostOffice color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body1">
                                            Postal Code: {locationData.address.postalCode || 'N/A'}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <Public color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body1">
                                            Country: {locationData.address.country || 'N/A'}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <LocationOn color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body1">
                                            Latitude: {locationData.geometry?.location?.lat?.toFixed(4)}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <LocationOn color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body1">
                                            Longitude: {locationData.geometry?.location?.lng?.toFixed(4)}
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

export default LocationDetails;
