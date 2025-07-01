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
import { useSweetAlert } from "../../Template/SweetAlert";
import { useSnackbar } from '../../Template/SnackbarAlert';

const UpdateShopPage = () => {
    const { shopId } = useParams();
    const navigate = useNavigate();
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();
    const [shop, setShop] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [shopTypeName, setShopTypeName] = useState('');
    const [shopTypes, setShopTypes] = useState([]);
    const [location, setLocation] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [description, setDescription] = useState('');
    const [deliveryTime, setDeliveryTime] = useState(null);
    const [offer, setOffer] = useState('');
    const [onlineStatus, setOnlineStatus] = useState('0'); // Default to Offline
    const [status, setStatus] = useState('0'); // Default to Inactive
    const [mainImage, setMainImage] = useState("/image/no_image.webp");
    const [profilePicture, setProfilePicture] = useState("/image/no_image.webp");
    const [mainImageFile, setMainImageFile] = useState(null);
    const [profilePictureFile, setProfilePictureFile] = useState(null);

    const [nameError, setNameError] = useState('');
    const [shopTypeNameError, setShopTypeNameError] = useState('');
    const [numberError, setNumberError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [latitudeError, setLatitudeError] = useState('');
    const [longitudeError, setLongitudeError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [deliveryTimeError, setDeliveryTimeError] = useState('');
    const [offerError, setOfferError] = useState('');
    const [onlineStatusError, setOnlineStatusError] = useState('');
    const [statusError, setStatusError] = useState('');
    const [mainImageError, setMainImageError] = useState('');
    const [profilePictureError, setProfilePictureError] = useState('');

    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;


    const timeRanges = [
        '10-15 min',
        '15-20 min',
        '20-25 min',
        '25-30 min',
        '30-35 min',
        '35-40 min',
        '40-45 min',
        '45-50 min',
        '50-55 min',
        '55-60 min',
    ];

    useEffect(() => {
        const fetchShopTypes = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${apiUrl}/admin/get_shop_type`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setShopTypes(response.data.data);
            } catch (error) {
                showSnackbar('Error fetching shop types:', error, { severity: 'error' }, 2000);
            }
        };

        fetchShopTypes();
    }, [apiUrl]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.put(
            `${apiUrl}/admin/shop/find_shop`,
            qs.stringify({ id: shopId }),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
            .then((response) => {
                const shopData = response.data.data;
                setShop(shopData.id);
                setName(shopData.name);
                setNumber(shopData.number);
                setShopTypeName(shopData.shop_type_id);
                setLocation(shopData.location);
                setLatitude(shopData.latitude);
                setLongitude(shopData.longitude);
                setDescription(shopData.description);
                setDeliveryTime(shopData.time);
                setOffer(shopData.offer);
                setOnlineStatus(shopData.online_status);
                setStatus(shopData.status);
                setMainImage(shopData.image ?? "/image/no_image2.png");
                setProfilePicture(shopData.profile_picture ?? "/image/no_image2.png");
            })
            .catch((error) => {
                showSnackbar("Error fetching shop data:", error, { severity: 'error' }, 2000);
            });
    }, [shopId, apiUrl]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleCancelClick = () => {
        navigate("/shop");
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
                    showSnackbar("Error fetching address:", error, { severity: 'error' }, 2000);
                    setLocation("Unable to fetch address");
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                showSnackbar("Error getting current location:", error, { severity: 'error' }, 2000);
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
                // If confirmed, check for geolocation support
                if (navigator.geolocation) {
                    fetchGeocodeLocation();
                } else {
                    showSnackbar("Geolocation is not supported by this browser.", {
                        severity: 'error'
                    });
                }
            }
        });
    };

    const handleUpdate = () => {
        setNameError('');
        setShopTypeNameError('');
        setNumberError('');
        setLocationError('');
        setLatitudeError('');
        setLongitudeError('');
        setDescriptionError('');
        setDeliveryTimeError('');
        setOfferError('');
        setOnlineStatusError('');
        setStatusError('');
        setMainImageError('');
        setProfilePictureError('');
        setLoading(true);

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('shop_id', shop);
        formData.append('shop_name', name);
        formData.append('shop_type_name', shopTypeName);
        formData.append('contact_number', number);
        formData.append('location', location);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('product_description', description);
        formData.append('delivery_time', deliveryTime);
        formData.append('any_offer', offer);
        formData.append('online_status', onlineStatus);
        formData.append('status', status);
        formData.append('main_image', mainImage ?? null);
        formData.append('profile_picture', profilePicture ?? null);
        if (mainImageFile) {
            formData.append('main_image_file', mainImageFile);
        }
        if (profilePictureFile) {
            formData.append('profile_picture_file', profilePictureFile);
        }

        axios.post(`${apiUrl}/admin/shop/update_shop`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                showSnackbar(response.data.message, { severity: 'success' });
                setTimeout(() => {
                    navigate("/shop");
                }, 2000);

            })
            .catch(error => {
                setLoading(false);
                if (error.response) {
                    if (error.response.data && error.response.data.errors) {
                        if (error.response.data.errors.shop_name) {
                            setNameError(error.response.data.errors.shop_name[0]);
                        }
                        if (error.response.data.errors.shop_type_name) {
                            setShopTypeNameError(error.response.data.errors.shop_type_name[0]);
                        }
                        if (error.response.data.errors.contact_number) {
                            setNumberError(error.response.data.errors.contact_number[0]);
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
                        if (error.response.data.errors.product_description) {
                            setDescriptionError(error.response.data.errors.product_description[0]);
                        }
                        if (error.response.data.errors.delivery_time) {
                            setDeliveryTimeError(error.response.data.errors.delivery_time[0]);
                        }
                        if (error.response.data.errors.any_offer) {
                            setOfferError(error.response.data.errors.any_offer[0]);
                        }
                        if (error.response.data.errors.online_status) {
                            setOnlineStatusError(error.response.data.errors.online_status[0]);
                        }
                        if (error.response.data.errors.status) {
                            setStatusError(error.response.data.errors.status[0]);
                        }
                        if (error.response.data.errors.main_image_file) {
                            setMainImageError(error.response.data.errors.main_image_file[0]);
                        }
                        if (error.response.data.errors.profile_picture_file) {
                            setProfilePictureError(error.response.data.errors.profile_picture_file[0]);
                        }
                    } else if (error.response.data.message) {
                        showAlert({
                            title: "Error!",
                            text: error.response.data.message,
                            icon: "error",
                        });
                    }
                } else {
                    showSnackbar('Server error or network issue. Please try again later.', {
                        severity: 'error',
                    });
                }
            });
    };

    const handleMainImageFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setMainImage(URL.createObjectURL(file));
                setMainImageFile(file);
                setMainImageError('');
            } else {
                setMainImageError('The file must be an image.');
            }
        }
    };

    const handleProfilePictureFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setProfilePicture(URL.createObjectURL(file));
                setProfilePictureFile(file);
                setProfilePictureError('');
            } else {
                setProfilePictureError('The file must be an image.');
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
                        <PageHeader title="Update Shop" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 1 }} />
                        <Grid container spacing={2} sx={{ marginBottom: 1 }}>
                            <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", marginTop: 2 }}>
                                <img
                                    src={mainImage}
                                    alt="Main"
                                    style={{
                                        borderRadius: "8px",
                                        width: 150,
                                        height: 150,
                                        objectFit: "cover",
                                        border: "1px solid grey",
                                        marginBottom: 10,
                                    }}
                                />
                                <label htmlFor="main-image-upload" style={{ marginTop: 10 }}>
                                    <input
                                        style={{ display: 'none' }}
                                        id="main-image-upload"
                                        name="main-image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleMainImageFileChange}
                                    />
                                    <Button
                                        sx={{ marginTop: 0.5, backgroundColor: '#10d915', color: 'white', '&:hover': { backgroundColor: '#10d915' } }}
                                        variant="contained"
                                        component="span"
                                        startIcon={<CloudUploadTwoToneIcon />}
                                    >
                                        Upload Main Image
                                    </Button>
                                </label>
                                {mainImageError && <Typography variant="body2" color="error">{mainImageError}</Typography>}

                                <Box sx={{ display: 'flex', alignItems: 'center', marginY: 1 }}>
                                    <Divider sx={{ flexGrow: 1 }} />
                                    <Chip label="--- OR Choose Profile Picture ---" size="small" sx={{ margin: "0 5px" }} />
                                    <Divider sx={{ flexGrow: 1 }} />
                                </Box>

                                <img
                                    src={profilePicture}
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
                                <label htmlFor="profile-picture-upload" style={{ marginTop: 10 }}>
                                    <input
                                        style={{ display: 'none' }}
                                        id="profile-picture-upload"
                                        name="profile-picture-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePictureFileChange}
                                    />
                                    <Button
                                        sx={{ marginTop: 0.5, backgroundColor: '#10d915', color: 'white', '&:hover': { backgroundColor: '#10d915' } }}
                                        variant="contained"
                                        component="span"
                                        startIcon={<CloudUploadTwoToneIcon />}
                                    >
                                        Upload Profile Picture
                                    </Button>
                                </label>
                                {profilePictureError && <Typography variant="body2" color="error">{profilePictureError}</Typography>}
                            </Grid>

                            <Grid item xs={12} md={9}>
                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Shop Name :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Shop Name"
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
                                            Shop Type :
                                        </InputLabel>
                                        <Autocomplete
                                            options={shopTypes}
                                            getOptionLabel={(option) => option.name}
                                            value={shopTypes.find(shoptype => shoptype.id === shopTypeName) || null}
                                            onChange={(event, newValue) => {
                                                setShopTypeName(newValue ? newValue.id : '');
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder="Choose Shop Type"
                                                    variant="outlined"
                                                    fullWidth
                                                    error={!!shopTypeNameError}
                                                    helperText={shopTypeNameError}
                                                />
                                            )}
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
                                    <Grid item xs={12} md={12}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Location :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Shop Location"
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
                                    <Grid item xs={12} md={12}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Product Description :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Product Description"
                                            variant="outlined"
                                            multiline
                                            rows={4}
                                            fullWidth
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            error={!!descriptionError}
                                            helperText={descriptionError}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Delivery Time :
                                        </InputLabel>
                                        <Autocomplete
                                            options={timeRanges}
                                            value={deliveryTime}
                                            onChange={(event, newValue) => setDeliveryTime(newValue)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder="Select Delivery Time"
                                                    variant="outlined"
                                                    fullWidth
                                                    error={!!deliveryTimeError}
                                                    helperText={deliveryTimeError}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Offer :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Offer"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={offer}
                                            onChange={(e) => setOffer(e.target.value)}
                                            error={!!offerError}
                                            helperText={offerError}
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
                                            value={onlineStatus}
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
                                            value={status}
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
                            submitLabel="Update Shop"
                        />
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default UpdateShopPage;
