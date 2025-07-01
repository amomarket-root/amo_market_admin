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
import axios from "axios";
import { Chip } from "@mui/material";

// Reusable components
import PageHeader from "../../Form/PageHeader";
import ActionButtons from "../../Form/ActionButtons";
import { useSnackbar } from '../../Template/SnackbarAlert';
import { useSweetAlert } from "../../Template/SweetAlert";

const AddSecurityPage = () => {
    const navigate = useNavigate();
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();
    const [title, setTitle] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [contentSections, setContentSections] = useState([{ content: '' }]);
    const [imagePath, setImagePath] = useState("/image/no_image.webp");
    const [imageFile, setImageFile] = useState(null);
    const [isActive, setIsActive] = useState(true);

    const [titleError, setTitleError] = useState('');
    const [introductionError, setIntroductionError] = useState('');
    const [contentError, setContentError] = useState('');
    const [imageError, setImageError] = useState('');

    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleCancelClick = () => {
        navigate("/security");
    };

    const handleSubmit = () => {
        setTitleError('');
        setIntroductionError('');
        setContentError('');
        setImageError('');
        setLoading(true);

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('introduction', introduction);
        contentSections.forEach((section, index) => {
            formData.append(`content_sections[${index}][content]`, section.content);
        });
        if (imageFile) {
            formData.append('image_file', imageFile);
        }
        formData.append('is_active', isActive ? '1' : '0');

        axios.post(`${apiUrl}/admin/security_pages/create_security_page`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                const securityPageData = response.data;
                showSnackbar(securityPageData.message, { severity: 'success' });
                setTimeout(() => {
                    setLoading(false);
                    navigate("/security");
                }, 2000);
            })
            .catch(error => {
                setLoading(false);
                if (error.response) {
                    if (error.response.data && error.response.data.errors) {
                        if (error.response.data.errors.title) {
                            setTitleError(error.response.data.errors.title[0]);
                        }
                        if (error.response.data.errors.introduction) {
                            setIntroductionError(error.response.data.errors.introduction[0]);
                        }
                        if (error.response.data.errors.content_sections) {
                            setContentError(error.response.data.errors.content_sections[0]);
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

    const handleContentChange = (index, value) => {
        const newContentSections = [...contentSections];
        newContentSections[index].content = value;
        setContentSections(newContentSections);
    };

    const addContentField = () => {
        setContentSections([...contentSections, { content: '' }]);
    };

    const removeContentField = (index) => {
        if (contentSections.length > 1) {
            const newContentSections = contentSections.filter((_, i) => i !== index);
            setContentSections(newContentSections);
        }
    };

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
                        <PageHeader title="Add Security Page" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 1 }} />
                        <Grid container spacing={2} sx={{ marginBottom: 1 }}>
                            <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", marginTop: 2 }}>
                                <Box sx={{ width: "100%", textAlign: "center" }}>
                                    <Divider sx={{ width: "100%", my: 2 }}>
                                        <Chip label="Security Page Image" />
                                    </Divider>
                                </Box>
                                <img
                                    src={imagePath}
                                    alt="Security Page"
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
                                            Introduction :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Introduction"
                                            variant="outlined"
                                            multiline
                                            rows={3}
                                            fullWidth
                                            value={introduction}
                                            onChange={(e) => setIntroduction(e.target.value)}
                                            error={!!introductionError}
                                            helperText={introductionError}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Content Sections:
                                        </InputLabel>
                                        {contentSections.map((section, index) => (
                                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <TextField
                                                    placeholder={`Content section ${index + 1}`}
                                                    variant="outlined"
                                                    multiline
                                                    rows={3}
                                                    fullWidth
                                                    value={section.content}
                                                    onChange={(e) => handleContentChange(index, e.target.value)}
                                                    error={!!contentError && index === 0}
                                                    helperText={index === 0 ? contentError : ''}
                                                />
                                                {contentSections.length > 1 && (
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        sx={{ ml: 1, height: '56px' }}
                                                        onClick={() => removeContentField(index)}
                                                    >
                                                        Remove
                                                    </Button>
                                                )}
                                            </Box>
                                        ))}
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={addContentField}
                                        >
                                            Add Another Section
                                        </Button>
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
                            handleSubmit={handleSubmit}
                            loading={loading}
                            submitLabel="Add Security Page"
                        />
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default AddSecurityPage;
