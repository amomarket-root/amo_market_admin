import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";

// Reusable components
import PageHeader from "../../Form/PageHeader";
import ActionButtons from "../../Form/ActionButtons";
import { useSnackbar } from '../../Template/SnackbarAlert';
import { useSweetAlert } from "../../Template/SweetAlert";

const UpdateDeliveryInfoPage = () => {
    const navigate = useNavigate();
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();
    const { deliveryPageId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [link, setLink] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [imagePath, setImagePath] = useState("/image/no_image.webp");
    const [imageFile, setImageFile] = useState(null);
    const [isActive, setIsActive] = useState(true);

    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const [linkError, setLinkError] = useState('');
    const [videoUrlError, setVideoUrlError] = useState('');
    const [imageError, setImageError] = useState('');

    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleCancelClick = () => {
        navigate("/delivery-page");
    };

    const handleUpdate = () => {
        setTitleError('');
        setContentError('');
        setLinkError('');
        setVideoUrlError('');
        setImageError('');
        setLoading(true);

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('id', deliveryPageId);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('link', link);
        if (videoUrl) formData.append('video_url', videoUrl);
        if (imageFile) formData.append('image_file', imageFile);
        formData.append('is_active', isActive ? '1' : '0');

        axios.post(`${apiUrl}/admin/delivery_pages/update_delivery_page`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                const deliveryPageData = response.data;
                showSnackbar(deliveryPageData.message, { severity: 'success' });
                setTimeout(() => {
                    setLoading(false);
                    navigate("/delivery-page");
                }, 2000);
            })
            .catch(error => {
                setLoading(false);
                if (error.response) {
                    if (error.response.data && error.response.data.errors) {
                        if (error.response.data.errors.title) {
                            setTitleError(error.response.data.errors.title[0]);
                        }
                        if (error.response.data.errors.content) {
                            setContentError(error.response.data.errors.content[0]);
                        }
                        if (error.response.data.errors.link) {
                            setLinkError(error.response.data.errors.link[0]);
                        }
                        if (error.response.data.errors.video_url) {
                            setVideoUrlError(error.response.data.errors.video_url[0]);
                        }
                        if (error.response.data.errors.image_file) {
                            setImageError(error.response.data.errors.image_file[0]);
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

    const handleImageFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setImagePath(URL.createObjectURL(file));
                setImageFile(file);
                setImageError('');
            } else {
                setImageError('The file must be an image.');
            }
        }
    };

    useEffect(() => {
        // Fetch delivery page data based on deliveryPageId
        setLoading(true);
        const token = localStorage.getItem('token');
        axios.put(
            `${apiUrl}/admin/delivery_pages/find_delivery_page`,
            qs.stringify({ id: deliveryPageId }),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
            .then((response) => {
                const deliveryPageData = response.data.data;
                setTitle(deliveryPageData.title);
                setContent(deliveryPageData.content);
                setLink(deliveryPageData.link);
                setVideoUrl(deliveryPageData.video_url || '');
                setImagePath(deliveryPageData.image_path || "/image/no_image.webp");
                setIsActive(deliveryPageData.is_active);
                setLoading(false);
            })
            .catch((error) => {
                showAlert({
                    title: "Error!",
                    text: "Error fetching delivery page data: " + error.message,
                    icon: "error",
                });
                setLoading(false);
            });
    }, [deliveryPageId, apiUrl]);

    useEffect(() => {
        return () => {
            if (imagePath.startsWith('blob:')) {
                URL.revokeObjectURL(imagePath);
            }
        };
    }, [imagePath]);

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
                        <PageHeader title="Update Delivery Page" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 1 }} />
                        <Grid container spacing={2} sx={{ marginBottom: 1 }}>
                            <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", marginTop: 2 }}>
                                <Box sx={{ width: "100%", textAlign: "center" }}>
                                    <Divider sx={{ width: "100%", my: 2 }}>
                                        <Typography variant="subtitle1">Delivery Page Image</Typography>
                                    </Divider>
                                </Box>
                                <img
                                    src={imagePath}
                                    alt="Delivery Page"
                                    style={{
                                        borderRadius: "8px",
                                        width: 250,
                                        height: 150,
                                        objectFit: "cover",
                                        border: "1px solid grey",
                                        marginBottom: 10,
                                    }}
                                />
                                <label htmlFor="image-upload" style={{ marginTop: 10 }}>
                                    <input
                                        style={{ display: 'none' }}
                                        id="image-upload"
                                        name="image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageFileChange}
                                    />
                                    <Button
                                        sx={{ marginTop: 0.5, backgroundColor: '#10d915', color: 'white', '&:hover': { backgroundColor: '#10d915' } }}
                                        variant="contained"
                                        component="span"
                                        startIcon={<CloudUploadTwoToneIcon />}
                                    >
                                        Upload Image
                                    </Button>
                                </label>
                                {imageError && <Typography variant="body2" color="error">{imageError}</Typography>}
                            </Grid>

                            <Grid item xs={12} md={9}>
                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Title :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Title"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            error={!!titleError}
                                            helperText={titleError}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Content :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Content"
                                            variant="outlined"
                                            multiline
                                            rows={4}
                                            fullWidth
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            error={!!contentError}
                                            helperText={contentError}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Link :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Link URL"
                                            variant="outlined"
                                            type="url"
                                            fullWidth
                                            value={link}
                                            onChange={(e) => setLink(e.target.value)}
                                            error={!!linkError}
                                            helperText={linkError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Video URL (Optional) :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Video URL"
                                            variant="outlined"
                                            type="url"
                                            fullWidth
                                            value={videoUrl}
                                            onChange={(e) => setVideoUrl(e.target.value)}
                                            error={!!videoUrlError}
                                            helperText={videoUrlError}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
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
                                            value={isActive ? '1' : '0'}
                                            onChange={(e) => setIsActive(e.target.value === '1')}
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
                        <Divider sx={{ marginY: 2 }} />
                        <ActionButtons
                            handleCancel={handleCancelClick}
                            handleSubmit={handleUpdate}
                            loading={loading}
                            submitLabel="Update Delivery Page"
                        />
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default UpdateDeliveryInfoPage;
