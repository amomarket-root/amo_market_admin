import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Skeleton, Alert, Box, Divider } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

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
    const offsetX = 10; // Adjust this value to move the label left
    const roundedValue = Math.round(value); // Round the value

    return (
        <StyledText x={left + width / 2 - offsetX} y={top + height / 2}>
            {roundedValue}
        </StyledText>
    );
}

PieCenterLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

const GoogleAnalyticSection2Page = ({ token, timeRange }) => {
    // State variables for data, loading, and error
    const [data, setData] = useState({
        user_types: [],
        top_browser: [],
        top_operating_systems: [],
        most_visited_pages: [],
        top_countries_users: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL;

    // Utility function to fetch data
    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(
                `${apiUrl}/admin/dashboard-analytic-section-2?type_period=${timeRange}`,
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
            setData(result);
        } catch (err) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on mount and when timeRange changes
    useEffect(() => {
        if (token) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, timeRange]);

    // Helper functions to extract data and calculate percentages
    const getUserTypeData = () => {
        const colors = [
            '#10d915', '#9952d6', '#f27474', '#f29d3a', '#4a90e2',
            '#50e3c2', '#b8e986', '#bd10e0', '#ff6666', '#ffe600'
        ];

        if (data.user_types && data.user_types.length > 0) {
            const totalUsers = data.user_types.reduce((sum, item) => sum + item.activeUsers, 0);

            return data.user_types.map((item, index) => ({
                id: index,
                value: item.activeUsers,
                percentage: ((item.activeUsers / totalUsers) * 100).toFixed(1), // Calculate percentage
                label: item.newVsReturning.charAt(0).toUpperCase() + item.newVsReturning.slice(1),
                color: colors[index % colors.length] // Assign color by cycling through the colors array
            }));
        }
        return [];
    };


    const getTopBrowserData = () => {
        const colors = [
            '#10d915', '#9952d6', '#f27474', '#f29d3a', '#4a90e2',
            '#50e3c2', '#b8e986', '#bd10e0', '#ff6666', '#ffe600'
        ];

        if (data.top_browser && data.top_browser.length > 0) {
            const totalUsers = data.top_browser.reduce((sum, item) => sum + parseInt(item.totalUsers, 10), 0);

            return data.top_browser.map((item, index) => ({
                id: index,
                value: parseInt(item.totalUsers, 10),
                percentage: ((parseInt(item.totalUsers, 10) / totalUsers) * 100).toFixed(1), // Calculate percentage
                label: item.browser,
                color: colors[index % colors.length] // Assign color by cycling through the colors array
            }));
        }
        return [];
    };

    const getTopOSData = () => {
        const colors = [
            '#10d915', '#9952d6', '#f27474', '#f29d3a', '#4a90e2',
            '#50e3c2', '#b8e986', '#bd10e0', '#ff6666', '#ffe600'
        ];

        if (data.top_operating_systems && data.top_operating_systems.length > 0) {
            const totalUsers = data.top_operating_systems.reduce((sum, item) => sum + parseInt(item.totalUsers, 10), 0);

            return data.top_operating_systems.map((item, index) => ({
                id: index,
                value: parseInt(item.totalUsers, 10),
                percentage: ((parseInt(item.totalUsers, 10) / totalUsers) * 100).toFixed(1), // Calculate percentage
                label: item.operatingSystem,
                color: colors[index % colors.length] // Assign color by cycling through the colors array
            }));
        }
        return [];
    };


    // Define an array representing each analytic pie chart
    const pieCharts = [
        {
            title: 'Top Browser',
            data: getTopBrowserData(),
            total: data.top_browser.reduce((sum, item) => sum + parseInt(item.totalUsers, 10), 0),
        },
        {
            title: 'User Type',
            data: getUserTypeData(),
            total: data.user_types.reduce((sum, item) => sum + item.activeUsers, 0),
        },
        {
            title: 'Top Operating Systems',
            data: getTopOSData(),
            total: data.top_operating_systems.reduce((sum, item) => sum + parseInt(item.totalUsers, 10), 0),
        },
    ];

    // If there's an error, display it
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
            {/* Top Browser takes full width */}
            <Grid item xs={12}>
                <Paper elevation={10} className="card-animation" style={{ flex: 1, height: 'auto', padding: '10px', borderRadius: '10px' }}>
                    <Typography
                        style={{
                            fontWeight: 'bold',
                            textAlign: 'left',
                            // marginBottom: '5px',
                            fontSize: '1.5rem',
                            width: '100%',
                        }}
                        gutterBottom
                    >
                        {pieCharts[0].title}
                    </Typography>

                    {loading ? (
                        <Grid container spacing={2} alignItems="center" style={{ height: '100%' }}>
                            <Grid item xs={10} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Skeleton variant="rectangular" width={550} height={250} style={{ borderRadius: '5px' }} />
                                <Skeleton variant="text" width="40%" height={150} style={{ margin: '5px' }} />
                            </Grid>
                            <Grid item xs={4} container direction="column" justifyContent="flex-start" alignItems="flex-start">
                                <Skeleton variant="text" width="300%" height={50} />
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8} container justifyContent="center">
                                <PieChart
                                    series={[
                                        {
                                            data: pieCharts[0].data.map(({ value, label }) => ({ value, label })),
                                            innerRadius: 80,
                                            outerRadius: 120,
                                            paddingAngle: 1,
                                            cornerRadius: 4,
                                            cx: 240,
                                            cy: 200,
                                        },
                                    ]}
                                    colors={pieCharts[0].data.map((item) => item.color)}
                                    width={600}
                                    height={400}
                                >
                                    {pieCharts[0].total > 0 && <PieCenterLabel value={pieCharts[0].total} />}
                                </PieChart>
                                <Divider orientation="vertical" flexItem />
                            </Grid>
                            <Grid item xs={12} md={4} container direction="column" justifyContent="center">
                                <Typography variant="subtitle1">
                                    <Grid container spacing={2}>
                                        {pieCharts[0].data.map((item) => (
                                            <Grid item xs={12} key={item.id}>
                                                <Box display="flex" alignItems="center">
                                                    <Box sx={{ width: 12, height: 12, backgroundColor: item.color, mr: 1, borderRadius: "50%" }} />
                                                    {`${item.percentage}% - ${item.label}`}
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </Paper>
            </Grid>

            {/* User Type and Top Operating Systems side by side */}
            <Grid item xs={12} md={6}>
                <Paper elevation={10} className="card-animation" style={{ flex: 1, height: 'auto', padding: '20px', borderRadius: '10px' }}>
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
                        {pieCharts[1].title}
                    </Typography>

                    {loading ? (
                        <Grid container spacing={2} alignItems="center" style={{ height: '100%' }}>
                            <Grid item xs={10} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Skeleton variant="rectangular" width={550} height={250} style={{ borderRadius: '5px' }} />
                                <Skeleton variant="text" width="40%" height={150} style={{ margin: '5px' }} />
                            </Grid>
                            <Grid item xs={4} container direction="column" justifyContent="flex-start" alignItems="flex-start">
                                <Skeleton variant="text" width="300%" height={50} />
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8} container justifyContent="center">
                                <PieChart
                                    series={[
                                        {
                                            data: pieCharts[1].data.map(({ value, label }) => ({ value, label })),
                                            innerRadius: 80,
                                            outerRadius: 120,
                                            paddingAngle: 1,
                                            cornerRadius: 4,
                                            cx: 120,
                                            cy: 150,
                                        },
                                    ]}
                                    colors={pieCharts[1].data.map((item) => item.color)}
                                    width={370}
                                    height={300}
                                >
                                    {pieCharts[1].total > 0 && <PieCenterLabel value={pieCharts[1].total} />}
                                </PieChart>
                            </Grid>
                            <Grid item xs={12} md={4} container direction="column" justifyContent="center">
                                <Typography variant="subtitle1">
                                    <Grid container spacing={2}>
                                        {pieCharts[1].data.map((item) => (
                                            <Grid item xs={12} key={item.id}>
                                                <Box display="flex" alignItems="center">
                                                    <Box sx={{ width: 12, height: 12, backgroundColor: item.color, mr: 1, borderRadius: "50%" }} />
                                                    {`${item.percentage}% - ${item.label}`}
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
                <Paper elevation={10} className="card-animation" style={{ flex: 1, height: 'auto', padding: '20px', borderRadius: '10px' }}>
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
                        {pieCharts[2].title}
                    </Typography>

                    {loading ? (
                        <Grid container spacing={2} alignItems="center" style={{ height: '100%' }}>
                            <Grid item xs={10} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Skeleton variant="rectangular" width={550} height={250} style={{ borderRadius: '5px' }} />
                                <Skeleton variant="text" width="40%" height={150} style={{ margin: '5px' }} />
                            </Grid>
                            <Grid item xs={4} container direction="column" justifyContent="flex-start" alignItems="flex-start">
                                <Skeleton variant="text" width="300%" height={50} />
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8} container justifyContent="center">
                                <PieChart
                                    series={[
                                        {
                                            data: pieCharts[2].data.map(({ value, label }) => ({ value, label })),
                                            innerRadius: 80,
                                            outerRadius: 120,
                                            paddingAngle: 1,
                                            cornerRadius: 4,
                                            cx: 128,
                                            cy: 150,
                                        },
                                    ]}
                                    colors={pieCharts[2].data.map((item) => item.color)}
                                    width={390}
                                    height={300}
                                >
                                    {pieCharts[2].total > 0 && <PieCenterLabel value={pieCharts[2].total} />}
                                </PieChart>
                                <Divider orientation="vertical" flexItem />
                            </Grid>
                            <Grid item xs={12} md={4} container direction="column" justifyContent="center">
                                <Typography variant="subtitle1">
                                    <Grid container spacing={2}>
                                        {pieCharts[2].data.map((item) => (
                                            <Grid item xs={12} key={item.id}>
                                                <Box display="flex" alignItems="center">
                                                    <Box sx={{ width: 12, height: 12, backgroundColor: item.color, mr: 1, borderRadius: "50%" }} />
                                                    {`${item.percentage}% - ${item.label}`}
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </Paper>
            </Grid>

            <Grid container item xs={12} spacing={2}>
                {/* Most Visited Pages */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={10} className="card-animation" style={{ flex: 1, height: 'auto', padding: '20px', borderRadius: '10px' }}>
                        <Typography
                            style={{
                                fontWeight: 'bold',
                                textAlign: 'left',
                                marginBottom: '10px',
                                fontSize: '1.5rem',
                                width: '100%',
                            }}
                            gutterBottom
                        >
                            Most Visited Pages
                        </Typography>
                        {loading ? (
                            <Skeleton variant="rectangular" width="100%" height={300} />
                        ) : (
                            <Grid container spacing={2}>
                                {data.most_visited_pages.map((page, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Typography variant="body1">{page.pageTitle}</Typography>
                                            <Typography variant="body2">{`${page.sessions} Sessions`}</Typography>
                                        </Box>
                                        <Box width="100%" bgcolor="#e0f7fa" borderRadius="5px">
                                            <Box
                                                width={`${(page.screenPageViews / data.most_visited_pages[0].screenPageViews) * 100}%`}
                                                bgcolor="#9952d6"
                                                height="10px"
                                                borderRadius="5px"
                                            />
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Paper>
                </Grid>

                {/* Visitors by State */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={10} className="card-animation" style={{ flex: 1, height: 'auto', padding: '20px', borderRadius: '10px' }}>
                        <Typography
                            style={{
                                fontWeight: 'bold',
                                textAlign: 'left',
                                marginBottom: '10px',
                                fontSize: '1.5rem',
                                width: '100%',
                            }}
                            gutterBottom
                        >
                            Visitors by State
                        </Typography>
                        {loading ? (
                            <Skeleton variant="rectangular" width="100%" height={300} />
                        ) : (
                            <Grid container spacing={2}>
                                {data.visitors_by_state.map((state, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Typography variant="body1">{state.region}</Typography>
                                            <Typography variant="body2">{`${state.totalUsers} Users`}</Typography>
                                        </Box>
                                        <Box width="100%" bgcolor="#ffecb3" borderRadius="5px">
                                            <Box
                                                width={`${(state.activeUsers / data.visitors_by_state[0].activeUsers) * 100}%`}
                                                bgcolor="#10d915"
                                                height="10px"
                                                borderRadius="5px"
                                            />
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default GoogleAnalyticSection2Page;
