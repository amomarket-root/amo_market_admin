import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Card, CardContent, Typography, TextField, Button, Grid, Box } from "@mui/material";
import { useSweetAlert } from '../Template/SweetAlert';
import { useSnackbar } from '../Template/SnackbarAlert';
import AuthLayout from '../Template/AuthLayout';
import "./css/ForgotPasswordPage.css";


const ForgotPasswordPage = () => {
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const isMobile = useMediaQuery("(max-width:600px)");
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        setEmailError("");
        setIsLoading(true);

        try {
            const response = await axios.post(
                `${apiUrl}/admin/auth/forgot_password`,
                {
                    email,
                }
            );
            // Show success message using global snackbar
            showSnackbar(response.data.message, { severity: 'success' }, 2000);

        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                if (error.response.data.errors.email) {
                    setEmailError(error.response.data.errors.email[0]);
                }
            } else {
                showAlert({
                    icon: "warning",
                    title: error.response.data.message || "An error occurred",
                    text: error.response.data.info || "Please try again later.",
                    showConfirmButton: true,
                    timer: 6000,
                    timerProgressBar: true,
                    confirmButtonText: "OK",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout>
            <Grid container spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
                <Grid item xs={12} md={6} order={1}>
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <div className="half-circle-forgot" /> {/* Half-circle div */}
                        <img src="/image/forgot_password.webp" alt="forgot_password"
                            style={{
                                maxWidth: "100%",
                                position: 'relative',
                                zIndex: 1
                            }} />
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    order={2}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Card elevation={20} className="card-animation" sx={{ maxWidth: "400px", width: "100%", borderRadius: 3, marginLeft: !isMobile ? "100px" : "0", }}>
                        <CardContent>
                            <div>
                                <Typography variant="h5" gutterBottom>
                                    Hello! You forgot your credentials?
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    <span style={{ textAlign: "right" }}>Enter your email to continue.</span>
                                </Typography>
                            </div>
                            <form onSubmit={handleLogin}>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={!!emailError}
                                    helperText={emailError}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    style={{ marginTop: "1rem" }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Loading..." : "Submit"}
                                </Button>
                                <Typography
                                    variant="body1"
                                    align="center"
                                    style={{ marginTop: "1rem" }}
                                >
                                    Already have an account? <Link to="/login">Sign In</Link>
                                </Typography>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;
