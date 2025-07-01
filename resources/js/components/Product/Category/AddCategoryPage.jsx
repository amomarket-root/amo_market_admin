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


const AddCategoryPage = () => {
    const navigate = useNavigate();
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();
    const [name, setName] = useState('');
    const [shopName, setShopName] = useState('');
    const [shops, setShops] = useState([]);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState("0"); // Default to Inactive (0)
    const [contentImage, setContentImage] = useState("/image/no_image.webp");
    const [contentImageFile, setContentImageFile] = useState(null);
    const [image, setImage] = useState("/image/no_image.webp");
    const [imageFile, setImageFile] = useState(null);

    const [nameError, setNameError] = useState('');
    const [shopNameError, setShopNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [statusError, setStatusError] = useState('');
    const [contentImageError, setContentImageError] = useState('');
    const [imageError, setImageError] = useState('');

    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleCancelClick = () => {
        navigate("/category");
    };

    const handleSubmit = () => {
        setNameError('');
        setShopNameError('');
        setDescriptionError('');
        setStatusError('');
        setContentImageError('');
        setImageError('');
        setLoading(true);

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('category_name', name);
        formData.append('shop_name', shopName);
        formData.append('description', description);
        formData.append('status', status);
        formData.append('content_image', contentImage ?? null);
        formData.append('image', image ?? null);
        if (contentImageFile) {
            formData.append('content_image_file', contentImageFile);
        }
        if (imageFile) {
            formData.append('image_file', imageFile);
        }

        axios.post(`${apiUrl}/admin/category/create_category`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                const categoryData = response.data;
                showSnackbar(categoryData.message, { severity: 'success' });
                setTimeout(() => {
                    setLoading(false);
                    navigate("/category");
                }, 2000);
            })
            .catch(error => {
                setLoading(false);
                if (error.response) {
                    if (error.response.data && error.response.data.errors) {
                        if (error.response.data.errors.category_name) {
                            setNameError(error.response.data.errors.category_name[0]);
                        }
                        if (error.response.data.errors.shop_name) {
                            setShopNameError(error.response.data.errors.shop_name[0]);
                        }
                        if (error.response.data.errors.description) {
                            setDescriptionError(error.response.data.errors.description[0]);
                        }
                        if (error.response.data.errors.status) {
                            setStatusError(error.response.data.errors.status[0]);
                        }
                        if (error.response.data.errors.content_image_file) {
                            setContentImageError(error.response.data.errors.content_image_file[0]);
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

    const handleContentImageFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setContentImage(URL.createObjectURL(file));
                setContentImageFile(file);
                setContentImageError('');
            } else {
                setContentImageError('The file must be an image.');
            }
        }
    };

    const handleImageFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setImage(URL.createObjectURL(file));
                setImageFile(file);
                setImageError('');
            } else {
                setImageError('The file must be an image.');
            }
        }
    };

    useEffect(() => {
        return () => {
            if (contentImage.startsWith('blob:')) {
                URL.revokeObjectURL(contentImage);
            }
        };
    }, [contentImage]);

    useEffect(() => {
        return () => {
            if (image.startsWith('blob:')) {
                URL.revokeObjectURL(image);
            }
        };
    }, [image]);

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${apiUrl}/admin/shop/get_all_shop`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setShops(response.data.data);
                setLoading(false);
            } catch (error) {
                showAlert({
                    title: "Error!",
                    text: 'Error fetching shops:', error,
                    icon: "error",
                });
                setLoading(false);
            }
        };

        fetchShops();
    }, [apiUrl]);

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
                        <PageHeader title="Add Category" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 1 }} />
                        <Grid container spacing={2} sx={{ marginBottom: 1 }}>
                            <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", marginTop: 2 }}>
                                <img
                                    src={contentImage}
                                    alt="Content"
                                    style={{
                                        borderRadius: "8px",
                                        width: 150,
                                        height: 150,
                                        objectFit: "cover",
                                        border: "1px solid grey",
                                        marginBottom: 10,
                                    }}
                                />

                                <label htmlFor="content-image-upload" style={{ marginTop: 10 }}>
                                    <input
                                        style={{ display: 'none' }}
                                        id="content-image-upload"
                                        name="content-image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleContentImageFileChange}
                                    />
                                    <Button
                                        sx={{ marginTop: 0.5, backgroundColor: '#10d915', color: 'white', '&:hover': { backgroundColor: '#10d915' } }}
                                        variant="contained"
                                        component="span"
                                        startIcon={<CloudUploadTwoToneIcon />}
                                    >
                                        Upload Content Image
                                    </Button>
                                </label>
                                {contentImageError && <Typography variant="body2" color="error">{contentImageError}</Typography>}

                                <Box sx={{ display: 'flex', alignItems: 'center', marginY: 1 }}>
                                    <Divider sx={{ flexGrow: 1 }} />
                                    <Chip label="--- OR Choose Image ---" size="small" sx={{ margin: "0 5px" }} />
                                    <Divider sx={{ flexGrow: 1 }} />
                                </Box>

                                <img
                                    src={image}
                                    alt={image}
                                    style={{
                                        borderRadius: "8px",
                                        width: 150,
                                        height: 150,
                                        objectFit: "cover",
                                        border: "1px solid grey",
                                        marginTop: 10,
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
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Category Name :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Category Name"
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
                                            Shop Name :
                                        </InputLabel>
                                        <Autocomplete
                                            options={shops}
                                            getOptionLabel={(option) => option.name}
                                            value={shops.find(shop => shop.id === shopName) || null}
                                            onChange={(event, newValue) => {
                                                setShopName(newValue ? newValue.id : '');
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder="Choose Shop Name"
                                                    variant="outlined"
                                                    fullWidth
                                                    error={!!shopNameError}
                                                    helperText={shopNameError}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12} md={12}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Description :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Description"
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
                                            Status :
                                        </InputLabel>
                                        <TextField
                                            select
                                            placeholder="Select Status"
                                            variant="outlined"
                                            fullWidth
                                            value={status} // Default value is 0 (Inactive)
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
                        <Divider sx={{ marginY: 2 }} />
                        <ActionButtons
                            handleCancel={handleCancelClick}
                            handleSubmit={handleSubmit}
                            loading={loading}
                            submitLabel="Add Category"
                        />
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default AddCategoryPage;
