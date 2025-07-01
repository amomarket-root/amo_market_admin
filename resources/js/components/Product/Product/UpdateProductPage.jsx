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
import { Autocomplete } from "@mui/material";
import qs from "qs";

// Reusable components
import PageHeader from "../../Form/PageHeader";
import ActionButtons from "../../Form/ActionButtons";
import { useSnackbar } from '../../Template/SnackbarAlert';
import { useSweetAlert } from "../../Template/SweetAlert";

const UpdateProductPage = () => {
    const navigate = useNavigate();
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();
    const { productId } = useParams();
    const [name, setName] = useState("");
    const [subCategoryName, setSubCategoryName] = useState("");
    const [subCategories, setSubCategories] = useState([]);
    const [aboutProduct, setAboutProduct] = useState("");
    const [weight, setWeight] = useState("");
    const [price, setPrice] = useState("");
    const [originalPrice, setOriginalPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [deliveryTime, setDeliveryTime] = useState("");
    const [unit, setUnit] = useState("");
    const [productCode, setProductCode] = useState("");
    const [status, setStatus] = useState("");
    const [image, setImage] = useState("/image/no_image.webp");
    const [imageFile, setImageFile] = useState(null);

    const [nameError, setNameError] = useState('');
    const [subCategoryNameError, setSubCategoryNameError] = useState('');
    const [aboutProductError, setAboutProductError] = useState('');
    const [weightError, setWeightError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [originalPriceError, setOriginalPriceError] = useState('');
    const [discountError, setDiscountError] = useState('');
    const [deliveryTimeError, setDeliveryTimeError] = useState('');
    const [unitError, setUnitError] = useState('');
    const [productCodeError, setProductCodeError] = useState('');
    const [statusError, setStatusError] = useState('');
    const [imageError, setImageError] = useState('');

    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const weightRanges = [
        '1 g', '2 g', '5 g', '10 g', '20 g', '25 g', '50 g', '100 g', '150 g', '200 g', '250 g', '300 g', '400 g', '500 g', '1 kg', '2 kg', '5 kg', '10 kg', '15 kg', '20 kg', '25 kg', '50 kg',
        '1 ml', '2 ml', '5 ml', '10 ml', '15 ml', '20 ml', '25 ml', '50 ml', '100 ml', '150 ml', '200 ml', '250 ml', '500 ml', '1 l', '2 l', '5 l', '10 l', '15 l', '20 l', '25 l', '50 l',
        '1 mm', '5 mm', '10 mm', '50 mm', '1 cm', '10 cm', '20 cm', '50 cm', '1 m', '2 m', '5 m', '10 m',
        '1 piece', '2 piece', '3 piece', '4 piece', '5 piece', '6 piece', '7 piece', '8 piece', '9 piece', '9 piece',
        '1 strip', '2 strip', '3 strip', '4 strip', '5 strip', '6 strip', '7 strip', '8 strip', '9 strip', '10 strip',
        'one side', 'both side', '1 packet'
    ];

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleCancelClick = () => {
        navigate("/product");
    };

    const calculateDiscount = () => {
        const sp = parseFloat(price);
        const mrp = parseFloat(originalPrice);

        // Clear previous errors
        setPriceError('');
        setOriginalPriceError('');
        setDiscountError('');

        // Check for valid numbers
        if (isNaN(sp)) {
            setPriceError("Selling Price is required and must be a number");
            setDiscount('');
            return;
        }

        if (isNaN(mrp)) {
            setOriginalPriceError("Original Price is required and must be a number");
            setDiscount('');
            return;
        }

        if (sp > mrp) {
            setPriceError("Selling Price should not be greater than Original Price");
            setDiscount('');
            return;
        }

        if (mrp <= 0) {
            setOriginalPriceError("Original Price must be greater than 0");
            setDiscount('');
            return;
        }

        // All validations passed
        const discountPercentage = ((mrp - sp) / mrp) * 100;
        const roundedDiscount = Math.round(discountPercentage);

        if (roundedDiscount > 0) {
            setDiscount(`${roundedDiscount}%`);
        } else {
            setDiscount(''); // Or null if you're storing it as a non-string
        }
    };

    const handleSubmit = () => {
        setNameError('');
        setSubCategoryNameError('');
        setAboutProductError('');
        setWeightError('');
        setPriceError('');
        setOriginalPriceError('');
        setDiscountError('');
        setDeliveryTimeError('');
        setUnitError('');
        setProductCodeError('');
        setStatusError('');
        setImageError('');
        setLoading(true);

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('product_id', productId);
        formData.append('product_name', name);
        formData.append('sub_category', subCategoryName);
        formData.append('about_product', aboutProduct);
        formData.append('product_weight', weight);
        formData.append('selling_price', price);
        formData.append('original_price', originalPrice);
        formData.append('discount', discount);
        formData.append('delivery_time', deliveryTime);
        formData.append('total_unit', unit);
        formData.append('product_code', productCode);
        formData.append('status', status);
        if (imageFile) {
            formData.append('image_file', imageFile);
        }

        axios.post(`${apiUrl}/admin/product/update_product`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                const productData = response.data;
                showSnackbar(productData.message, { severity: 'success' });
                setTimeout(() => {
                    setLoading(false);
                    navigate("/product");
                }, 2000);
            })
            .catch(error => {
                setLoading(false);
                if (error.response) {
                    if (error.response.data && error.response.data.errors) {
                        if (error.response.data.errors.product_name) {
                            setNameError(error.response.data.errors.product_name[0]);
                        }
                        if (error.response.data.errors.sub_category) {
                            setSubCategoryNameError(error.response.data.errors.sub_category[0]);
                        }
                        if (error.response.data.errors.about_product) {
                            setAboutProductError(error.response.data.errors.about_product[0]);
                        }
                        if (error.response.data.errors.product_weight) {
                            setWeightError(error.response.data.errors.product_weight[0]);
                        }
                        if (error.response.data.errors.selling_price) {
                            setPriceError(error.response.data.errors.selling_price[0]);
                        }
                        if (error.response.data.errors.original_price) {
                            setOriginalPriceError(error.response.data.errors.original_price[0]);
                        }
                        if (error.response.data.errors.discount) {
                            setDiscountError(error.response.data.errors.discount[0]);
                        }
                        if (error.response.data.errors.delivery_time) {
                            setDeliveryTimeError(error.response.data.errors.delivery_time[0]);
                        }
                        if (error.response.data.errors.total_unit) {
                            setUnitError(error.response.data.errors.total_unit[0]);
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
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.put(
                    `${apiUrl}/admin/product/find_product`,
                    qs.stringify({ id: productId }),
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }
                );
                const productData = response.data.data;
                setName(productData.name);
                setSubCategoryName(productData.sub_category_id);
                setAboutProduct(productData.about_product);
                setWeight(productData.weight);
                setPrice(productData.price);
                setOriginalPrice(productData.original_price);
                setDiscount(productData.discount);
                setDeliveryTime(productData.delivery_time);
                setUnit(productData.unit);
                setProductCode(productData.product_code);
                setStatus(productData.status);
                setImage(productData.image || "/image/no_image.webp");
            } catch (error) {
                showAlert({
                    title: "Error!",
                    text: "Error fetching product data:", error,
                    icon: "error",
                });
            }
        };

        fetchProduct();
    }, [productId, apiUrl]);

    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${apiUrl}/admin/subcategory/get_all_subcategory`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSubCategories(response.data.data);
            } catch (error) {
                showAlert({
                    title: "Error!",
                    text: "Error fetching subcategories:", error,
                    icon: "error",
                });
            }
        };

        fetchSubCategories();
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
                        <PageHeader title="Update Product" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 1 }} />
                        <Grid container spacing={2} sx={{ marginBottom: 1 }}>
                            <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", marginTop: 2 }}>
                                <img
                                    src={image}
                                    alt="Product"
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
                                            Product Name :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Product Name"
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
                                            Select SubCategory :
                                        </InputLabel>
                                        <Autocomplete
                                            options={subCategories}
                                            getOptionLabel={(option) => option.name}
                                            value={subCategories.find(subCategory => subCategory.id === subCategoryName) || null}
                                            onChange={(event, newValue) => {
                                                setSubCategoryName(newValue ? newValue.id : '');
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder="Choose SubCategory Name"
                                                    variant="outlined"
                                                    fullWidth
                                                    error={!!subCategoryNameError}
                                                    helperText={subCategoryNameError}
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
                                            About Product :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Product Description"
                                            variant="outlined"
                                            multiline
                                            rows={4}
                                            fullWidth
                                            value={aboutProduct}
                                            onChange={(e) => setAboutProduct(e.target.value)}
                                            error={!!aboutProductError}
                                            helperText={aboutProductError}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12} md={3}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Weight :
                                        </InputLabel>
                                        <Autocomplete
                                            options={weightRanges}
                                            value={weight}
                                            onChange={(event, newValue) => setWeight(newValue)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder="Select Weight"
                                                    variant="outlined"
                                                    fullWidth
                                                    error={!!weightError}
                                                    helperText={weightError}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Selling Price :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Selling Price"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            onBlur={calculateDiscount}
                                            error={!!priceError}
                                            helperText={priceError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Original Price :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Original Price"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={originalPrice}
                                            onChange={(e) => setOriginalPrice(e.target.value)}
                                            onBlur={calculateDiscount}
                                            error={!!originalPriceError}
                                            helperText={originalPriceError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Discount :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Auto Calculate Discount"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={discount}
                                            InputProps={{ readOnly: true }}
                                            error={!!discountError}
                                            helperText={discountError}
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
                                        <TextField
                                            placeholder="Enter Delivery Time"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={deliveryTime}
                                            onChange={(e) => setDeliveryTime(e.target.value)}
                                            error={!!deliveryTimeError}
                                            helperText={deliveryTimeError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Available Unit :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Available Unit"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={unit}
                                            onChange={(e) => setUnit(e.target.value)}
                                            error={!!unitError}
                                            helperText={unitError}
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
                            submitLabel="Update Product"
                        />
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default UpdateProductPage;
