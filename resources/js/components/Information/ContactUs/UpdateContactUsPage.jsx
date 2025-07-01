import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Chip } from "@mui/material";
import qs from "qs";

import PageHeader from "../../Form/PageHeader";
import ActionButtons from "../../Form/ActionButtons";
import { useSnackbar } from '../../Template/SnackbarAlert';
import { useSweetAlert } from "../../Template/SweetAlert";

const UpdateContactUsPage = () => {
    const navigate = useNavigate();
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();
    const { contactUsId } = useParams();

    const [formData, setFormData] = useState({
        company_name: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        postal_code: '',
        phone_numbers: '',
        email: '',
        social_media: {
            facebook: '',
            instagram: '',
            youtube: '',
            linkedin: ''
        }
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleCancelClick = () => {
        navigate("/contact-us");
    };

    const handleUpdate = () => {
        setLoading(true);

        const token = localStorage.getItem('token');

        // Prepare data to send - ensure social_media is an object
        const dataToSend = {
            ...formData,
            id: contactUsId,
            social_media: formData.social_media // Already an object
        };

        axios.post(`${apiUrl}/admin/contact_us/update_contact_us`, dataToSend, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            const contactData = response.data;
            showSnackbar(contactData.message, { severity: 'success' });
            setTimeout(() => {
                setLoading(false);
                navigate("/contact-us");
            }, 2000);
        })
        .catch(error => {
            setLoading(false);
            if (error.response) {
                if (error.response.data && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else if (error.response.data.message) {
                    showAlert({
                        title: "Error!",
                        text: error.response.data.message,
                        icon: "error",
                    });
                }
            } else {
                showAlert({
                    title: "Error!",
                    text: error.message || "Server error or network issue. Please try again later.",
                    icon: "error",
                });
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSocialMediaChange = (platform, value) => {
        setFormData(prev => ({
            ...prev,
            social_media: {
                ...prev.social_media,
                [platform]: value
            }
        }));
    };

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('token');

        axios.put(
            `${apiUrl}/admin/contact_us/find_contact_us`,
            qs.stringify({ id: contactUsId }),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
        .then((response) => {
            const contactData = response.data.data;

            // Parse social_media if it's a string, otherwise use as-is
            const socialMedia = typeof contactData.social_media === 'string'
                ? JSON.parse(contactData.social_media)
                : contactData.social_media || {
                    facebook: '',
                    instagram: '',
                    youtube: '',
                    linkedin: ''
                };

            setFormData({
                company_name: contactData.company_name,
                address_line1: contactData.address_line1,
                address_line2: contactData.address_line2 || '',
                city: contactData.city,
                state: contactData.state,
                postal_code: contactData.postal_code,
                phone_numbers: contactData.phone_numbers,
                email: contactData.email,
                social_media: socialMedia
            });
            setLoading(false);
        })
        .catch((error) => {
            const errorMessage = error.response?.data?.message || error.message;
            showAlert({
                title: "Error!",
                text: `Error fetching contact information: ${errorMessage}`,
                icon: "error",
            });
            setLoading(false);
        });
    }, [contactUsId]);

    return (
        <Box sx={{ display: "flex" }}>
            <Paper
                elevation={10}
                sx={{
                    width: "100%",
                    overflow: "hidden",
                    padding: "4px",
                    borderRadius: "10px",
                }}
            >
                {loading && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "80vh",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}
                {!loading && (
                    <Grid>
                        <PageHeader title="Update Contact Information" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 1 }} />

                        <Grid container spacing={2} sx={{ padding: 2 }}>
                            <Grid item xs={12}>
                                <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
                                    Company Name:
                                </InputLabel>
                                <TextField
                                    placeholder="Enter Company Name"
                                    variant="outlined"
                                    fullWidth
                                    name="company_name"
                                    value={formData.company_name}
                                    onChange={handleChange}
                                    error={!!errors.company_name}
                                    helperText={errors.company_name}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
                                    Address Line 1:
                                </InputLabel>
                                <TextField
                                    placeholder="Enter Address Line 1"
                                    variant="outlined"
                                    fullWidth
                                    name="address_line1"
                                    value={formData.address_line1}
                                    onChange={handleChange}
                                    error={!!errors.address_line1}
                                    helperText={errors.address_line1}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
                                    Address Line 2 (Optional):
                                </InputLabel>
                                <TextField
                                    placeholder="Enter Address Line 2"
                                    variant="outlined"
                                    fullWidth
                                    name="address_line2"
                                    value={formData.address_line2}
                                    onChange={handleChange}
                                    error={!!errors.address_line2}
                                    helperText={errors.address_line2}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
                                    City:
                                </InputLabel>
                                <TextField
                                    placeholder="Enter City"
                                    variant="outlined"
                                    fullWidth
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    error={!!errors.city}
                                    helperText={errors.city}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
                                    State:
                                </InputLabel>
                                <TextField
                                    placeholder="Enter State"
                                    variant="outlined"
                                    fullWidth
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    error={!!errors.state}
                                    helperText={errors.state}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
                                    Postal Code:
                                </InputLabel>
                                <TextField
                                    placeholder="Enter Postal Code"
                                    variant="outlined"
                                    fullWidth
                                    name="postal_code"
                                    value={formData.postal_code}
                                    onChange={handleChange}
                                    error={!!errors.postal_code}
                                    helperText={errors.postal_code}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
                                    Phone Numbers:
                                </InputLabel>
                                <TextField
                                    placeholder="Enter comma separated phone numbers"
                                    variant="outlined"
                                    fullWidth
                                    name="phone_numbers"
                                    value={formData.phone_numbers}
                                    onChange={handleChange}
                                    error={!!errors.phone_numbers}
                                    helperText={errors.phone_numbers}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
                                    Email:
                                </InputLabel>
                                <TextField
                                    placeholder="Enter Email"
                                    variant="outlined"
                                    fullWidth
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Divider sx={{ my: 2 }}>
                                    <Chip label="Social Media Links" />
                                </Divider>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
                                    Facebook:
                                </InputLabel>
                                <TextField
                                    placeholder="Enter Facebook URL"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.social_media.facebook || ''}
                                    onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                                    error={!!errors['social_media.facebook']}
                                    helperText={errors['social_media.facebook']}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
                                    Instagram:
                                </InputLabel>
                                <TextField
                                    placeholder="Enter Instagram URL"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.social_media.instagram || ''}
                                    onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                                    error={!!errors['social_media.instagram']}
                                    helperText={errors['social_media.instagram']}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
                                    YouTube:
                                </InputLabel>
                                <TextField
                                    placeholder="Enter YouTube URL"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.social_media.youtube || ''}
                                    onChange={(e) => handleSocialMediaChange('youtube', e.target.value)}
                                    error={!!errors['social_media.youtube']}
                                    helperText={errors['social_media.youtube']}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
                                    LinkedIn:
                                </InputLabel>
                                <TextField
                                    placeholder="Enter LinkedIn URL"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.social_media.linkedin || ''}
                                    onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                                    error={!!errors['social_media.linkedin']}
                                    helperText={errors['social_media.linkedin']}
                                />
                            </Grid>
                        </Grid>

                        <Divider sx={{ marginY: 2 }} />
                        <ActionButtons
                            handleCancel={handleCancelClick}
                            handleSubmit={handleUpdate}
                            loading={loading}
                            submitLabel="Update Contact Us"
                        />
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default UpdateContactUsPage;
