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

const UpdatePrivacyPolicyPage = () => {
    const navigate = useNavigate();
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();
    const { privacyPolicyId } = useParams();
    const [title, setTitle] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [sections, setSections] = useState([{ title: '', content: '' }]);
    const [companyDescription, setCompanyDescription] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [imagePath, setImagePath] = useState("/image/no_image.webp");
    const [imageFile, setImageFile] = useState(null);

    const [titleError, setTitleError] = useState('');
    const [introductionError, setIntroductionError] = useState('');
    const [sectionsError, setSectionsError] = useState('');
    const [companyDescriptionError, setCompanyDescriptionError] = useState('');
    const [imageError, setImageError] = useState('');

    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleCancelClick = () => {
        navigate("/privacy-policy");
    };

    const handleUpdate = () => {
        setTitleError('');
        setIntroductionError('');
        setSectionsError('');
        setCompanyDescriptionError('');
        setImageError('');
        setLoading(true);

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('id', privacyPolicyId);
        formData.append('title', title);
        formData.append('introduction', introduction);
        sections.forEach((section, index) => {
            formData.append(`sections[${index}][title]`, section.title);
            formData.append(`sections[${index}][content]`, section.content);
        });
        formData.append('company_description', companyDescription);
        formData.append('is_active', isActive ? '1' : '0');

        if (imageFile) {
            formData.append('image_file', imageFile);
        }

        axios.post(`${apiUrl}/admin/privacy_policy/update_privacy_policy`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                const privacyPolicyData = response.data;
                showSnackbar(privacyPolicyData.message, { severity: 'success' });
                setTimeout(() => {
                    setLoading(false);
                    navigate("/privacy-policy");
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
                        if (error.response.data.errors.sections) {
                            setSectionsError(error.response.data.errors.sections[0]);
                        }
                        if (error.response.data.errors.company_description) {
                            setCompanyDescriptionError(error.response.data.errors.company_description[0]);
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

    const handleSectionChange = (index, field, value) => {
        const newSections = [...sections];
        newSections[index][field] = value;
        setSections(newSections);
    };

    const addSection = () => {
        setSections([...sections, { title: '', content: '' }]);
    };

    const removeSection = (index) => {
        if (sections.length > 1) {
            const newSections = sections.filter((_, i) => i !== index);
            setSections(newSections);
        }
    };

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('token');
        axios.put(
            `${apiUrl}/admin/privacy_policy/find_privacy_policy`,
            qs.stringify({ id: privacyPolicyId }),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
            .then((response) => {
                const privacyPolicyData = response.data.data;
                setTitle(privacyPolicyData.title);
                setIntroduction(privacyPolicyData.introduction);
                setSections(privacyPolicyData.sections ? JSON.parse(privacyPolicyData.sections) : [{ title: '', content: '' }]);
                setCompanyDescription(privacyPolicyData.company_description);
                setIsActive(privacyPolicyData.is_active);
                setImagePath(privacyPolicyData.image_path || "/image/privacy.webp");
                setLoading(false);
            })
            .catch((error) => {
                showAlert({
                    title: "Error!",
                    text: "Error fetching privacy policy data: " + error.message,
                    icon: "error",
                });
                setLoading(false);
            });
    }, [privacyPolicyId, apiUrl]);

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
                        <PageHeader title="Update Privacy Policy" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 1 }} />
                        <Grid container spacing={2} sx={{ marginBottom: 1 }}>
                            <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", marginTop: 2 }}>
                                <Box sx={{ width: "100%", textAlign: "center" }}>
                                    <Divider sx={{ width: "100%", my: 2 }}>
                                        <Chip label="Privacy Policy Image" />
                                    </Divider>
                                </Box>
                                <img
                                    src={imagePath}
                                    alt="Privacy Policy"
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
                                    <Grid item xs={12}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Company Description :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Company Description"
                                            variant="outlined"
                                            multiline
                                            rows={3}
                                            fullWidth
                                            value={companyDescription}
                                            onChange={(e) => setCompanyDescription(e.target.value)}
                                            error={!!companyDescriptionError}
                                            helperText={companyDescriptionError}
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
                                            Policy Sections:
                                        </InputLabel>
                                        {sections.map((section, index) => (
                                            <Box key={index} sx={{ mb: 3, border: '1px solid #ddd', borderRadius: '8px', p: 2 }}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            label={`Section ${index + 1} Title`}
                                                            variant="outlined"
                                                            fullWidth
                                                            value={section.title}
                                                            onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                                                            error={!!sectionsError && index === 0}
                                                            helperText={index === 0 ? sectionsError : ''}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            label={`Section ${index + 1} Content`}
                                                            variant="outlined"
                                                            multiline
                                                            rows={4}
                                                            fullWidth
                                                            value={section.content}
                                                            onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {sections.length > 1 && (
                                                        <Grid item xs={12}>
                                                            <Button
                                                                variant="outlined"
                                                                color="error"
                                                                fullWidth
                                                                onClick={() => removeSection(index)}
                                                            >
                                                                Remove Section
                                                            </Button>
                                                        </Grid>
                                                    )}
                                                </Grid>
                                            </Box>
                                        ))}
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={addSection}
                                            fullWidth
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
                            submitLabel="Update Privacy Policy"
                        />
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default UpdatePrivacyPolicyPage;
