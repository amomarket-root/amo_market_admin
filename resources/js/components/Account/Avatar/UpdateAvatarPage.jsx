import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CloudUploadTwoToneIcon from "@mui/icons-material/CloudUploadTwoTone";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar as MuiAvatar, Chip } from "@mui/material";
import qs from "qs";

// Reusable components
import PageHeader from "../../Form/PageHeader";
import ActionButtons from "../../Form/ActionButtons";
import { useSnackbar } from '../../Template/SnackbarAlert';
import { useSweetAlert } from "../../Template/SweetAlert";

const UpdateAvatarPage = () => {
    const navigate = useNavigate();
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();
    const { avatarId } = useParams();
    const [avatarImage, setAvatarImage] = useState("/image/no_avatar.webp");
    const [avatarImageFile, setAvatarImageFile] = useState(null);
    const [avatarImageError, setAvatarImageError] = useState('');
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleCancelClick = () => {
        navigate("/avatar");
    };

    const handleUpdate = () => {
        setAvatarImageError('');
        setLoading(true);

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('id', avatarId);

        if (avatarImageFile) {
            formData.append('avatar_file', avatarImageFile);
        }

        axios.post(`${apiUrl}/admin/avatar/update_avatar`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                const avatarData = response.data;
                showSnackbar(avatarData.message, { severity: 'success' });
                setTimeout(() => {
                    setLoading(false);
                    navigate("/avatar");
                }, 2000);
            })
            .catch(error => {
                setLoading(false);
                if (error.response) {
                    if (error.response.data && error.response.data.errors) {
                        if (error.response.data.errors.avatar_file) {
                            setAvatarImageError(error.response.data.errors.avatar_file[0]);
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

    const handleAvatarImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setAvatarImage(URL.createObjectURL(file));
                setAvatarImageFile(file);
                setAvatarImageError('');
            } else {
                setAvatarImageError('The file must be an image.');
            }
        }
    };

    useEffect(() => {
        // Fetch avatar data based on avatarId
        setLoading(true);
        const token = localStorage.getItem('token');
        axios.put(
            `${apiUrl}/admin/avatar/find_avatar`,
            qs.stringify({ id: avatarId }),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
            .then((response) => {
                const avatarData = response.data.data;
                setAvatarImage(avatarData.path ?? "/image/no_avatar.webp");
                setLoading(false);
            })
            .catch((error) => {
                showAlert({
                    title: "Error!",
                    text: "Error fetching avatar data: " + error.message,
                    icon: "error",
                });
                setLoading(false);
            });
    }, [avatarId, apiUrl]);

    useEffect(() => {
        return () => {
            if (avatarImage.startsWith('blob:')) {
                URL.revokeObjectURL(avatarImage);
            }
        };
    }, [avatarImage]);

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
                        <PageHeader title="Update Avatar" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 1 }} />
                        <Grid container spacing={2} sx={{ marginBottom: 1 }}>
                            <Grid item xs={12} sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: 4
                            }}>
                                <Box sx={{ width: "100%", textAlign: "center" }}>
                                    <Divider sx={{ width: "100%", my: 2 }}>
                                        <Chip label="Avatar Image" />
                                    </Divider>
                                </Box>

                                <MuiAvatar
                                    src={avatarImage}
                                    alt="Avatar"
                                    sx={{
                                        width: 200,
                                        height: 200,
                                        border: "1px solid grey",
                                        marginBottom: 3
                                    }}
                                />

                                <label htmlFor="avatar-image-upload">
                                    <input
                                        style={{ display: 'none' }}
                                        id="avatar-image-upload"
                                        name="avatar-image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarImageChange}
                                    />
                                    <Button
                                        sx={{
                                            marginTop: 0.5,
                                            backgroundColor: '#10d915',
                                            color: 'white',
                                            '&:hover': { backgroundColor: '#10d915' },
                                            marginBottom: 2
                                        }}
                                        variant="contained"
                                        component="span"
                                        startIcon={<CloudUploadTwoToneIcon />}
                                    >
                                        Upload New Avatar
                                    </Button>
                                </label>
                                {avatarImageError && (
                                    <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                                        {avatarImageError}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Divider sx={{ marginY: 2 }} />
                        <ActionButtons
                            handleCancel={handleCancelClick}
                            handleSubmit={handleUpdate}
                            loading={loading}
                            submitLabel="Update Avatar"
                        />
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default UpdateAvatarPage;
