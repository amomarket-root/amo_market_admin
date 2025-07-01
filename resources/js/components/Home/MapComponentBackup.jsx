import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { Paper, Typography, Skeleton, Alert, CircularProgress, Box, IconButton } from '@mui/material';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { PlayArrow, Pause, SkipNext, SkipPrevious } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const containerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '10px'
};

const defaultCenter = {
    lat: 20.5937,
    lng: 78.9629
};

const defaultZoom = 4.5;
const DISPLAY_DURATION = 5000;
const TRANSITION_DELAY = 4000;
const TARGET_ZOOM_LEVEL = 15;

const MapComponent = ({
    title,
    token,
    timeRange,
    scriptLoaded,
    apiEndpoint,
    dataKey,
    activeKey,
    inactiveKey,
    markerColor,
    defaultMarkerColor,
    defaultCenter: customDefaultCenter,
    loading,
    error,
    locations,
    fetchLocations
}) => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [geocoder, setGeocoder] = useState(null);
    const [fetchingAddress, setFetchingAddress] = useState(false);
    const [mapBounds, setMapBounds] = useState(null);
    const [zoom, setZoom] = useState(defaultZoom);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [markerSize, setMarkerSize] = useState(15);
    const mapRef = useRef(null);
    const animationRef = useRef(null);
    const growingRef = useRef(true);

    // Animate marker size
    const animateMarker = useCallback(() => {
        if (growingRef.current) {
            setMarkerSize(prev => (prev >= 18 ? (growingRef.current = false, 18) : prev + 0.1));
        } else {
            setMarkerSize(prev => (prev <= 15 ? (growingRef.current = true, 15) : prev - 0.1));
        }
        animationRef.current = requestAnimationFrame(animateMarker);
    }, []);

    useEffect(() => {
        if (scriptLoaded && locations.length > 0) {
            animationRef.current = requestAnimationFrame(animateMarker);
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [scriptLoaded, locations, animateMarker]);

    const calculateBounds = useCallback((locations) => {
        if (!locations || locations.length === 0 || !window.google?.maps) return;

        const bounds = new window.google.maps.LatLngBounds();
        locations.forEach(location => {
            if (location.lat && location.lng) {
                bounds.extend({
                    lat: parseFloat(location.lat),
                    lng: parseFloat(location.lng)
                });
            }
        });

        if (!bounds.isEmpty()) {
            setMapBounds(bounds);

            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();
            const latDiff = Math.abs(ne.lat() - sw.lat());
            const lngDiff = Math.abs(ne.lng() - sw.lng());

            const diff = Math.max(latDiff, lngDiff);
            let newZoom = defaultZoom;

            if (diff < 0.5) newZoom = 10;
            else if (diff < 2) newZoom = 8;
            else if (diff < 5) newZoom = 6;
            else if (diff < 10) newZoom = 5;
            else newZoom = 4;

            setZoom(newZoom);
        }
    }, []);

    useEffect(() => {
        if (locations.length > 0 && window.google?.maps) {
            calculateBounds(locations);
        }
    }, [locations, calculateBounds]);

    const getAddressDetails = useCallback(async (lat, lng) => {
        if (!geocoder) return null;
        setFetchingAddress(true);

        try {
            const response = await new Promise((resolve, reject) => {
                geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                    if (status === 'OK' && results[0]) {
                        resolve(results[0]);
                    } else {
                        reject(new Error('Geocoder failed'));
                    }
                });
            });

            let city = '';
            let state = '';

            for (const component of response.address_components) {
                if (component.types.includes('locality')) {
                    city = component.long_name;
                }
                if (component.types.includes('administrative_area_level_1')) {
                    state = component.long_name;
                }
            }

            return {
                formattedAddress: response.formatted_address,
                city,
                state
            };
        } catch (error) {
            console.error('Geocoding error:', error);
            return null;
        } finally {
            setFetchingAddress(false);
        }
    }, [geocoder]);

    const handleMarkerClick = useCallback(async (location, index) => {
        stopAnimation();
        const lat = parseFloat(location.lat);
        const lng = parseFloat(location.lng);

        const addressDetails = await getAddressDetails(lat, lng);
        setSelectedLocation({
            ...location,
            latitude: lat,
            longitude: lng,
            address: addressDetails?.formattedAddress || 'Address not available',
            city: addressDetails?.city || 'Unknown city',
            state: addressDetails?.state || 'Unknown state'
        });
        setCurrentIndex(index);
        smoothPanToLocation(lat, lng, TARGET_ZOOM_LEVEL);
    }, [getAddressDetails]);

    const smoothPanToLocation = useCallback((lat, lng, targetZoom = null) => {
        if (!mapRef.current || !window.google?.maps) return;

        const startPosition = mapRef.current.getCenter();
        const endPosition = new window.google.maps.LatLng(lat, lng);
        const steps = 30;

        let currentStep = 0;

        const animate = () => {
            currentStep++;
            const progress = currentStep / steps;

            const newLat = startPosition.lat() + (endPosition.lat() - startPosition.lat()) * progress;
            const newLng = startPosition.lng() + (endPosition.lng() - startPosition.lng()) * progress;

            mapRef.current.panTo({ lat: newLat, lng: newLng });

            if (targetZoom !== null && currentStep === 1) {
                mapRef.current.setZoom(targetZoom);
            }

            if (currentStep < steps) {
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        animationRef.current = requestAnimationFrame(animate);
    }, []);

    const startAnimation = useCallback(() => {
        if (locations.length === 0) return;

        setIsPlaying(true);

        const animate = async (index) => {
            setCurrentIndex(index);
            const location = locations[index];
            const lat = parseFloat(location.lat);
            const lng = parseFloat(location.lng);

            smoothPanToLocation(lat, lng, TARGET_ZOOM_LEVEL);

            const addressDetails = await getAddressDetails(lat, lng);
            setSelectedLocation({
                ...location,
                latitude: lat,
                longitude: lng,
                address: addressDetails?.formattedAddress || 'Address not available',
                city: addressDetails?.city || 'Unknown city',
                state: addressDetails?.state || 'Unknown state'
            });

            await new Promise(resolve => setTimeout(resolve, DISPLAY_DURATION));

            const nextIndex = (index + 1) % locations.length;
            animationRef.current = setTimeout(() => animate(nextIndex), TRANSITION_DELAY);
        };

        animate(currentIndex);
    }, [locations, currentIndex, smoothPanToLocation, getAddressDetails]);

    const stopAnimation = useCallback(() => {
        setIsPlaying(false);
        if (animationRef.current) {
            clearTimeout(animationRef.current);
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
    }, []);

    const togglePlayPause = useCallback(() => {
        if (isPlaying) {
            stopAnimation();
        } else {
            startAnimation();
        }
    }, [isPlaying, startAnimation, stopAnimation]);

    const goToNext = useCallback(() => {
        stopAnimation();
        const nextIndex = (currentIndex + 1) % locations.length;
        handleMarkerClick(locations[nextIndex], nextIndex);
    }, [currentIndex, locations, handleMarkerClick, stopAnimation]);

    const goToPrevious = useCallback(() => {
        stopAnimation();
        const prevIndex = (currentIndex - 1 + locations.length) % locations.length;
        handleMarkerClick(locations[prevIndex], prevIndex);
    }, [currentIndex, locations, handleMarkerClick, stopAnimation]);

    const getMarkerSize = useCallback((count) => {
        if (locations.length === 0) return markerSize; // Use animated size as base
        const maxSize = 30;
        const minSize = markerSize; // Use animated size as minimum
        const maxCount = Math.max(...locations.map(loc => loc[dataKey] || 0), 1);
        const scale = Math.log((count || 0) + 1) / Math.log(maxCount + 1);
        return minSize + (maxSize - minSize) * scale;
    }, [locations, dataKey, markerSize]);

    const onLoad = useCallback((map) => {
        mapRef.current = map;
        setGeocoder(new window.google.maps.Geocoder());
        if (locations.length > 0) {
            calculateBounds(locations);
        }
    }, [locations, calculateBounds]);

    const mapOptions = useMemo(() => ({
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
            { featureType: 'poi', stylers: [{ visibility: 'off' }] },
            { featureType: 'transit', stylers: [{ visibility: 'off' }] },
            { featureType: 'road', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] }
        ]
    }), []);

    const renderMarkers = useMemo(() => {
        if (!window.google?.maps || !Array.isArray(locations)) return null;

        return locations.map((location, index) => {
            if (!location.lat || !location.lng) return null;

            return (
                <Marker
                    key={index}
                    position={{
                        lat: parseFloat(location.lat),
                        lng: parseFloat(location.lng)
                    }}
                    onClick={() => handleMarkerClick(location, index)}
                    icon={{
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: getMarkerSize(location[dataKey]),
                        fillColor: index === currentIndex ? '#f27474' : markerColor || defaultMarkerColor,
                        fillOpacity: 0.8,
                        strokeColor: '#ffffff',
                        strokeWeight: 1
                    }}
                />
            );
        });
    }, [locations, getMarkerSize, handleMarkerClick, currentIndex, dataKey, markerColor, defaultMarkerColor]);

    useEffect(() => {
        if (token && apiEndpoint) {
            fetchLocations();
        }

        return () => {
            stopAnimation();
        };
    }, [token, timeRange, fetchLocations, stopAnimation, apiEndpoint]);

    return (
        <Paper elevation={10} className="card-animation" sx={{ padding: '20px', borderRadius: '10px' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                    }}
                    gutterBottom
                >
                    {title}
                </Typography>

                {!loading && locations.length > 0 && (
                    <Box display="flex" alignItems="center">
                        <IconButton onClick={goToPrevious} size="small">
                            <SkipPrevious />
                        </IconButton>
                        <IconButton onClick={togglePlayPause} size="small">
                            {isPlaying ? <Pause /> : <PlayArrow />}
                        </IconButton>
                        <IconButton onClick={goToNext} size="small">
                            <SkipNext />
                        </IconButton>
                    </Box>
                )}
            </Box>

            {loading ? (
                <Skeleton variant="rectangular" width="100%" height={500} />
            ) : error ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            ) : !scriptLoaded ? (
                <Box display="flex" justifyContent="center" alignItems="center" height={500}>
                    <CircularProgress />
                    <Typography variant="body1" ml={2}>Loading Maps...</Typography>
                </Box>
            ) : (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={customDefaultCenter || defaultCenter}
                    zoom={zoom}
                    onLoad={onLoad}
                    options={mapOptions}
                >
                    {renderMarkers}

                    {selectedLocation && (
                        <InfoWindow
                            position={{
                                lat: selectedLocation.latitude,
                                lng: selectedLocation.longitude
                            }}
                            onCloseClick={() => {
                                setSelectedLocation(null);
                                if (mapBounds) {
                                    mapRef.current.fitBounds(mapBounds);
                                }
                            }}
                        >
                            <div style={{ padding: '5px', maxWidth: '230px' }}>
                                {fetchingAddress ? (
                                    <Box display="flex" justifyContent="center" p={2}>
                                        <CircularProgress size={24} />
                                    </Box>
                                ) : (
                                    <>
                                        <Typography variant="subtitle2" fontWeight="bold" color="textSecondary">
                                            {selectedLocation.city}, {selectedLocation.state}
                                        </Typography>

                                        <Typography variant="body2" color="textSecondary">
                                            <strong>Total {title}:</strong> {selectedLocation[dataKey]}
                                        </Typography>

                                        {activeKey && inactiveKey && (
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                                            >
                                                <CheckCircleIcon fontSize="small" sx={{ color: 'green' }} />
                                                <strong>Active:</strong> {selectedLocation[activeKey]}
                                                <CancelIcon fontSize="small" sx={{ color: 'gray', ml: 2 }} />
                                                <strong>Inactive:</strong> {selectedLocation[inactiveKey]}
                                            </Typography>
                                        )}

                                        <Typography variant="caption" display="block" color="textSecondary">
                                            <strong>Address:</strong> {selectedLocation.address}
                                        </Typography>

                                        <Typography variant="caption" display="block" color="textSecondary">
                                            <strong>Lat:</strong> {selectedLocation.latitude.toFixed(4)}, <strong>Lng:</strong> {selectedLocation.longitude.toFixed(4)}
                                        </Typography>
                                    </>

                                )}
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            )}
        </Paper>
    );
};

export default MapComponent;
