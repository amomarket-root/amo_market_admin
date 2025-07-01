import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CloudUploadTwoToneIcon from "@mui/icons-material/CloudUploadTwoTone";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Reusable components
import PageHeader from "../Form/PageHeader";
import ActionButtons from "../Form/ActionButtons";
import { useSnackbar } from '../Template/SnackbarAlert';
import { useSweetAlert } from "../Template/SweetAlert";

const AddBlogPage = () => {
    const navigate = useNavigate();
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();
    const [mainTitle, setMainTitle] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Initialize with today's date in YYYY-MM-DD format
    const [location, setLocation] = useState('');
    const [customUrl, setCustomUrl] = useState('');
    const [multimedia, setMultimedia] = useState("/image/no_image.webp");
    const [multimediaFile, setMultimediaFile] = useState(null);
    const [header, setHeader] = useState('');
    const [description, setDescription] = useState('');
    const [otherImages, setOtherImages] = useState([]);
    const [otherImagesFiles, setOtherImagesFiles] = useState([]);

    const [mainTitleError, setMainTitleError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [dateError, setDateError] = useState('');
    const [multimediaError, setMultimediaError] = useState('');
    const [otherImagesError, setOtherImagesError] = useState('');

    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleCancelClick = () => {
        navigate("/blog");
    };

    const handleSubmit = () => {
        setMainTitleError('');
        setCategoryError('');
        setDateError('');
        setMultimediaError('');
        setOtherImagesError('');
        setLoading(true);

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('main_title', mainTitle);
        formData.append('category', category);
        formData.append('date', date); // Use the date directly in YYYY-MM-DD format
        formData.append('location', location);
        formData.append('custom_url', customUrl);
        formData.append('header', header);
        formData.append('description', description);
        if (multimediaFile) {
            formData.append('multimedia_file', multimediaFile);
        }
        otherImagesFiles.forEach((file, index) => {
            formData.append(`other_images_files[${index}]`, file);
        });

        axios.post(`${apiUrl}/admin/blog/create_blog`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                const blogData = response.data;
                showSnackbar(blogData.message, { severity: 'success' });
                setTimeout(() => {
                    setLoading(false);
                    navigate("/blog");
                }, 2000);
            })
            .catch(error => {
                setLoading(false);
                if (error.response) {
                    if (error.response.data && error.response.data.errors) {
                        if (error.response.data.errors.main_title) {
                            setMainTitleError(error.response.data.errors.main_title[0]);
                        }
                        if (error.response.data.errors.category) {
                            setCategoryError(error.response.data.errors.category[0]);
                        }
                        if (error.response.data.errors.date) {
                            setDateError(error.response.data.errors.date[0]);
                        }
                        if (error.response.data.errors.multimedia_file) {
                            setMultimediaError(error.response.data.errors.multimedia_file[0]);
                        }
                        if (error.response.data.errors.other_images_files) {
                            setOtherImagesError(error.response.data.errors.other_images_files[0]);
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

    const handleMultimediaFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
                setMultimedia(URL.createObjectURL(file));
                setMultimediaFile(file);
                setMultimediaError('');
            } else {
                setMultimediaError('The file must be an image or video.');
            }
        }
    };

    const handleOtherImagesFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const validFiles = files.filter(file => file.type.startsWith('image/'));
            if (validFiles.length === files.length) {
                setOtherImages(validFiles.map(file => URL.createObjectURL(file)));
                setOtherImagesFiles(validFiles);
                setOtherImagesError('');
            } else {
                setOtherImagesError('All files must be images.');
            }
        }
    };

    useEffect(() => {
        return () => {
            if (multimedia.startsWith('blob:')) {
                URL.revokeObjectURL(multimedia);
            }
            otherImages.forEach(image => {
                if (image.startsWith('blob:')) {
                    URL.revokeObjectURL(image);
                }
            });
        };
    }, [multimedia, otherImages]);

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
                        <PageHeader title="Add Blog/News" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 1 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <Grid container spacing={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
                                    <Box sx={{ width: "100%", textAlign: "center" }}>
                                        <Divider sx={{ width: "100%", my: 2 }}>
                                            <Typography variant="h6">Multimedia</Typography>
                                        </Divider>
                                    </Box>
                                    <img
                                        src={multimedia}
                                        alt="Multimedia"
                                        style={{
                                            borderRadius: "5px",
                                            width: "90%",
                                            height: 500,
                                            objectFit: "cover",
                                            border: "1px solid grey",
                                            marginBottom: 10,
                                        }}
                                    />
                                    <label htmlFor="multimedia-upload" style={{ marginTop: 10 }}>
                                        <input
                                            style={{ display: 'none' }}
                                            id="multimedia-upload"
                                            name="multimedia-upload"
                                            type="file"
                                            accept="image/*,video/*"
                                            onChange={handleMultimediaFileChange}
                                        />
                                        <Button
                                            sx={{ marginTop: 0.5, backgroundColor: '#10d915', color: 'white', '&:hover': { backgroundColor: '#10d915' } }}
                                            variant="contained"
                                            component="span"
                                            startIcon={<CloudUploadTwoToneIcon />}
                                        >
                                            Upload Multimedia
                                        </Button>
                                    </label>
                                    {multimediaError && <Typography variant="body2" color="error">{multimediaError}</Typography>}
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel
                                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                    shrink
                                >
                                    Main Title :
                                </InputLabel>
                                <TextField
                                    placeholder="Enter Main Title"
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    value={mainTitle}
                                    onChange={(e) => setMainTitle(e.target.value)}
                                    error={!!mainTitleError}
                                    helperText={mainTitleError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel
                                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                    shrink
                                >
                                    Category :
                                </InputLabel>
                                <TextField
                                    select
                                    fullWidth
                                    variant="outlined"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    error={!!categoryError}
                                    helperText={categoryError}
                                >
                                    <MenuItem value="shop">Shop</MenuItem>
                                    <MenuItem value="delivery">Delivery</MenuItem>
                                    <MenuItem value="customer">Customer</MenuItem>
                                    <MenuItem value="promotion">Promotion</MenuItem>
                                    <MenuItem value="reward">Reward</MenuItem>
                                    <MenuItem value="product">Product</MenuItem>
                                    <MenuItem value="service">Service</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel
                                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                    shrink
                                >
                                    Date :
                                </InputLabel>
                                <TextField
                                    type="date"
                                    fullWidth
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    error={!!dateError}
                                    helperText={dateError}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel
                                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                    shrink
                                >
                                    Custom URL :
                                </InputLabel>
                                <TextField
                                    placeholder="Enter Custom URL"
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    value={customUrl}
                                    onChange={(e) => setCustomUrl(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel
                                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                    shrink
                                >
                                    Header :
                                </InputLabel>
                                <TextField
                                    placeholder="Enter Header"
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    value={header}
                                    onChange={(e) => setHeader(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel
                                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                    shrink
                                >
                                    Description :
                                </InputLabel>
                                <TextField
                                    placeholder="Enter Description"
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>
                            <Grid container spacing={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
                                <Grid item xs={12}>
                                    <Box sx={{ width: "100%", textAlign: "center" }}>
                                        <Divider sx={{ width: "100%", my: 2 }}>
                                            <Typography variant="h6">Other Images</Typography>
                                        </Divider>
                                    </Box>
                                    <Grid container spacing={2}>
                                        {otherImages.map((image, index) => (
                                            <Grid item xs={12} sm={6} md={4} key={index}>
                                                <img
                                                    src={image}
                                                    alt={`Other media ${index + 1}`}
                                                    style={{
                                                        borderRadius: "10px",
                                                        width: "100%",
                                                        height: 150,
                                                        objectFit: "cover",
                                                        border: "1px solid grey",
                                                    }}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <label htmlFor="other-images-upload" style={{ marginTop: 10 }}>
                                        <input
                                            style={{ display: 'none' }}
                                            id="other-images-upload"
                                            name="other-images-upload"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleOtherImagesFileChange}
                                        />
                                        <Button
                                            sx={{ marginTop: 0.5, backgroundColor: '#10d915', color: 'white', '&:hover': { backgroundColor: '#10d915' } }}
                                            variant="contained"
                                            component="span"
                                            startIcon={<CloudUploadTwoToneIcon />}
                                        >
                                            Upload Other Images
                                        </Button>
                                    </label>
                                    {otherImagesError && <Typography variant="body2" color="error">{otherImagesError}</Typography>}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider sx={{ marginY: 2 }} />
                        <ActionButtons
                            handleCancel={handleCancelClick}
                            handleSubmit={handleSubmit}
                            loading={loading}
                            submitLabel="Add Blog/News"
                        />
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default AddBlogPage;
