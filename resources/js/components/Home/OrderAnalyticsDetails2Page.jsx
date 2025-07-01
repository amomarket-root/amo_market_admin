import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Skeleton, Alert, Box, Divider } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

// Styling for center label text
const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
    fontWeight: 'bold',
}));

// Center label component
function PieCenterLabel({ value }) {
    const { width, height, left, top } = useDrawingArea();
    const offsetX = 10;
    const roundedValue = Math.round(value);

    return (
        <StyledText x={left + width / 2 - offsetX} y={top + height / 2}>
            {roundedValue}
        </StyledText>
    );
}

PieCenterLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

const OrderAnalyticsDetails2Page = ({ token }) => {
    const [topLocations, setTopLocations] = useState([]);
    const [statusStats, setStatusStats] = useState({});
    const [loading, setLoading] = useState({
        locations: false,
        status: false
    });
    const [error, setError] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL;

    // Chart dimensions
    const CHART_HEIGHT = 400;
    const CHART_WIDTH = 640;
    const PAPER_HEIGHT = 350;
    const PAPER_PADDING = '20px';

    const fetchTopLocations = async () => {
        setLoading(prev => ({ ...prev, locations: true }));
        setError('');
        try {
            const response = await fetch(
                `${apiUrl}/admin/top-locations`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            setTopLocations(result.data);
        } catch (err) {
            setError(err.message || 'Failed to fetch top locations');
        } finally {
            setLoading(prev => ({ ...prev, locations: false }));
        }
    };

    const fetchStatusStats = async () => {
        setLoading(prev => ({ ...prev, status: true }));
        setError('');
        try {
            const response = await fetch(
                `${apiUrl}/admin/status-stats`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();

            setStatusStats(result.data);
        } catch (err) {
            setError(err.message || 'Failed to fetch status statistics');
        } finally {
            setLoading(prev => ({ ...prev, status: false }));
        }
    };

    useEffect(() => {
        if (token) {
            fetchTopLocations();
            fetchStatusStats();
        }
    }, [token]);

    // Prepare status stats data for pie chart
    const getStatusStatsData = () => {
        const colors = [
            '#4a90e2', // Blue - reached
            '#9952d6', // Purple - preparing
            '#f27474', // Red - accepted
            '#f29d3a', // Orange - on_the_way
            '#10d915', // Green - delivered
        ];

        if (Object.keys(statusStats).length > 0) {
            const total = Object.values(statusStats).reduce((sum, val) => sum + val, 0);
            return Object.keys(statusStats).map((key, index) => ({
                id: index,
                value: statusStats[key],
                percentage: ((statusStats[key] / total) * 100).toFixed(1),
                label: key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                color: colors[index % colors.length]
            }));
        }
        return [];
    };

    const statusStatsData = getStatusStatsData();
    const statusStatsTotal = statusStatsData.reduce((sum, item) => sum + item.value, 0);

    // Bar chart settings for top locations
    const locationsChartSettings = {
        height: CHART_HEIGHT,
        width: CHART_WIDTH,
        margin: { top: 20, right: 30, left: 40, bottom: 100 },
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translateX(-10px)',
            },
            [`.${axisClasses.bottom} .${axisClasses.label}`]: {
                transform: 'rotate(-45deg) translateY(-20px)',
                textAnchor: 'end',
            },
        },
        xAxis: [
            {
                scaleType: 'band',
                dataKey: 'location',
                tickPlacement: 'middle',
                tickLabelPlacement: 'middle',
            },
        ],
        yAxis: [
            {
                scaleType: 'linear'
            },
        ],
        series: [
            {
                dataKey: 'order_count',
                label: 'Order Count',
                color: '#9952d6',
            },
        ],
    };

    if (error) {
        return (
            <Grid container item xs={12} spacing={3} justifyContent="center">
                <Grid item xs={12}>
                    <Alert severity="error">{error}</Alert>
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} md={6}>
                <Paper elevation={10} className="card-animation" style={{ flex: 1, height: 'auto', padding: '20px', borderRadius: 10 }}>
                    <Typography
                        style={{
                            fontWeight: 'bold',
                            textAlign: 'left',
                            marginBottom: '5px',
                            fontSize: '1.5rem',
                            width: '100%',
                        }}
                        gutterBottom
                    >
                        Top Order Locations
                    </Typography>

                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {loading.locations ? (
                            <Skeleton
                                variant="rectangular"
                                width={CHART_WIDTH}
                                height={CHART_HEIGHT}
                            />
                        ) : topLocations.length > 0 ? (
                            <BarChart
                                dataset={topLocations}
                                {...locationsChartSettings}
                                tooltip={{ trigger: 'item' }}
                            />
                        ) : (
                            <Typography variant="h6" color="textSecondary">
                                No location data available
                            </Typography>
                        )}
                    </Box>
                </Paper>
            </Grid>

            {/* Status Stats Pie Chart */}
            <Grid item xs={12} md={6}>
                <Paper elevation={10} className="card-animation" style={{ flex: 1, height: 'auto', padding: '20px', borderRadius: 10 }}>
                    <Typography
                        style={{
                            fontWeight: 'bold',
                            textAlign: 'left',
                            marginBottom: '5px',
                            fontSize: '1.5rem',
                            width: '100%',
                        }}
                        gutterBottom
                    >
                        Order Status Statistics
                    </Typography>

                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {loading.status ? (
                            <Skeleton
                                variant="rectangular"
                                width={CHART_WIDTH}
                                height={CHART_HEIGHT}
                            />
                        ) : statusStatsData.length > 0 ? (
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={7} container justifyContent="center">
                                    <PieChart
                                        series={[
                                            {
                                                data: statusStatsData.map(({ value, label }) => ({ value, label })),
                                                innerRadius: 80,
                                                outerRadius: 120,
                                                paddingAngle: 1,
                                                cornerRadius: 4,
                                            },
                                        ]}
                                        colors={statusStatsData.map((item) => item.color)}
                                        width={CHART_WIDTH * 0.7}
                                        height={CHART_HEIGHT}
                                    >
                                        {statusStatsTotal > 0 && <PieCenterLabel value={statusStatsTotal} />}
                                    </PieChart>
                                </Grid>
                                <Grid item xs={12} md={5} container direction="column" justifyContent="center">
                                    <Box>
                                        {statusStatsData.map((item) => (
                                            <Box key={item.id} display="flex" alignItems="center" mb={1}>
                                                <Box sx={{
                                                    width: 12,
                                                    height: 12,
                                                    backgroundColor: item.color,
                                                    mr: 1,
                                                    borderRadius: "50%"
                                                }} />
                                                <Typography variant="body1">
                                                    {`${item.percentage}% - ${item.label}`}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Grid>
                            </Grid>
                        ) : (
                            <Typography variant="h6" color="textSecondary">
                                No status data available
                            </Typography>
                        )}
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default OrderAnalyticsDetails2Page;
