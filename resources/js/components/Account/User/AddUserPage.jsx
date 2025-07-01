import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CloudUploadTwoToneIcon from "@mui/icons-material/CloudUploadTwoTone";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
import Chip from '@mui/material/Chip';
import axios from "axios";
import { Autocomplete } from "@mui/material";

// Reusable components
import PageHeader from "../../Form/PageHeader";
import ActionButtons from "../../Form/ActionButtons";
import { useSnackbar } from '../../Template/SnackbarAlert';
import { useSweetAlert } from "../../Template/SweetAlert";


const AddUserPage = () => {
    const navigate = useNavigate();
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();
    const [name, setName] = useState("");
    const [roles, setRoles] = useState([]);
    const [roleName, setRoleName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirm] = useState("");
    const [status, setStatus] = useState("");
    const [avatar, setAvatar] = useState("/image/no_avatar.webp"); // Default avatar path
    const [selectedAvatarId, setSelectedAvatarId] = useState(null);

    const [nameError, setNameError] = useState('');
    const [roleNameError, setRoleNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordConfirmationError, setPasswordConfirmationError] = useState('');
    const [statusError, setStatusError] = useState('');
    const [avatarError, setAvatarError] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    const [loading, setLoading] = useState(false);

    const [avatarList, setAvatarList] = useState([]);
    const [scrollIndex, setScrollIndex] = useState(0);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleCancelClick = () => {
        navigate("/user"); // Replace '/desired/path' with the path you want to navigate to on cancel
    };

    const handleSubmit = () => {
        setNameError('');
        setRoleNameError('');
        setEmailError('');
        setPasswordError('');
        setPasswordConfirmationError('');
        setStatusError('');
        setAvatarError('');
        setLoading(true);

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('name', name);
        formData.append('role_id', roleName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', password_confirmation);
        formData.append('status', status);
        formData.append('avatar', avatar ?? null);
        if (selectedAvatarId) {
            formData.append('main_avatar', selectedAvatarId); // Pass selected avatar ID
        } else if (avatarFile) {
            formData.append('main_avatar', avatarFile); // Pass uploaded avatar file
        }

        axios.post(`${apiUrl}/admin/user/create_user`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                const userData = response.data;
                showSnackbar(userData.message, { severity: 'success' });
                setTimeout(() => {
                    setLoading(false);
                    navigate("/user");
                }, 2000);
            })
            .catch(error => {
                setLoading(false);
                if (error.response) {
                    if (error.response.data && error.response.data.errors) {
                        if (error.response.data.errors.name) {
                            setNameError(error.response.data.errors.name[0]);
                        }
                        if (error.response.data.errors.role_id) {
                            setRoleNameError(error.response.data.errors.role_id[0]);
                        }
                        if (error.response.data.errors.email) {
                            setEmailError(error.response.data.errors.email[0]);
                        }
                        if (error.response.data.errors.password) {
                            setPasswordError(error.response.data.errors.password[0]);
                        }
                        if (error.response.data.errors.password_confirmation) {
                            setPasswordConfirmationError(error.response.data.errors.password_confirmation[0]);
                        }
                        if (error.response.data.errors.status) {
                            setStatusError(error.response.data.errors.status[0]);
                        }
                        if (error.response.data.errors.main_avatar) {
                            setAvatarError(error.response.data.errors.main_avatar[0]);
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setAvatar(URL.createObjectURL(file));
                setAvatarFile(file);
                setSelectedAvatarId(null);
                setAvatarError('');
            } else {
                setAvatarError('The file must be an image.');
            }
        }
    };

    const handleAvatarSelect = (avatarUrl, avatarId) => {
        setAvatar(avatarUrl);
        setSelectedAvatarId(avatarId);
        setAvatarFile(null); // Reset uploaded file when selecting an avatar
    };

    useEffect(() => {
        const fetchAvatars = async () => {
            setLoading(true); // Optionally, you can show a loading state
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get(`${apiUrl}/admin/avatars`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Map the response to get only the paths of the avatars
                const fetchedAvatars = response.data.map(avatar => ({ id: avatar.id, path: avatar.path }));
                setAvatarList(fetchedAvatars);
            } catch (error) {
                showAlert({
                    title: "Error!",
                    text: "Error fetching avatars:" + (error || "Please try again later."),
                    icon: "error",
                });
            } finally {
                setLoading(false); // Hide loading state
            }
        };

        fetchAvatars();
    }, [apiUrl]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${apiUrl}/admin/role/get_all_role`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setRoles(response.data.data);
                setLoading(false);
            } catch (error) {
                showAlert({
                    title: "Error!",
                    text: "Error fetching roles: " + (error || "Please try again later."),
                    icon: "error",
                });
                setLoading(false);
            }
        };

        fetchRoles();
    }, [apiUrl]);

    const scrollLeft = () => {
        setScrollIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    const scrollRight = () => {
        setScrollIndex(prevIndex => Math.min(prevIndex + 1, avatarList.length - 1));
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
                        <PageHeader title="Add User" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 1 }} />
                        <Grid container spacing={2} sx={{ marginBottom: 1 }}>
                            <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                <img src={avatar} alt="Avatar" style={{ borderRadius: "50%", width: 150, height: 150, objectFit: "cover", border: '1px solid grey' }} />
                                <label htmlFor="avatar-upload" style={{ marginTop: 10 }}>
                                    <input
                                        style={{ display: 'none' }}
                                        id="avatar-upload"
                                        name="avatar-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    <Button
                                        sx={{ marginTop: 0.5, backgroundColor: '#10d915', color: 'white', '&:hover': { backgroundColor: '#10d915' } }}
                                        variant="contained"
                                        component="span"
                                        startIcon={<CloudUploadTwoToneIcon />}
                                    >
                                        Upload Avatar
                                    </Button>
                                </label>
                                {avatarError && <Typography variant="body2" color="error">{avatarError}</Typography>}
                                {/* New Box to contain the Divider and Chip */}
                                <Box sx={{ display: 'flex', alignItems: 'center', marginY: 1 }}>
                                    <Divider sx={{ flexGrow: 1 }} />
                                    <Chip label="------ OR Choose Avatar ------" size="small" sx={{ margin: "0 5px" }} />
                                    <Divider sx={{ flexGrow: 1 }} />
                                </Box>
                                <Box sx={{ display: 'flex', overflowX: 'auto', paddingX: 2 }}>
                                    <Button onClick={scrollLeft} sx={{ marginRight: 0.5, borderRadius: "50%" }}>
                                        <ArrowBackRoundedIcon />
                                    </Button>
                                    {avatarList.slice(scrollIndex, scrollIndex + 3).map((avatar, index) => (
                                        <img key={index} src={avatar.path} alt="Avatar" style={{ borderRadius: "50%", width: 60, height: 60, objectFit: "cover", border: '1px solid grey', marginRight: 2 }} onClick={() => handleAvatarSelect(avatar.path, avatar.id)} />
                                    ))}
                                    <Button onClick={scrollRight} sx={{ marginLeft: 0.5, borderRadius: "50%" }}>
                                        <ArrowBackRoundedIcon sx={{ transform: 'rotate(180deg)' }} />
                                    </Button>
                                </Box>
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
                                            placeholder="Enter User Name"
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
                                            Email :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Email Address"
                                            variant="outlined"
                                            type="email"
                                            fullWidth
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            error={!!emailError}
                                            helperText={emailError}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Password :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Password"
                                            variant="outlined"
                                            fullWidth
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            error={!!passwordError}
                                            helperText={passwordError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Confirm Password :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Confirm Password"
                                            variant="outlined"
                                            fullWidth
                                            type="password"
                                            value={password_confirmation}
                                            onChange={(e) => setPasswordConfirm(e.target.value)}
                                            error={!!passwordConfirmationError}
                                            helperText={passwordConfirmationError}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Select Role :
                                        </InputLabel>
                                        <Autocomplete
                                            options={roles}
                                            getOptionLabel={(option) => option.name} // Display shop name
                                            getOptionSelected={(option, value) => option.id === value.id} // Manage the selected option
                                            loading={loading}
                                            value={roles.find(roles => roles.id === roleName) || null} // Set the selected shop based on shop ID
                                            onChange={(event, newValue) => {
                                                // Store shop ID instead of shop name
                                                setRoleName(newValue ? newValue.id : '');
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder="Choose Role Name"
                                                    variant="outlined"
                                                    fullWidth
                                                    error={Boolean(roleNameError)}
                                                    helperText={roleNameError}
                                                />
                                            )}
                                        />
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
                                            <option selected value={1}>Active</option>
                                            <option value={2}>Pending</option>
                                            <option value={0}>Inactive</option>
                                        </TextField>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider sx={{ marginY: 2 }} />
                        <ActionButtons
                            handleCancel={handleCancelClick}
                            handleSubmit={handleSubmit}
                            loading={loading}
                            submitLabel="Add User"
                        />
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default AddUserPage;
