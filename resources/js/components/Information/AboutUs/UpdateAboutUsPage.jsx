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
import { Chip } from "@mui/material";
import qs from "qs";

// Reusable components
import PageHeader from "../../Form/PageHeader";
import ActionButtons from "../../Form/ActionButtons";
import { useSnackbar } from '../../Template/SnackbarAlert';
import { useSweetAlert } from "../../Template/SweetAlert";

const UpdateAboutUsPage = () => {
    const navigate = useNavigate();
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();
    const { aboutUsId } = useParams();
    const [title, setTitle] = useState('About Us');
    const [content, setContent] = useState(['']);
    const [imagePath, setImagePath] = useState("/image/no_image2.png");
    const [imageFile, setImageFile] = useState(null);

    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const [imageError, setImageError] = useState('');

    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleCancelClick = () => {
        navigate("/about-us");
    };

    const handleUpdate = () => {
        setTitleError('');
        setContentError('');
        setImageError('');
        setLoading(true);

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('id', aboutUsId);
        formData.append('title', title);
        content.forEach((item, index) => {
            formData.append(`content[${index}]`, item);
        });

        if (imageFile) {
            formData.append('image_file', imageFile);
        }

        axios.post(`${apiUrl}/admin/about_us/update_about_us`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                const aboutUsData = response.data;
                showSnackbar(aboutUsData.message, { severity: 'success' });
                setTimeout(() => {
                    setLoading(false);
                    navigate("/about-us");
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
        const newContent = [...content];
        newContent[index] = value;
        setContent(newContent);
    };

    const addContentField = () => {
        setContent([...content, '']);
    };

    const removeContentField = (index) => {
        if (content.length > 1) {
            const newContent = content.filter((_, i) => i !== index);
            setContent(newContent);
        }
    };

    useEffect(() => {
        // Fetch about us data based on aboutUsId
        setLoading(true);
        const token = localStorage.getItem('token');
        axios.put(
            `${apiUrl}/admin/about_us/find_about_us`,
            qs.stringify({ id: aboutUsId }),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
            .then((response) => {
                const aboutUsData = response.data.data;
                setTitle(aboutUsData.title);
                setContent(JSON.parse(aboutUsData.content));
                setImagePath(aboutUsData.image_path ?? "/image/no_image.webp");
                setLoading(false);
            })
            .catch((error) => {
                showAlert({
                    title: "Error!",
                    text: "Error fetching about us data: " + error.message,
                    icon: "error",
                });
                setLoading(false);
            });
    }, [aboutUsId, apiUrl]);

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
                        <PageHeader title="Update About Us" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 1 }} />
                        <Grid container spacing={2} sx={{ marginBottom: 1 }}>
                            <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", marginTop: 2 }}>
                                <Box sx={{ width: "100%", textAlign: "center" }}>
                                    <Divider sx={{ width: "100%", my: 2 }}>
                                        <Chip label="About Us Image" />
                                    </Divider>
                                </Box>
                                <img
                                    src={imagePath}
                                    alt="About Us"
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
                                            Content Sections:
                                        </InputLabel>
                                        {content.map((section, index) => (
                                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <TextField
                                                    placeholder={`Content section ${index + 1}`}
                                                    variant="outlined"
                                                    multiline
                                                    rows={3}
                                                    fullWidth
                                                    value={section}
                                                    onChange={(e) => handleContentChange(index, e.target.value)}
                                                    error={!!contentError && index === 0}
                                                    helperText={index === 0 ? contentError : ''}
                                                />
                                                {content.length > 1 && (
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

                            </Grid>
                        </Grid>
                        <Divider sx={{ marginY: 2 }} />
                        <ActionButtons
                            handleCancel={handleCancelClick}
                            handleSubmit={handleUpdate}
                            loading={loading}
                            submitLabel="Update About Us"
                        />
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default UpdateAboutUsPage;
