import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Divider, TextField, Grid, Paper, CardContent, styled, Chip, Autocomplete } from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useParams } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import qs from 'qs';

// Reusable components
import PageHeader from "../../Form/PageHeader";
import ActionButtons from "../../Form/ActionButtons";
import { useSnackbar } from '../../Template/SnackbarAlert';
import { useSweetAlert } from "../../Template/SweetAlert";

// Styled input for file upload
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const UpdateProductInformationPage = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();
    const { productInformationId } = useParams();
    const [productInfo, setProductInfo] = useState({
        product_id: '',
        product_type: '',
        product_flavour: '',
        product_Ingredients: '',
        product_attraction: '',
        key_features: '',
        fssai_license: '',
        other_license: '',
        shelf_life: '',
        manufacturer_details: '',
        seller: '',
        seller_fssai: '',
        country_of_origin: '',
        state_of_origin: '',
        return_policy: '',
        disclaimer: '',
        second_unit_weight: '',
        second_unit_price: '',
        second_unit_original_price: '',
        second_unit_discount: '',
        total_second_unit: '',
        second_unit_image: null,
        third_unit_weight: '',
        third_unit_price: '',
        third_unit_original_price: '',
        third_unit_discount: '',
        total_third_unit: '',
        third_unit_image: null,
        product_image_one: null,
        product_image_two: null,
        product_image_three: null,
        product_image_four: null,
        product_image_five: null,
        product_extra_image: null,
    });

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProductInfo = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const response = await axios.put(
                    `${apiUrl}/admin/product_info/find_product_info`,
                    qs.stringify({ id: productInformationId }),
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }
                );
                const productInfoData = response.data.data;
                setProductInfo(productInfoData);
                setLoading(false);
            } catch (error) {
                showAlert({
                    title: "Error!",
                    text: "Error fetching product information data:", error,
                    icon: "error",
                });
                setLoading(false);
            }
        };

        fetchProductInfo();
    }, [productInformationId, apiUrl]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${apiUrl}/admin/product/get_all_product`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setProducts(response.data.data || []);
                setLoading(false);
            } catch (error) {
                showAlert({
                    title: "Error!",
                    text: "Error fetching products:", error,
                    icon: "error",
                });
                setLoading(false);
            }
        };

        fetchProducts();
    }, [apiUrl]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductInfo({ ...productInfo, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setProductInfo({ ...productInfo, [name]: files[0] });
    };

    const handleCancelClick = () => {
        navigate("/product-information");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Loop through all fields in productInfo
        for (const key in productInfo) {
            if (productInfo[key] !== null && productInfo[key] !== undefined) {
                // Handle file fields
                if (typeof productInfo[key] === 'object' && productInfo[key] instanceof File) {
                    formData.append(key, productInfo[key]);
                }
                // Handle existing image URLs
                else if (typeof productInfo[key] === 'string' && productInfo[key].startsWith('http')) {
                    formData.append(key, productInfo[key]);
                }
                // Handle other fields (strings, numbers, etc.)
                else {
                    formData.append(key, productInfo[key]);
                }
            }
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${apiUrl}/admin/product_info/update_product_info`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            showSnackbar('Product Information updated successfully!', { severity: 'success' });
            setTimeout(() => {
                setLoading(false);
                navigate("/product-information");
            }, 2000);

        } catch (error) {

            showAlert({
                title: "Error!",
                text: "Error updating product information. Please try again.",
                icon: "error",
                confirmButtonText: 'OK',
            });
        }
    };

    const handleBackClick = () => {
        navigate(-1);
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
                        <PageHeader title="Update Product Information" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 1 }} />
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Box sx={{ mb: 4 }}>
                                    <Divider sx={{ my: 1 }}>
                                        <Chip label="Product Information" />
                                    </Divider>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <Autocomplete
                                                options={products || []}
                                                getOptionLabel={(option) => option.name || ''}
                                                value={products?.find(product => product.id === productInfo.product_id) || null}
                                                onChange={(event, newValue) => {
                                                    setProductInfo({ ...productInfo, product_id: newValue ? newValue.id : '' });
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Product ID"
                                                        size="small"
                                                        required
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Product Type"
                                                size="small"
                                                name="product_type"
                                                value={productInfo.product_type}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Product Flavour"
                                                size="small"
                                                name="product_flavour"
                                                value={productInfo.product_flavour}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Product Ingredients"
                                                size="small"
                                                name="product_Ingredients"
                                                multiline
                                                rows={4}
                                                value={productInfo.product_Ingredients}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Product Attraction"
                                                size="small"
                                                name="product_attraction"
                                                multiline
                                                rows={4}
                                                value={productInfo.product_attraction}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Key Features"
                                                size="small"
                                                name="key_features"
                                                multiline
                                                rows={4}
                                                value={productInfo.key_features}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="FSSAI License"
                                                size="small"
                                                name="fssai_license"
                                                value={productInfo.fssai_license}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Other License"
                                                size="small"
                                                name="other_license"
                                                value={productInfo.other_license}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Shelf Life"
                                                size="small"
                                                name="shelf_life"
                                                value={productInfo.shelf_life}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Manufacturer Details"
                                                size="small"
                                                name="manufacturer_details"
                                                value={productInfo.manufacturer_details}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Seller"
                                                size="small"
                                                name="seller"
                                                value={productInfo.seller}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Seller FSSAI"
                                                size="small"
                                                name="seller_fssai"
                                                value={productInfo.seller_fssai}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Country of Origin"
                                                size="small"
                                                name="country_of_origin"
                                                value={productInfo.country_of_origin}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="State of Origin"
                                                size="small"
                                                name="state_of_origin"
                                                value={productInfo.state_of_origin}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Return Policy"
                                                size="small"
                                                name="return_policy"
                                                multiline
                                                rows={4}
                                                value={productInfo.return_policy}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Disclaimer"
                                                size="small"
                                                name="disclaimer"
                                                multiline
                                                rows={4}
                                                value={productInfo.disclaimer}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Divider sx={{ my: 4 }}>
                                    <Chip label="2nd Unit Details" />
                                </Divider>

                                <Box sx={{ mb: 4 }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Second Unit Weight"
                                                size="small"
                                                name="second_unit_weight"
                                                value={productInfo.second_unit_weight}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Second Unit Price"
                                                size="small"
                                                name="second_unit_price"
                                                type="number"
                                                value={productInfo.second_unit_price}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Second Unit Original Price"
                                                size="small"
                                                name="second_unit_original_price"
                                                type="number"
                                                value={productInfo.second_unit_original_price}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Second Unit Discount"
                                                size="small"
                                                name="second_unit_discount"
                                                value={productInfo.second_unit_discount}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Total Second Unit"
                                                size="small"
                                                name="total_second_unit"
                                                value={productInfo.total_second_unit}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Button
                                                component="label"
                                                variant="contained"
                                                startIcon={<CloudUploadIcon />}
                                                sx={{ mb: 2 }}
                                            >
                                                Upload Second Unit Image
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    name="second_unit_image"
                                                    onChange={handleFileChange}
                                                />
                                            </Button>
                                            {productInfo.second_unit_image && (
                                                <Box sx={{ mt: 2 }}>
                                                    <img
                                                        src={typeof productInfo.second_unit_image === 'string' ? productInfo.second_unit_image : URL.createObjectURL(productInfo.second_unit_image)}
                                                        alt="Second Unit"
                                                        style={{ width: '100px', height: '100px' }}
                                                    />
                                                </Box>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Divider sx={{ my: 4 }}>
                                    <Chip label="3rd Unit Details" />
                                </Divider>

                                <Box sx={{ mb: 4 }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Third Unit Weight"
                                                size="small"
                                                name="third_unit_weight"
                                                value={productInfo.third_unit_weight}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Third Unit Price"
                                                size="small"
                                                name="third_unit_price"
                                                type="number"
                                                value={productInfo.third_unit_price}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Third Unit Original Price"
                                                size="small"
                                                name="third_unit_original_price"
                                                type="number"
                                                value={productInfo.third_unit_original_price}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Third Unit Discount"
                                                size="small"
                                                name="third_unit_discount"
                                                value={productInfo.third_unit_discount}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Total Third Unit"
                                                size="small"
                                                name="total_third_unit"
                                                value={productInfo.total_third_unit}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Button
                                                component="label"
                                                variant="contained"
                                                startIcon={<CloudUploadIcon />}
                                                sx={{ mb: 2 }}
                                            >
                                                Upload Third Unit Image
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    name="third_unit_image"
                                                    onChange={handleFileChange}
                                                />
                                            </Button>
                                            {productInfo.third_unit_image && (
                                                <Box sx={{ mt: 2 }}>
                                                    <img
                                                        src={typeof productInfo.third_unit_image === 'string' ? productInfo.third_unit_image : URL.createObjectURL(productInfo.third_unit_image)}
                                                        alt="Second Unit"
                                                        style={{ width: '100px', height: '100px' }}
                                                    />
                                                </Box>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Divider sx={{ my: 4 }}>
                                    <Chip label="Product Extra Image Upload Section" />
                                </Divider>

                                <Box sx={{ mb: 4 }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <Button
                                                component="label"
                                                variant="contained"
                                                startIcon={<CloudUploadIcon />}
                                                sx={{ mb: 2 }}
                                            >
                                                Upload Product Image One
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    name="product_image_one"
                                                    onChange={handleFileChange}
                                                />
                                            </Button>
                                            {productInfo.product_image_one && (
                                                <Box sx={{ mt: 2 }}>
                                                    <img
                                                        src={typeof productInfo.product_image_one === 'string' ? productInfo.product_image_one : URL.createObjectURL(productInfo.product_image_one)}
                                                        alt="Second Unit"
                                                        style={{ width: '100px', height: '100px' }}
                                                    />
                                                </Box>
                                            )}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Button
                                                component="label"
                                                variant="contained"
                                                startIcon={<CloudUploadIcon />}
                                                sx={{ mb: 2 }}
                                            >
                                                Upload Product Image Two
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    name="product_image_two"
                                                    onChange={handleFileChange}
                                                />
                                            </Button>
                                            {productInfo.product_image_two && (
                                                <Box sx={{ mt: 2 }}>
                                                    <img
                                                        src={typeof productInfo.product_image_two === 'string' ? productInfo.product_image_two : URL.createObjectURL(productInfo.product_image_two)}
                                                        alt="Second Unit"
                                                        style={{ width: '100px', height: '100px' }}
                                                    />
                                                </Box>
                                            )}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Button
                                                component="label"
                                                variant="contained"
                                                startIcon={<CloudUploadIcon />}
                                                sx={{ mb: 2 }}
                                            >
                                                Upload Product Image Three
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    name="product_image_three"
                                                    onChange={handleFileChange}
                                                />
                                            </Button>
                                            {productInfo.product_image_three && (
                                                <Box sx={{ mt: 2 }}>
                                                    <img
                                                        src={typeof productInfo.product_image_three === 'string' ? productInfo.product_image_three : URL.createObjectURL(productInfo.product_image_three)}
                                                        alt="Second Unit"
                                                        style={{ width: '100px', height: '100px' }}
                                                    />
                                                </Box>
                                            )}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Button
                                                component="label"
                                                variant="contained"
                                                startIcon={<CloudUploadIcon />}
                                                sx={{ mb: 2 }}
                                            >
                                                Upload Product Image Four
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    name="product_image_four"
                                                    onChange={handleFileChange}
                                                />
                                            </Button>
                                            {productInfo.product_image_four && (
                                                <Box sx={{ mt: 2 }}>
                                                    <img
                                                        src={typeof productInfo.product_image_four === 'string' ? productInfo.product_image_four : URL.createObjectURL(productInfo.product_image_four)}
                                                        alt="Second Unit"
                                                        style={{ width: '100px', height: '100px' }}
                                                    />
                                                </Box>
                                            )}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Button
                                                component="label"
                                                variant="contained"
                                                startIcon={<CloudUploadIcon />}
                                                sx={{ mb: 2 }}
                                            >
                                                Upload Product Image Five
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    name="product_image_five"
                                                    onChange={handleFileChange}
                                                />
                                            </Button>
                                            {productInfo.product_image_five && (
                                                <Box sx={{ mt: 2 }}>
                                                    <img
                                                        src={typeof productInfo.product_image_five === 'string' ? productInfo.product_image_five : URL.createObjectURL(productInfo.product_image_five)}
                                                        alt="Second Unit"
                                                        style={{ width: '100px', height: '100px' }}
                                                    />
                                                </Box>
                                            )}
                                        </Grid>
                                        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Button
                                                component="label"
                                                variant="contained"
                                                startIcon={<CloudUploadIcon />}
                                                sx={{
                                                    mb: 2,
                                                    display: 'flex',
                                                    alignItems: 'center', // Aligns the text and icon on the same line
                                                }}
                                            >
                                                Upload Extra Product Image
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    name="product_extra_image"
                                                    onChange={handleFileChange}
                                                />
                                            </Button>
                                            {productInfo.product_extra_image && (
                                                <Box sx={{ mt: 2 }}>
                                                    <img
                                                        src={typeof productInfo.product_extra_image === 'string' ? productInfo.product_extra_image : URL.createObjectURL(productInfo.product_extra_image)}
                                                        alt="Product Extra"
                                                        style={{ width: '100px', height: '100px' }}
                                                    />
                                                </Box>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Divider sx={{ marginY: 1 }} />
                               <ActionButtons
                                    handleCancel={handleCancelClick}
                                    handleSubmit={handleSubmit}
                                    loading={loading}
                                    submitLabel="Update Product Information"
                                />
                            </form>
                        </CardContent>
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default UpdateProductInformationPage;
