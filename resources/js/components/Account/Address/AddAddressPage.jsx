import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IconButton, InputAdornment } from "@mui/material";
import MyLocationTwoToneIcon from '@mui/icons-material/MyLocationTwoTone';
import Autocomplete from "@mui/material/Autocomplete";

// Reusable components
import PageHeader from "../../Form/PageHeader";
import ActionButtons from "../../Form/ActionButtons";
import { useSnackbar } from '../../Template/SnackbarAlert';
import { useSweetAlert } from "../../Template/SweetAlert";

const AddAddressPage = () => {
    const navigate = useNavigate();
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();

    // Form state
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [alternativeNumber, setAlternativeNumber] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [buildingDetails, setBuildingDetails] = useState("");
    const [location, setLocation] = useState("");
    const [isDefault, setIsDefault] = useState("0");
    const [addressType, setAddressType] = useState("home");
    const [deliveryNote, setDeliveryNote] = useState("");
    const [status, setStatus] = useState("1"); // Default to Active
    const [fullAddress, setFullAddress] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [userData, setUserData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    // Error states
    const [fullNameError, setFullNameError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [alternativeNumberError, setAlternativeNumberError] = useState('');
    const [pinCodeError, setPinCodeError] = useState('');
    const [stateError, setStateError] = useState('');
    const [cityError, setCityError] = useState('');
    const [buildingDetailsError, setBuildingDetailsError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [isDefaultError, setIsDefaultError] = useState('');
    const [addressTypeError, setAddressTypeError] = useState('');
    const [deliveryNoteError, setDeliveryNoteError] = useState('');
    const [statusError, setStatusError] = useState('');
    const [fullAddressError, setFullAddressError] = useState('');
    const [latitudeError, setLatitudeError] = useState('');
    const [longitudeError, setLongitudeError] = useState('');
    const [userError, setUserError] = useState('');

    const [loading, setLoading] = useState(false);
    const [userLoading, setUserLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;

    const addressTypes = [
        { value: 'home', label: 'Home' },
        { value: 'work', label: 'Work' },
        { value: 'other', label: 'Other' },
    ];

    useEffect(() => {
        const fetchUsers = async () => {
            setUserLoading(true);
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${apiUrl}/admin/user/fetch_all_user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const formattedUsers = response.data.data.data.map(user => ({
                    label: user.name,
                    value: user.id,
                }));
                setUserData(formattedUsers);
            } catch (error) {
                showSnackbar("Error fetching users", { severity: 'error' });
                console.error("Error fetching users:", error);
            } finally {
                setUserLoading(false);
            }
        };

        fetchUsers();
    }, [apiUrl]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleCancelClick = () => {
        navigate("/address");
    };

    const handleUserSelect = (event, value) => {
        setSelectedUser(value);
        setUserError('');
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
                        const result = data.results[0];
                        setLocation(result.formatted_address || "Unable to fetch address");
                        setFullAddress(result.formatted_address || "");

                        // Extract address components
                        const addressComponents = {};
                        result.address_components.forEach(component => {
                            const types = component.types;
                            if (types.includes('postal_code')) {
                                setPinCode(component.long_name);
                            }
                            if (types.includes('administrative_area_level_1')) {
                                setState(component.long_name);
                            }
                            if (types.includes('locality')) {
                                setCity(component.long_name);
                            }
                        });

                        setLatitude(latitude.toString());
                        setLongitude(longitude.toString());
                    } else {
                        setLocation("Unable to fetch address");
                    }
                } catch (error) {
                    showAlert({
                        title: "Error!",
                        text: "Error fetching address:" + (error || "Please try again later."),
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
                    text: "Error getting current location:" + (error || "Please try again later."),
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
                    showSnackbar("Geolocation is not supported by this browser.", { severity: 'error' }, 2000);
                }
            }
        });
    };

    const handleSubmit = () => {
        // Reset errors
        setFullNameError('');
        setPhoneNumberError('');
        setAlternativeNumberError('');
        setPinCodeError('');
        setStateError('');
        setCityError('');
        setBuildingDetailsError('');
        setLocationError('');
        setIsDefaultError('');
        setAddressTypeError('');
        setDeliveryNoteError('');
        setStatusError('');
        setFullAddressError('');
        setLatitudeError('');
        setLongitudeError('');
        setUserError('');

        // Validate required fields
        if (!selectedUser) {
            setUserError('Please select a user');
            return;
        }

        setLoading(true);

        const token = localStorage.getItem('token');
        const formData = {
            user_id: selectedUser.value,
            full_name: fullName,
            phone_number: phoneNumber,
            alternative_number: alternativeNumber,
            pin_code: pinCode,
            state: state,
            city: city,
            building_details: buildingDetails,
            location: location,
            is_default: isDefault,
            address_type: addressType,
            delivery_note: deliveryNote,
            status: status,
            full_address: fullAddress,
            latitude: latitude,
            longitude: longitude,
        };

        axios.post(`${apiUrl}/admin/address/create`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                const addressData = response.data;
                showSnackbar(addressData.message, { severity: 'success' });
                setTimeout(() => {
                    setLoading(false);
                    navigate("/address");
                }, 2000);
            })
            .catch(error => {
                setLoading(false);
                if (error.response) {
                    if (error.response.data && error.response.data.errors) {
                        const errors = error.response.data.errors;

                        if (errors.user_id) setUserError(errors.user_id[0]);
                        if (errors.full_name) setFullNameError(errors.full_name[0]);
                        if (errors.phone_number) setPhoneNumberError(errors.phone_number[0]);
                        if (errors.alternative_number) setAlternativeNumberError(errors.alternative_number[0]);
                        if (errors.pin_code) setPinCodeError(errors.pin_code[0]);
                        if (errors.state) setStateError(errors.state[0]);
                        if (errors.city) setCityError(errors.city[0]);
                        if (errors.building_details) setBuildingDetailsError(errors.building_details[0]);
                        if (errors.location) setLocationError(errors.location[0]);
                        if (errors.is_default) setIsDefaultError(errors.is_default[0]);
                        if (errors.address_type) setAddressTypeError(errors.address_type[0]);
                        if (errors.delivery_note) setDeliveryNoteError(errors.delivery_note[0]);
                        if (errors.status) setStatusError(errors.status[0]);
                        if (errors.full_address) setFullAddressError(errors.full_address[0]);
                        if (errors.latitude) setLatitudeError(errors.latitude[0]);
                        if (errors.longitude) setLongitudeError(errors.longitude[0]);
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
                        <PageHeader title="Add Address" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 1 }} />
                        <Grid container spacing={2} sx={{ padding: 2 }}>
                            <Grid item xs={12}>
                                <InputLabel
                                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                    shrink
                                >
                                    Select User :
                                </InputLabel>
                                <Autocomplete
                                    options={userData}
                                    loading={userLoading}
                                    getOptionLabel={(option) => option.label}
                                    value={selectedUser}
                                    onChange={handleUserSelect}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Select User"
                                            error={!!userError}
                                            helperText={userError}
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <>
                                                        {userLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                                        {params.InputProps.endAdornment}
                                                    </>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel
                                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                    shrink
                                >
                                    Full Name :
                                </InputLabel>
                                <TextField
                                    placeholder="Enter Full Name"
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    error={!!fullNameError}
                                    helperText={fullNameError}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <InputLabel
                                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                    shrink
                                >
                                    Phone Number :
                                </InputLabel>
                                <TextField
                                    placeholder="Enter Phone Number"
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    error={!!phoneNumberError}
                                    helperText={phoneNumberError}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <InputLabel
                                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                    shrink
                                >
                                    Alternative Number :
                                </InputLabel>
                                <TextField
                                    placeholder="Enter Alternative Number (Optional)"
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    value={alternativeNumber}
                                    onChange={(e) => setAlternativeNumber(e.target.value)}
                                    error={!!alternativeNumberError}
                                    helperText={alternativeNumberError}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                            <Grid item xs={12} md={4}>
                                <InputLabel
                                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                    shrink
                                >
                                    PIN Code :
                                </InputLabel>
                                <TextField
                                    placeholder="Enter PIN Code"
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    value={pinCode}
                                    onChange={(e) => setPinCode(e.target.value)}
                                    error={!!pinCodeError}
                                    helperText={pinCodeError}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <InputLabel
                                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                    shrink
                                >
                                    State :
                                </InputLabel>
                                <TextField
                                    placeholder="Enter State"
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    error={!!stateError}
                                    helperText={stateError}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <InputLabel
                                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                    shrink
                                >
                                    City :
                                </InputLabel>
                                <TextField
                                    placeholder="Enter City"
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    error={!!cityError}
                                    helperText={cityError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel
                                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                    shrink
                                >
                                    Building Details :
                                </InputLabel>
                                <TextField
                                    placeholder="Enter Building/House Details"
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    value={buildingDetails}
                                    onChange={(e) => setBuildingDetails(e.target.value)}
                                    error={!!buildingDetailsError}
                                    helperText={buildingDetailsError}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel
                                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                    shrink
                                >
                                    Full Address :
                                </InputLabel>
                                <TextField
                                    placeholder="Enter Full Address"
                                    variant="outlined"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    value={fullAddress}
                                    onChange={(e) => setFullAddress(e.target.value)}
                                    error={!!fullAddressError}
                                    helperText={fullAddressError}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel
                                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                    shrink
                                >
                                    Delivery Note (Optional) :
                                </InputLabel>
                                <TextField
                                    placeholder="Enter Delivery Note"
                                    variant="outlined"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    value={deliveryNote}
                                    onChange={(e) => setDeliveryNote(e.target.value)}
                                    error={!!deliveryNoteError}
                                    helperText={deliveryNoteError}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
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
                            <Grid item xs={12} md={4}>
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
                            <Grid item xs={12} md={4}>
                                <InputLabel
                                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                    shrink
                                >
                                    Address Type :
                                </InputLabel>
                                <TextField
                                    select
                                    variant="outlined"
                                    fullWidth
                                    value={addressType}
                                    onChange={(e) => setAddressType(e.target.value)}
                                    error={!!addressTypeError}
                                    helperText={addressTypeError}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    {addressTypes.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel
                                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                    shrink
                                >
                                    Set as Default Address :
                                </InputLabel>
                                <TextField
                                    select
                                    variant="outlined"
                                    fullWidth
                                    value={isDefault}
                                    onChange={(e) => setIsDefault(e.target.value)}
                                    error={!!isDefaultError}
                                    helperText={isDefaultError}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value={1}>Yes</option>
                                    <option value={0}>No</option>
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
                        <Divider sx={{ marginY: 1 }} />
                        <ActionButtons
                            handleCancel={handleCancelClick}
                            handleSubmit={handleSubmit}
                            loading={loading}
                            submitLabel="Add Address"
                        />
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default AddAddressPage;
