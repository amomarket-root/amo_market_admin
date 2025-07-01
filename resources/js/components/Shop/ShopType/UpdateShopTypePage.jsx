import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Chip from "@mui/material/Chip";

// Reusable components
import PageHeader from "../../Form/PageHeader";
import ActionButtons from "../../Form/ActionButtons";
import { useSweetAlert } from "../../Template/SweetAlert";
import { useSnackbar } from '../../Template/SnackbarAlert';

const UpdateShopTypePage = () => {
    const { shopTypeId } = useParams();
    const navigate = useNavigate();
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();

    const [name, setName] = useState("");
    const [hasServices, setHasServices] = useState(false);
    const [deliveryCharge, setDeliveryCharge] = useState(false);
    const [platformCharge, setPlatformCharge] = useState(false);

    const [nameError, setNameError] = useState("");
    const [hasServicesError, setHasServicesError] = useState("");
    const [deliveryChargeError, setDeliveryChargeError] = useState("");
    const [platformChargeError, setPlatformChargeError] = useState("");

    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchShopType = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${apiUrl}/admin/shop-type/find?id=${shopTypeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const shopTypeData = response.data.data;
                setName(shopTypeData.name);
                setHasServices(shopTypeData.has_services);
                setDeliveryCharge(shopTypeData.delivery_charge);
                setPlatformCharge(shopTypeData.platform_charge);
            } catch (error) {
                showSnackbar("Error fetching shop type data:", error, { severity: 'error' }, 2000);
            } finally {
                setLoading(false);
            }
        };

        fetchShopType();
    }, [shopTypeId, apiUrl]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleCancelClick = () => {
        navigate("/shop-type");
    };

    const handleUpdate = () => {
        setNameError("");
        setHasServicesError("");
        setDeliveryChargeError("");
        setPlatformChargeError("");
        setLoading(true);

        const token = localStorage.getItem('token');
        const formData = {
            id: shopTypeId,
            name,
            has_services: hasServices,
            delivery_charge: deliveryCharge,
            platform_charge: platformCharge
        };

        axios.put(`${apiUrl}/admin/shop-type/update`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                showSnackbar(response.data.message, { severity: 'success' });
                setTimeout(() => {
                    navigate("/shop-type");
                }, 2000);
            })
            .catch(error => {
                setLoading(false);
                if (error.response) {
                    if (error.response.data && error.response.data.errors) {
                        if (error.response.data.errors.name) {
                            setNameError(error.response.data.errors.name[0]);
                        }
                        if (error.response.data.errors.has_services) {
                            setHasServicesError(error.response.data.errors.has_services[0]);
                        }
                        if (error.response.data.errors.delivery_charge) {
                            setDeliveryChargeError(error.response.data.errors.delivery_charge[0]);
                        }
                        if (error.response.data.errors.platform_charge) {
                            setPlatformChargeError(error.response.data.errors.platform_charge[0]);
                        }
                    } else if (error.response.data.message) {
                        showAlert({
                            title: "Error!",
                            text: error.response.data.message,
                            icon: "error",
                        });
                    }
                } else {
                    showSnackbar("Server error or network issue. Please try again later.", { severity: 'error' }, 2000);
                }
            });
    };

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
                        <PageHeader title="Update Shop Type" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 1 }} />
                        <Grid container spacing={2} sx={{ marginBottom: 1, padding: 2 }}>
                            <Grid item xs={12} md={6}>
                                <InputLabel
                                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                    shrink
                                >
                                    Shop Type Name :
                                </InputLabel>
                                <TextField
                                    placeholder="Enter Shop Type Name"
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    error={!!nameError}
                                    helperText={nameError}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <InputLabel
                                    sx={{ fontSize: "1.2rem", fontWeight: "bold", mb: 1 }}
                                    shrink
                                >
                                    Features :
                                </InputLabel>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={hasServices}
                                                onChange={(e) => setHasServices(e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Chip
                                                    label="Has Services"
                                                    color={hasServices ? "primary" : "default"}
                                                    size="small"
                                                    sx={{ mr: 1 }}
                                                />
                                                {hasServices ? "Enabled" : "Disabled"}
                                            </Box>
                                        }
                                    />
                                    {hasServicesError && <Typography variant="body2" color="error">{hasServicesError}</Typography>}

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={deliveryCharge}
                                                onChange={(e) => setDeliveryCharge(e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Chip
                                                    label="Delivery Charge"
                                                    color={deliveryCharge ? "primary" : "default"}
                                                    size="small"
                                                    sx={{ mr: 1 }}
                                                />
                                                {deliveryCharge ? "Enabled" : "Disabled"}
                                            </Box>
                                        }
                                    />
                                    {deliveryChargeError && <Typography variant="body2" color="error">{deliveryChargeError}</Typography>}

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={platformCharge}
                                                onChange={(e) => setPlatformCharge(e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Chip
                                                    label="Platform Charge"
                                                    color={platformCharge ? "primary" : "default"}
                                                    size="small"
                                                    sx={{ mr: 1 }}
                                                />
                                                {platformCharge ? "Enabled" : "Disabled"}
                                            </Box>
                                        }
                                    />
                                    {platformChargeError && <Typography variant="body2" color="error">{platformChargeError}</Typography>}
                                </Box>
                            </Grid>
                        </Grid>
                        <Divider sx={{ marginY: 1 }} />
                        <ActionButtons
                            handleCancel={handleCancelClick}
                            handleSubmit={handleUpdate}
                            loading={loading}
                            submitLabel="Update Shop Type"
                        />
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default UpdateShopTypePage;
