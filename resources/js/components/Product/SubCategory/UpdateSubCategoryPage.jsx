import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import CloudUploadTwoToneIcon from "@mui/icons-material/CloudUploadTwoTone";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Autocomplete } from "@mui/material";
import qs from "qs";

// Reusable components
import PageHeader from "../../Form/PageHeader";
import ActionButtons from "../../Form/ActionButtons";
import { useSnackbar } from '../../Template/SnackbarAlert';
import { useSweetAlert } from "../../Template/SweetAlert";

const UpdateSubCategoryPage = () => {
    const navigate = useNavigate();
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();
    const { subCategoryId } = useParams();
    const [name, setName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState('');
    const [productCode, setProductCode] = useState('');
    const [status, setStatus] = useState('');
    const [image, setImage] = useState("/image/no_image.webp");
    const [imageFile, setImageFile] = useState(null);

    const [nameError, setNameError] = useState('');
    const [categoryNameError, setCategoryNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [productCodeError, setProductCodeError] = useState('');
    const [statusError, setStatusError] = useState('');
    const [imageError, setImageError] = useState('');

    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleCancelClick = () => {
        navigate("/subcategory");
    };

    const handleSubmit = () => {
        setNameError('');
        setCategoryNameError('');
        setDescriptionError('');
        setProductCodeError('');
        setStatusError('');
        setImageError('');
        setLoading(true);

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('subcategory_id', subCategoryId);
        formData.append('subcategory_name', name);
        formData.append('category', categoryName);
        formData.append('description', description);
        formData.append('product_code', productCode);
        formData.append('status', status);
        if (imageFile) {
            formData.append('image_file', imageFile);
        }

        axios.post(`${apiUrl}/admin/subcategory/update_subcategory`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                const subCategoryData = response.data;
                showSnackbar(subCategoryData.message, { severity: 'success' });
                setTimeout(() => {
                    setLoading(false);
                    navigate("/subcategory");
                }, 2000);
            })
            .catch(error => {
                setLoading(false);
                if (error.response) {
                    if (error.response.data && error.response.data.errors) {
                        if (error.response.data.errors.subcategory_name) {
                            setNameError(error.response.data.errors.subcategory_name[0]);
                        }
                        if (error.response.data.errors.category) {
                            setCategoryNameError(error.response.data.errors.category[0]);
                        }
                        if (error.response.data.errors.description) {
                            setDescriptionError(error.response.data.errors.description[0]);
                        }
                        if (error.response.data.errors.product_code) {
                            setProductCodeError(error.response.data.errors.product_code[0]);
                        }
                        if (error.response.data.errors.status) {
                            setStatusError(error.response.data.errors.status[0]);
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
                setImage(URL.createObjectURL(file));
                setImageFile(file);
                setImageError('');
            } else {
                setImageError('The file must be an image.');
            }
        }
    };

    useEffect(() => {
        const fetchSubCategory = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.put(
                    `${apiUrl}/admin/subcategory/find_subcategory`,
                    qs.stringify({ id: subCategoryId }),
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }
                );
                const subCategoryData = response.data.data;
                setName(subCategoryData.name);
                setCategoryName(subCategoryData.category_id);
                setDescription(subCategoryData.description);
                setProductCode(subCategoryData.product_code);
                setStatus(subCategoryData.status);
                setImage(subCategoryData.image || "/image/no_image.webp");
            } catch (error) {
                showAlert({
                    title: "Error!",
                    text: "Error fetching subcategory data:", error,
                    icon: "error",
                });
            }
        };

        fetchSubCategory();
    }, [subCategoryId, apiUrl]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${apiUrl}/admin/category/get_all_category`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCategories(response.data.data);
            } catch (error) {
                showAlert({
                    title: "Error!",
                    text: 'Error fetching categories:', error,
                    icon: "error",
                });

            }
        };

        fetchCategories();
    }, [apiUrl]);

    useEffect(() => {
        return () => {
            if (image.startsWith('blob:')) {
                URL.revokeObjectURL(image);
            }
        };
    }, [image]);

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
                        <PageHeader title="Update SubCategory" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 1 }} />
                        <Grid container spacing={2} sx={{ marginBottom: 1 }}>
                            <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", marginTop: 2 }}>
                                <img
                                    src={image}
                                    alt="Sub Category"
                                    style={{
                                        borderRadius: "8px",
                                        width: 150,
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
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            SubCategory Name :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter SubCategory Name"
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
                                            Select Category :
                                        </InputLabel>
                                        <Autocomplete
                                            options={categories}
                                            getOptionLabel={(option) => option.name}
                                            value={categories.find(category => category.id === categoryName) || null}
                                            onChange={(event, newValue) => {
                                                setCategoryName(newValue ? newValue.id : '');
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder="Choose Category Name"
                                                    variant="outlined"
                                                    fullWidth
                                                    error={!!categoryNameError}
                                                    helperText={categoryNameError}
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
                                            Product Code :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Product Code"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={productCode}
                                            onChange={(e) => setProductCode(e.target.value)}
                                            error={!!productCodeError}
                                            helperText={productCodeError}
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
                            submitLabel="Update SubCategory"
                        />
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default UpdateSubCategoryPage;
