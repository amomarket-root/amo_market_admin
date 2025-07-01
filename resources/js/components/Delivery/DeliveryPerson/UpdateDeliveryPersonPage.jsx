import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CloudUploadTwoToneIcon from "@mui/icons-material/CloudUploadTwoTone";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import Chip from '@mui/material/Chip';
import { Autocomplete, InputAdornment, IconButton } from "@mui/material";
import MyLocationTwoToneIcon from '@mui/icons-material/MyLocationTwoTone';
import qs from "qs";

// Reusable components
import PageHeader from "../../Form/PageHeader";
import ActionButtons from "../../Form/ActionButtons";
import { useSnackbar } from '../../Template/SnackbarAlert';
import { useSweetAlert } from "../../Template/SweetAlert";

const UpdateDeliveryPersonPage = () => {
    const { deliveryPersonId } = useParams();
    const navigate = useNavigate();
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [drivingLicense, setDrivingLicense] = useState("");
    const [licenseDocument, setLicenseDocument] = useState("/image/no_image.webp");
    const [panNumber, setPanNumber] = useState("");
    const [panPhoto, setPanPhoto] = useState("/image/no_image.webp");
    const [deliveryMode, setDeliveryMode] = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [location, setLocation] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [onlineStatus, setOnlineStatus] = useState("0"); // Default to Offline (0)
    const [status, setStatus] = useState("0"); // Default to Inactive (0)
    const [panPhotoFile, setPanPhotoFile] = useState(null);
    const [licenseDocumentFile, setLicenseDocumentFile] = useState(null);

    const [nameError, setNameError] = useState('');
    const [numberError, setNumberError] = useState('');
    const [drivingLicenseError, setDrivingLicenseError] = useState('');
    const [licenseDocumentError, setLicenseDocumentError] = useState('');
    const [panNumberError, setPanNumberError] = useState('');
    const [panPhotoError, setPanPhotoError] = useState('');
    const [deliveryModeError, setDeliveryModeError] = useState('');
    const [vehicleNumberError, setVehicleNumberError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [latitudeError, setLatitudeError] = useState('');
    const [longitudeError, setLongitudeError] = useState('');
    const [onlineStatusError, setOnlineStatusError] = useState('');
    const [statusError, setStatusError] = useState('');

    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;

    const deliveryModes = [
        'motorcycle',
        'electric_vehicle',
        'bicycle',
    ];

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.put(
            `${apiUrl}/admin/delivery_person/find_delivery_person`,
            qs.stringify({ id: deliveryPersonId }),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
            .then((response) => {
                const deliveryPersonData = response.data.data;
                setName(deliveryPersonData.name);
                setNumber(deliveryPersonData.number);
                setDrivingLicense(deliveryPersonData.driving_license);
                setLicenseDocument(deliveryPersonData.license_document ?? "/image/no_image.webp");
                setPanNumber(deliveryPersonData.PAN_Number);
                setPanPhoto(deliveryPersonData.PAN_Photo ?? "/image/no_image.webp");
                setDeliveryMode(deliveryPersonData.delivery_mode);
                setVehicleNumber(deliveryPersonData.vehicle_number);
                setLocation(deliveryPersonData.location);
                setLatitude(deliveryPersonData.latitude);
                setLongitude(deliveryPersonData.longitude);
                setOnlineStatus(deliveryPersonData.online_status);
                setStatus(deliveryPersonData.status);
            })
            .catch((error) => {
                showAlert({
                    title: "Error!",
                    text: "Error fetching delivery person data:", error,
                    icon: "error",
                });
            });
    }, [deliveryPersonId, apiUrl]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleCancelClick = () => {
        navigate("/delivery-person");
    };

    const fetchGeocodeLocation = async () => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setLoading(true);
                try {
                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApiKey}`
                    );
                    if (!response.ok) {
                        throw new Error("Failed to fetch address");
                    }
                    const data = await response.json();
                    if (data.results && data.results.length > 0) {
                        setLocation(data.results[0].formatted_address || "Unable to fetch address");
                        setLatitude(latitude.toString());
                        setLongitude(longitude.toString());
                    } else {
                        setLocation("Unable to fetch address");
                    }
                } catch (error) {
                    showAlert({
                        title: "Error!",
                        text: "Error fetching address:", error,
                        icon: "error",
                    });
                    setLocation("Unable to fetch address");
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                showAlert({
                    title: "Error!",
                    text: "Error getting current location:", error,
                    icon: "error",
                });
                setLoading(false);
                setLocation("Unable to get current location");
            }
        );
    };

    const handleIconClick = () => {
        showAlert({
            title: 'Use Current Location?',
            text: "Do you want to use your current location?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((confirmed) => {
            if (confirmed) {
                if (navigator.geolocation) {
                    fetchGeocodeLocation();
                } else {
                    showAlert({
                        title: "Error!",
                        text: "Geolocation is not supported by this browser.",
                        icon: "error",
                    });
                }
            }
        });
    };

    const handleUpdate = () => {
        setNameError('');
        setNumberError('');
        setDrivingLicenseError('');
        setLicenseDocumentError('');
        setPanNumberError('');
        setPanPhotoError('');
        setDeliveryModeError('');
        setVehicleNumberError('');
        setLocationError('');
        setLatitudeError('');
        setLongitudeError('');
        setOnlineStatusError('');
        setStatusError('');
        setLoading(true);

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('delivery_person_id', deliveryPersonId);
        formData.append('name', name);
        formData.append('number', number);
        formData.append('driving_license', drivingLicense);
        formData.append('PAN_Number', panNumber);
        formData.append('PAN_Photo', panPhoto ?? null);
        formData.append('license_document', licenseDocument ?? null);
        formData.append('delivery_mode', deliveryMode);
        formData.append('vehicle_number', vehicleNumber);
        formData.append('location', location);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('online_status', onlineStatus);
        formData.append('status', status);
        if (panPhotoFile) {
            formData.append('PAN_Photo_file', panPhotoFile);
        }
        if (licenseDocumentFile) {
            formData.append('License_Document_file', licenseDocumentFile);
        }

        axios.post(`${apiUrl}/admin/delivery_person/update_delivery_person`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                showSnackbar(response.data.message, { severity: 'success' });
                setTimeout(() => {
                    setLoading(false);
                    navigate("/delivery_person");
                }, 2000);
            })
            .catch(error => {
                setLoading(false);
                if (error.response) {
                    if (error.response.data && error.response.data.errors) {
                        if (error.response.data.errors.name) {
                            setNameError(error.response.data.errors.name[0]);
                        }
                        if (error.response.data.errors.number) {
                            setNumberError(error.response.data.errors.number[0]);
                        }
                        if (error.response.data.errors.driving_license) {
                            setDrivingLicenseError(error.response.data.errors.driving_license[0]);
                        }
                        if (error.response.data.errors.License_Document_file) {
                            setLicenseDocumentError(error.response.data.errors.License_Document_file[0]);
                        }
                        if (error.response.data.errors.PAN_Number) {
                            setPanNumberError(error.response.data.errors.PAN_Number[0]);
                        }
                        if (error.response.data.errors.PAN_Photo_file) {
                            setPanPhotoError(error.response.data.errors.PAN_Photo_file[0]);
                        }
                        if (error.response.data.errors.delivery_mode) {
                            setDeliveryModeError(error.response.data.errors.delivery_mode[0]);
                        }
                        if (error.response.data.errors.vehicle_number) {
                            setVehicleNumberError(error.response.data.errors.vehicle_number[0]);
                        }
                        if (error.response.data.errors.location) {
                            setLocationError(error.response.data.errors.location[0]);
                        }
                        if (error.response.data.errors.latitude) {
                            setLatitudeError(error.response.data.errors.latitude[0]);
                        }
                        if (error.response.data.errors.longitude) {
                            setLongitudeError(error.response.data.errors.longitude[0]);
                        }
                        if (error.response.data.errors.online_status) {
                            setOnlineStatusError(error.response.data.errors.online_status[0]);
                        }
                        if (error.response.data.errors.status) {
                            setStatusError(error.response.data.errors.status[0]);
                        }
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
                        text: "Server error or network issue. Please try again later.",
                        icon: "error",
                    });
                }
            });
    };

    const handlePanPhotoFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setPanPhoto(URL.createObjectURL(file));
                setPanPhotoFile(file);
                setPanPhotoError('');
            } else {
                setPanPhotoError('The file must be an image.');
            }
        }
    };

    const handleDrivingLicenseFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setLicenseDocument(URL.createObjectURL(file));
                setLicenseDocumentFile(file);
                setLicenseDocumentError('');
            } else {
                setLicenseDocumentError('The file must be an image.');
            }
        }
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
                        <PageHeader title="Update Delivery Person" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 1 }} />
                        <Grid container spacing={2} sx={{ marginBottom: 1 }}>
                            <Grid
                                item
                                xs={12}
                                md={3}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    marginTop: 2,
                                    width: "100%", // Ensure the Grid item takes full width
                                }}
                            >
                                {/* PAN Card Section */}
                                <Box sx={{ width: "100%", textAlign: "center" }}>
                                    <Divider sx={{ width: "100%", my: 2 }}>
                                        <Chip label="Pan Card" />
                                    </Divider>
                                </Box>

                                <img
                                    src={panPhoto}
                                    alt="PAN Card Img"
                                    style={{
                                        borderRadius: "8px",
                                        width: 150,
                                        height: 150,
                                        objectFit: "cover",
                                        border: "1px solid grey",
                                        marginBottom: 10,
                                    }}
                                />

                                <label htmlFor="pan-photo-upload" style={{ marginTop: 10 }}>
                                    <input
                                        style={{ display: "none" }}
                                        id="pan-photo-upload"
                                        name="pan-photo-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePanPhotoFileChange}
                                    />
                                    <Button
                                        sx={{
                                            marginTop: 0.5,
                                            backgroundColor: "#10d915",
                                            color: "white",
                                            "&:hover": { backgroundColor: "#10d915" },
                                        }}
                                        variant="contained"
                                        component="span"
                                        startIcon={<CloudUploadTwoToneIcon />}
                                    >
                                        Upload PAN Photo
                                    </Button>
                                </label>
                                {panPhotoError && (
                                    <Typography variant="body2" color="error">
                                        {panPhotoError}
                                    </Typography>
                                )}

                                {/* Driving License Section */}
                                <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
                                    <Divider sx={{ width: "100%", my: 2 }}>
                                        <Chip label="Driving License Image" />
                                    </Divider>
                                </Box>

                                <img
                                    src={licenseDocument}
                                    alt="Profile"
                                    style={{
                                        borderRadius: "8px",
                                        width: 150,
                                        height: 150,
                                        objectFit: "cover",
                                        border: "1px solid grey",
                                        marginTop: 10,
                                    }}
                                />

                                <label htmlFor="driving-license-upload" style={{ marginTop: 10 }}>
                                    <input
                                        style={{ display: "none" }}
                                        id="driving-license-upload"
                                        name="driving-license-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleDrivingLicenseFileChange}
                                    />
                                    <Button
                                        sx={{
                                            marginTop: 0.5,
                                            backgroundColor: "#10d915",
                                            color: "white",
                                            "&:hover": { backgroundColor: "#10d915" },
                                        }}
                                        variant="contained"
                                        component="span"
                                        startIcon={<CloudUploadTwoToneIcon />}
                                    >
                                        Upload Driving License
                                    </Button>
                                </label>
                                {licenseDocumentError && (
                                    <Typography variant="body2" color="error">
                                        {licenseDocumentError}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid item xs={12} md={9}>
                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Name :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Name"
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
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Contact Number :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Contact Number"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={number}
                                            onChange={(e) => setNumber(e.target.value)}
                                            error={!!numberError}
                                            helperText={numberError}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Driving License No.:
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Driving License"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={drivingLicense}
                                            onChange={(e) => setDrivingLicense(e.target.value)}
                                            error={!!drivingLicenseError}
                                            helperText={drivingLicenseError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            PAN Number :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter PAN Number"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={panNumber}
                                            onChange={(e) => setPanNumber(e.target.value)}
                                            error={!!panNumberError}
                                            helperText={panNumberError}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Delivery Mode :
                                        </InputLabel>
                                        <Autocomplete
                                            options={deliveryModes}
                                            value={deliveryMode}
                                            onChange={(event, newValue) => setDeliveryMode(newValue)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder="Select Delivery Mode"
                                                    variant="outlined"
                                                    fullWidth
                                                    error={!!deliveryModeError}
                                                    helperText={deliveryModeError}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Vehicle Number :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Vehicle Number"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={vehicleNumber}
                                            onChange={(e) => setVehicleNumber(e.target.value)}
                                            error={!!vehicleNumberError}
                                            helperText={vehicleNumberError}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>

                                    <Grid item xs={12} md={12}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Location :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Location"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            error={!!locationError}
                                            helperText={locationError}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={handleIconClick} style={{ cursor: 'pointer' }}>
                                                            <MyLocationTwoToneIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Latitude :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Latitude"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={latitude}
                                            onChange={(e) => setLatitude(e.target.value)}
                                            error={!!latitudeError}
                                            helperText={latitudeError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Longitude :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Longitude"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={longitude}
                                            onChange={(e) => setLongitude(e.target.value)}
                                            error={!!longitudeError}
                                            helperText={longitudeError}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Online Status :
                                        </InputLabel>
                                        <TextField
                                            select
                                            placeholder="Select Online Status"
                                            variant="outlined"
                                            fullWidth
                                            value={onlineStatus} // Default to "0" (Offline)
                                            onChange={(e) => setOnlineStatus(e.target.value)}
                                            error={!!onlineStatusError}
                                            helperText={onlineStatusError}
                                            SelectProps={{
                                                native: true,
                                            }}
                                        >
                                            <option value={1}>Online</option>
                                            <option value={0}>Offline</option>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Status :
                                        </InputLabel>
                                        <TextField
                                            select
                                            placeholder="Select Status"
                                            variant="outlined"
                                            fullWidth
                                            value={status} // Default to "0" (Inactive)
                                            onChange={(e) => setStatus(e.target.value)}
                                            error={!!statusError}
                                            helperText={statusError}
                                            SelectProps={{
                                                native: true,
                                            }}
                                        >
                                            <option value={1}>Active</option>
                                            <option value={0}>Inactive</option>
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider sx={{ marginY: 1 }} />
                        <ActionButtons
                            handleCancel={handleCancelClick}
                            handleSubmit={handleUpdate}
                            loading={loading}
                            submitLabel="Update Delivery Person"
                        />
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default UpdateDeliveryPersonPage;
