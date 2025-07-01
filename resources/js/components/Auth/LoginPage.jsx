import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button, Grid, Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSweetAlert } from '../Template/SweetAlert';
import { useSnackbar } from '../Template/SnackbarAlert';
import AuthLayout from '../Template/AuthLayout';
import "./css/LoginPage.css";


const LoginPage = () => {
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State to track loading
    const isMobile = useMediaQuery("(max-width:600px)");
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        setIsLoading(true); // Set loading to true on form submission

        try {
            const response = await axios.post(`${apiUrl}/admin/auth/login`, {
                email,
                password
            });

            showSnackbar(response.data.message, { severity: 'success' });
            setTimeout(() => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user_id', response.data.user_id);
                navigate('/permission');
            }, 2000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                if (error.response.data.errors.email) {
                    setEmailError(error.response.data.errors.email[0]);
                }
                if (error.response.data.errors.password) {
                    setPasswordError(error.response.data.errors.password[0]);
                }
            } else {
                showAlert({
                    title: error.response.data.message,
                    text: error.response.data.info,
                    icon: "warning",
                    timer: 6000,
                    showConfirmButton: true,
                    timerProgressBar: true,
                    confirmButtonText: "OK",
                });
            }
        } finally {
            setIsLoading(false); // Reset loading after request completes
        }
    };

    return (
        <AuthLayout>
            <Grid container spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
                <Grid item xs={12} md={6} order={isMobile ? 2 : 1}>
                    <Card
                        elevation={20}
                        className="card-animation" // Add this class
                        sx={{ maxWidth: '400px', width: '100%', borderRadius: 3 }}
                    >
                        <CardContent>
                            <div>
                                <Typography variant="h5" gutterBottom>
                                    Hello! Let's get started
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    <span style={{ textAlign: 'right' }}>Sign in to continue.</span>
                                </Typography>
                            </div>
                            <form onSubmit={handleLogin}>
                                <TextField
                                    label="Email" // Label above the field
                                    placeholder="Enter Email" // Placeholder inside the field
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={!!emailError}
                                    helperText={emailError}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                <TextField
                                    label="Password"
                                    placeholder="Enter Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={!!passwordError}
                                    helperText={passwordError}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}

                                />
                                {/* Disable button and show loader when isLoading is true */}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    style={{ marginTop: '1rem' }}
                                    disabled={isLoading} // Disable button when loading
                                >
                                    {isLoading ? 'Loading...' : 'Login'} {/* Change button text based on loading state */}
                                </Button>
                                <Typography variant="body1" align="center" style={{ marginTop: '1rem' }}>
                                    <Link to="/forgotPassword">Forgot Password?</Link>
                                </Typography>
                                <Typography variant="body1" align="center">
                                    Don't have an account? <Link to="/register">Sign Up</Link>
                                </Typography>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} order={isMobile ? 1 : 2}>
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <div className="half-circle-login" /> {/* Half-circle div */}
                        <img src="/image/login.webp" alt="login" style={{
                            maxWidth: '100%',
                            position: 'relative',
                            zIndex: 1
                        }} />
                    </Box>
                </Grid>
            </Grid>
        </AuthLayout>
    );
};

export default LoginPage;
