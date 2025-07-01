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
import { Chip, Switch, FormControlLabel } from "@mui/material";
import qs from "qs";

// Reusable components
import PageHeader from "../../Form/PageHeader";
import ActionButtons from "../../Form/ActionButtons";
import { useSnackbar } from '../../Template/SnackbarAlert';
import { useSweetAlert } from "../../Template/SweetAlert";

const UpdateCareerPage = () => {
    const navigate = useNavigate();
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();
    const { careerId } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('careers.amomarket@gmail.com');
    const [benefits, setBenefits] = useState(['']);
    const [sortOrder, setSortOrder] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [imagePath, setImagePath] = useState("/image/no_image.webp");
    const [imageFile, setImageFile] = useState(null);

    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [benefitsError, setBenefitsError] = useState('');
    const [imageError, setImageError] = useState('');

    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleCancelClick = () => {
        navigate("/career");
    };

    const handleUpdate = () => {
        setTitleError('');
        setDescriptionError('');
        setEmailError('');
        setBenefitsError('');
        setImageError('');
        setLoading(true);

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('id', careerId);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('email', email);
        benefits.forEach((item, index) => {
            formData.append(`benefits[${index}]`, item);
        });
        formData.append('sort_order', sortOrder);
        formData.append('is_active', isActive ? '1' : '0');

        if (imageFile) {
            formData.append('image_file', imageFile);
        }

        axios.post(`${apiUrl}/admin/careers/update_career`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                const careerData = response.data;
                showSnackbar(careerData.message, { severity: 'success' });
                setTimeout(() => {
                    setLoading(false);
                    navigate("/career");
                }, 2000);
            })
            .catch(error => {
                setLoading(false);
                if (error.response) {
                    if (error.response.data && error.response.data.errors) {
                        if (error.response.data.errors.title) {
                            setTitleError(error.response.data.errors.title[0]);
                        }
                        if (error.response.data.errors.description) {
                            setDescriptionError(error.response.data.errors.description[0]);
                        }
                        if (error.response.data.errors.email) {
                            setEmailError(error.response.data.errors.email[0]);
                        }
                        if (error.response.data.errors.benefits) {
                            setBenefitsError(error.response.data.errors.benefits[0]);
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

    const handleBenefitChange = (index, value) => {
        const newBenefits = [...benefits];
        newBenefits[index] = value;
        setBenefits(newBenefits);
    };

    const addBenefitField = () => {
        setBenefits([...benefits, '']);
    };

    const removeBenefitField = (index) => {
        if (benefits.length > 1) {
            const newBenefits = benefits.filter((_, i) => i !== index);
            setBenefits(newBenefits);
        }
    };

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('token');
        axios.put(
            `${apiUrl}/admin/careers/find_career`,
            qs.stringify({ id: careerId }),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
            .then((response) => {
                const careerData = response.data.data;
                setTitle(careerData.title);
                setDescription(careerData.description);
                setEmail(careerData.email);
                setBenefits(careerData.benefits ? JSON.parse(careerData.benefits) : ['']);
                setSortOrder(careerData.sort_order);
                setIsActive(careerData.is_active);
                setImagePath(careerData.image_path ?? "/image/no_image.webp");
                setLoading(false);
            })
            .catch((error) => {
                showAlert({
                    title: "Error!",
                    text: "Error fetching career data: " + error.message,
                    icon: "error",
                });
                setLoading(false);
            });
    }, [careerId, apiUrl]);

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
                        <PageHeader title="Update Career Opportunity" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 1 }} />
                        <Grid container spacing={2} sx={{ marginBottom: 1 }}>
                            <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", marginTop: 2 }}>
                                <Box sx={{ width: "100%", textAlign: "center" }}>
                                    <Divider sx={{ width: "100%", my: 2 }}>
                                        <Chip label="Career Image" />
                                    </Divider>
                                </Box>
                                <img
                                    src={imagePath}
                                    alt="Career"
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
                                            multiline
                                            rows={3}
                                            fullWidth
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            error={!!descriptionError}
                                            helperText={descriptionError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Contact Email :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Email"
                                            variant="outlined"
                                            type="email"
                                            fullWidth
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            error={!!emailError}
                                            helperText={emailError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Sort Order :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Sort Order"
                                            variant="outlined"
                                            type="number"
                                            fullWidth
                                            value={sortOrder}
                                            onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={isActive}
                                                    onChange={(e) => setIsActive(e.target.checked)}
                                                    color="success"
                                                />
                                            }
                                            label="Active"
                                            labelPlacement="start"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Benefits:
                                        </InputLabel>
                                        {benefits.map((benefit, index) => (
                                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <TextField
                                                    placeholder={`Benefit ${index + 1}`}
                                                    variant="outlined"
                                                    fullWidth
                                                    value={benefit}
                                                    onChange={(e) => handleBenefitChange(index, e.target.value)}
                                                    error={!!benefitsError && index === 0}
                                                    helperText={index === 0 ? benefitsError : ''}
                                                />
                                                {benefits.length > 1 && (
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        sx={{ ml: 1, height: '56px' }}
                                                        onClick={() => removeBenefitField(index)}
                                                    >
                                                        Remove
                                                    </Button>
                                                )}
                                            </Box>
                                        ))}
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={addBenefitField}
                                        >
                                            Add Another Benefit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider sx={{ marginY: 2 }} />
                        <ActionButtons
                            handleCancel={handleCancelClick}
                            handleSubmit={handleUpdate}
                            loading={loading}
                            submitLabel="Update Career"
                        />
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default UpdateCareerPage;
