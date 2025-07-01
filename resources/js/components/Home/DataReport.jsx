import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Grid,
    Paper,
    Typography,
    CircularProgress,
    Box,
    Divider,
    useTheme,
    useMediaQuery
} from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import StorefrontIcon from '@mui/icons-material/Storefront';
import {
    People as PeopleIcon,
    DeliveryDining as DeliveryIcon,
    LocalShipping as ShippingIcon,
    VolunteerActivism as DonationIcon,
    MilitaryTech as ArmyIcon
} from '@mui/icons-material';
import CountUp from 'react-countup';

const DataReport = ({ token, timeRange }) => {
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${apiUrl}/admin/reports/data`, {
                    params: { time_range: timeRange },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                });
                setReportData(response.data.data);
                setError(null);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch report data');
                console.error('Error fetching report data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReportData();
    }, [token, timeRange]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" py={4}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (!reportData) return null;

    const StatPaper = ({ icon, title, value, subItems = [], color = 'primary' }) => (
        <Paper
            elevation={10}  className="card-animation"
            sx={{
                height: '100%',
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
            }}
        >
            <Box display="flex" alignItems="center" mb={2}>
                {React.cloneElement(icon, { color, sx: { fontSize: '2rem', mr: 2 } })}
                <Typography variant="h6" color="text.secondary">
                    {title}
                </Typography>
            </Box>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
                <CountUp end={value} duration={1} />
            </Typography>

            {subItems.length > 0 && (
                <>
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
                        {subItems.map((item, index) => (
                            <Box key={index} sx={{ flex: 1, minWidth: isMobile ? '100%' : '120px' }}>
                                <Typography variant="body2" color="text.secondary">
                                    {item.label}
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                    <CountUp end={item.value} duration={1} />
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </>
            )}
        </Paper>
    );

    return (
        <Grid container spacing={2} sx={{ mb: 1 }}>
            {/* Customers */}
            <Grid item xs={12} sm={6} md={3}>
                <StatPaper
                    icon={<PeopleIcon />}
                    title="Platform Customers"
                    value={reportData.customer_count}
                    color="info"
                />
            </Grid>

            {/* Shops */}
            <Grid item xs={12} sm={6} md={3}>
                <StatPaper
                    icon={<StorefrontIcon />}
                    title="Registered Shops"
                    value={reportData.shop_stats.total}
                    subItems={[
                        { label: 'Active', value: reportData.shop_stats.active },
                        { label: 'Inactive', value: reportData.shop_stats.inactive }
                    ]}
                    color="primary"
                />
            </Grid>

            {/* Delivery Persons */}
            <Grid item xs={12} sm={6} md={3}>
                <StatPaper
                    icon={<DeliveryIcon />}
                    title="Delivery Persons"
                    value={reportData.delivery_person_stats.total}
                    subItems={[
                        { label: 'Active', value: reportData.delivery_person_stats.active },
                        { label: 'Inactive', value: reportData.delivery_person_stats.inactive }
                    ]}
                    color="warning"
                />
            </Grid>

            {/* Orders */}
            <Grid item xs={12} sm={6} md={3}>
                <StatPaper
                    icon={<ShippingIcon />}
                    title="Total Orders"
                    value={reportData.order_stats.total}
                    subItems={[
                        { label: 'Completed', value: reportData.order_stats.completed },
                        { label: 'In Progress', value: reportData.order_stats.in_progress }
                    ]}
                    color="secondary"
                />
            </Grid>

            {/* Platform Revenue */}
            <Grid item xs={12} sm={6} md={4}>
                <Paper
                    elevation={10} className="card-animation"
                    sx={{
                        height: '100%',
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 3,
                    }}
                >
                    <Box display="flex" alignItems="center" mb={2}>
                        <CurrencyRupeeIcon color="success" sx={{ fontSize: '2rem', mr: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            Platform Revenue
                        </Typography>
                    </Box>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                        ₹<CountUp end={reportData.platform_revenue} duration={1} decimals={2} />
                    </Typography>
                </Paper>
            </Grid>

            {/* Donations */}
            <Grid item xs={12} sm={6} md={4}>
                <Paper
                    elevation={10} className="card-animation"
                    sx={{
                        height: '100%',
                        p: 3,
                        borderRadius: 3,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box display="flex" alignItems="center" mb={2}>
                        <DonationIcon color="error" sx={{ fontSize: '2rem', mr: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            Feeding India Donations
                        </Typography>
                    </Box>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                        <CountUp end={reportData.feeding_india_donation} duration={1} decimals={2}/>
                    </Typography>
                </Paper>
            </Grid>

            {/* Armed Force Donations */}
            <Grid item xs={12} sm={6} md={4}>
                <Paper
                    elevation={10} className="card-animation"
                    sx={{
                        height: '100%',
                        p: 3,
                        borderRadius: 3,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box display="flex" alignItems="center" mb={2}>
                        <ArmyIcon color="action" sx={{ fontSize: '2rem', mr: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            Armed Force Contributions
                        </Typography>
                    </Box>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                        <CountUp end={reportData.armed_force_donation} duration={1} decimals={2}/>
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default DataReport;
