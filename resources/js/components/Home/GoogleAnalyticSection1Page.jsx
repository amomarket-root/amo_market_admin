import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Skeleton, Alert } from '@mui/material';
import PropTypes from 'prop-types';

const GoogleAnalyticSection1Page = ({ token, timeRange }) => {
  // State variables for data, loading, and error
  const [data, setData] = useState({
    visitor: [],
    page_view: [],
    active_users: [],
    total_visitors: [],
    sessions: [],
    bounce_rate: [],
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
        `${apiUrl}/admin/dashboard-analytic-section-1?type_period=${timeRange}`,
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

  // Helper functions to extract data
  const getVisitor = () => {
    if (data.visitor && data.visitor.length > 0) {
      return data.visitor[0].activeUsers || 0;
    }
    return 0;
  };

  const getPageView = () => {
    if (data.page_view && data.page_view.length > 0) {
      return data.page_view[0].screenPageViews || 0;
    }
    return 0;
  };

  const getActiveUsers = () => {
    if (data.active_users && data.active_users.length > 0) {
      return `${data.active_users[0].activeUsers}/${data.active_users[0].totalUsers}`;
    }
    return '0/0';
  };

  const getTotalVisitors = () => {
    if (data.total_visitors && data.total_visitors.length > 0) {
      return data.total_visitors[0].screenPageViews || 0;
    }
    return 0;
  };

  const getSessions = () => {
    if (data.sessions && data.sessions.length > 0) {
      return data.sessions[0].sessions || 0;
    }
    return 0;
  };

  const getBounceRate = () => {
    if (data.bounce_rate && data.bounce_rate.length > 0) {
      return `${(parseFloat(data.bounce_rate[0].bounceRate) * 100).toFixed(2)}%`;
    }
    return '0.00%';
  };

  // Define an array representing each analytic card
  const analyticCards = [
    {
      title: 'Visitor',
      value: getVisitor(),
      imgSrc: '/image/visitor.webp',
      altText: 'Visitor',
    },
    {
      title: 'Page View',
      value: getPageView(),
      imgSrc: '/image/page_view.webp',
      altText: 'Page View',
    },
    {
      title: 'Active Users',
      value: getActiveUsers(),
      imgSrc: '/image/Active_user.webp',
      altText: 'Active Users',
    },
    {
      title: 'Total Visitors',
      value: getTotalVisitors(),
      imgSrc: '/image/Total_visitors.webp',
      altText: 'Total Visitors',
    },
    {
      title: 'Session',
      value: getSessions(),
      imgSrc: '/image/Session.webp',
      altText: 'Session',
    },
    {
      title: 'Bounce Rate',
      value: getBounceRate(),
      imgSrc: '/image/Bounce_Rate.webp',
      altText: 'Bounce Rate',
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
    <Grid container item xs={12} spacing={3} justifyContent="center">
      {analyticCards.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper elevation={10} className="card-animation" style={{ padding: 20, minHeight: '120px', width: '100%', borderRadius: 10 }}>
            {loading ? (
              <Grid container spacing={2} alignItems="center" style={{ height: '100%' }}>
                <Grid item xs={5} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Skeleton variant="rectangular" width={100} height={100} style={{ borderRadius: '5px' }} />
                </Grid>
                <Grid item xs={7} container direction="column" justifyContent="flex-start" alignItems="flex-start">
                  <Skeleton variant="text" width="100%" height={20} />
                  <Skeleton variant="text" width="100%" height={40} style={{ marginTop: 20 }} />
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={2} alignItems="center" style={{ height: '100%' }}>
                <Grid item xs={5} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={card.imgSrc} alt={card.altText} style={{ maxWidth: '100%', height: 'auto' }}  loading="eager" decoding="async" />
                </Grid>
                <Grid item xs={7} container direction="column" justifyContent="flex-start" alignItems="flex-start">
                  <Typography variant="body1" style={{ textAlign: 'left' }}>
                    {card.title}
                  </Typography>
                  <Typography
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginTop: '20px',
                      fontSize: '2rem',
                      width: '100%',
                    }}
                  >
                    {card.value}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

// Define PropTypes for better type checking
GoogleAnalyticSection1Page.propTypes = {
  token: PropTypes.string.isRequired,
  timeRange: PropTypes.string.isRequired,
};

export default GoogleAnalyticSection1Page;
