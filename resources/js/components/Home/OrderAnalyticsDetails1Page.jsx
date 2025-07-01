import React, { useEffect, useState } from 'react';
import {Grid,Paper,Typography,Skeleton,Alert,Box} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const OrderAnalyticsDetails1Page = ({ token }) => {
    const [monthlyStats, setMonthlyStats] = useState([]);
    const [weeklyStats, setWeeklyStats] = useState({});
    const [loading, setLoading] = useState({
        monthly: false,
        weekly: false
    });
    const [error, setError] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL;

    // Utility function to process monthly stats data
    const processMonthlyStats = (data) => {
        return data.map(item => ({
            ...item,
            total_income: parseFloat(item.total_income) || 0,
            platform_charge: parseFloat(item.platform_charge) || 0
        }));
    };

    // Utility function to process weekly stats data
    const processWeeklyStats = (data) => {
        return {
            total_orders: data.total_orders || 0,
            total_income: parseFloat(data.total_income) || 0,
            platform_charge: parseFloat(data.platform_charge) || 0
        };
    };

    // Utility function to fetch data
    const fetchMonthlyStats = async () => {
        setLoading(prev => ({ ...prev, monthly: true }));
        setError('');
        try {
            const response = await fetch(
                `${apiUrl}/admin/monthly-stats`,
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
            setMonthlyStats(processMonthlyStats(result.data));
        } catch (err) {
            setError(err.message || 'Failed to fetch monthly stats');
        } finally {
            setLoading(prev => ({ ...prev, monthly: false }));
        }
    };

    const fetchWeeklyStats = async () => {
        setLoading(prev => ({ ...prev, weekly: true }));
        setError('');
        try {
            const response = await fetch(
                `${apiUrl}/admin/week-stats`,
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
            setWeeklyStats(processWeeklyStats(result.data));
        } catch (err) {
            setError(err.message || 'Failed to fetch weekly stats');
        } finally {
            setLoading(prev => ({ ...prev, weekly: false }));
        }
    };

    // Fetch data on mount
    useEffect(() => {
        if (token) {
            fetchMonthlyStats();
            fetchWeeklyStats();
        }
    }, [token]);

    // Chart height constants
    const CHART_HEIGHT = 300;
    const PAPER_MIN_HEIGHT = 400;

    // Monthly chart settings
    const monthlyChartSettings = {
        height: CHART_HEIGHT,
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
                dataKey: 'month',
                tickPlacement: 'middle',
                tickLabelPlacement: 'middle',
            },
        ],
        yAxis: [
            {
                id: 'orders-axis',
                scaleType: 'linear'
            },
            {
                id: 'amount-axis',
                label: 'Amount(₹)',
                scaleType: 'linear'
            },
        ],
        series: [
            {
                dataKey: 'total_orders',
                label: 'Total Orders',
                yAxisKey: 'orders-axis',
                color: '#f27474', // Red
            },
            {
                dataKey: 'total_income',
                label: 'Total Income(₹)',
                yAxisKey: 'amount-axis',
                color: '#9952d6', // Purple
            },
            {
                dataKey: 'platform_charge',
                label: 'Platform Fee(₹)',
                yAxisKey: 'amount-axis',
                color: '#10d915', // Green
            },
        ],
        slotProps: {
            legend: {
                direction: 'row',
                position: { vertical: 'bottom', horizontal: 'middle' },
                padding: 0,
            },
        },
    };

    // Weekly chart settings
    const weeklyChartSettings = {
        height: CHART_HEIGHT,
        margin: { top: 20, right: 30, left: 40, bottom: 80 },
        layout: 'horizontal',
        xAxis: [
            {
                scaleType: 'linear',
            },
        ],
        yAxis: [
            {
                scaleType: 'band',
                dataKey: 'name',
                tickPlacement: 'middle',
                tickLabelPlacement: 'middle',
            },
        ],
        series: [
            {
                dataKey: 'orders',
                label: 'Total Orders',
                color: '#f27474', // Red
            },
            {
                dataKey: 'income',
                label: 'Total Income(₹)',
                color: '#9952d6', // Purple
            },
            {
                dataKey: 'platformCharge',
                label: 'Platform Fee(₹)',
                color: '#10d915', // Green
            },
        ],
        slotProps: {
            legend: {
                direction: 'row',
                position: { vertical: 'bottom', horizontal: 'middle' },
                padding: 0,
            },
        },
    };

    // Format weekly data for bar chart
    const weeklyChartData = [
        {
            name: 'Current Week',
            orders: weeklyStats.total_orders,
            income: weeklyStats.total_income,
            platformCharge: weeklyStats.platform_charge
        }
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
            {/* Monthly Stats */}
            <Grid item xs={12} md={6}>
                <Paper elevation={10} className="card-animation" style={{
                    minHeight: PAPER_MIN_HEIGHT,
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '10px'
                }}>
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
                        Monthly Order Statistics
                    </Typography>

                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {loading.monthly ? (
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={CHART_HEIGHT}
                            />
                        ) : monthlyStats.length > 0 ? (
                            <BarChart
                                dataset={monthlyStats}
                                {...monthlyChartSettings}
                                tooltip={{ trigger: 'item' }}
                            />
                        ) : (
                            <Typography variant="h6" color="textSecondary">
                                No monthly data available
                            </Typography>
                        )}
                    </Box>
                </Paper>
            </Grid>

            {/* Weekly Stats */}
            <Grid item xs={12} md={6}>
                <Paper elevation={10} className="card-animation" style={{
                    minHeight: PAPER_MIN_HEIGHT,
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '10px'
                }}>
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
                        Current Week Order Statistics
                    </Typography>

                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {loading.weekly ? (
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={CHART_HEIGHT}
                            />
                        ) : weeklyStats.total_orders !== undefined ? (
                            <BarChart
                                dataset={weeklyChartData}
                                {...weeklyChartSettings}
                                tooltip={{ trigger: 'item' }}
                            />
                        ) : (
                            <Typography variant="h6" color="textSecondary">
                                No weekly data available
                            </Typography>
                        )}
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default OrderAnalyticsDetails1Page;
