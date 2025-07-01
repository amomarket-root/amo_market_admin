import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { Box, Paper, Grid, Divider, CircularProgress, TextField, InputLabel } from "@mui/material";
import PageHeader from "../../Form/PageHeader";
import ActionButtons from "../../Form/ActionButtons";
import Typography from "@mui/material/Typography";
import { useSnackbar } from '../../Template/SnackbarAlert';
import { useSweetAlert } from "../../Template/SweetAlert";;

const UpdatePrivilegePage = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const { privilegeId } = useParams();
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();

    // Form state
    const [privilegeGetId, setPrivilegeGetId] = useState("");
    const [prefixPrivilegeName, setPrefixPrivilegeName] = useState("");
    const [suffixPrivilegeName, setSuffixPrivilegeName] = useState("");
    const [prefixDescription, setPrefixDescription] = useState("");
    const [suffixDescription, setSuffixDescription] = useState("");

    // Error state
    const [prefixPrivilegeNameError, setPrefixPrivilegeNameError] = useState("");
    const [suffixPrivilegeNameError, setSuffixPrivilegeNameError] = useState("");
    const [prefixDescriptionError, setPrefixDescriptionError] = useState("");
    const [suffixDescriptionError, setSuffixDescriptionError] = useState("");

    // UI state
    const [loading, setLoading] = useState(false);

    const handleBackClick = () => navigate(-1);
    const handleCancelClick = () => navigate("/privilege");

    const handleSubmit = () => {
        // Reset errors
        setPrefixPrivilegeNameError("");
        setSuffixPrivilegeNameError("");
        setPrefixDescriptionError("");
        setSuffixDescriptionError("");
        setLoading(true);

        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("privilege_id", privilegeGetId);
        formData.append("prefix_privilege_name", prefixPrivilegeName);
        formData.append("suffix_privilege_name", suffixPrivilegeName);
        formData.append("prefix_description", prefixDescription);
        formData.append("suffix_description", suffixDescription);

        axios
            .post(`${apiUrl}/admin/privilege/update_privilege`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                const privilegeData = response.data;
                showSnackbar(privilegeData.message, { severity: 'success' });
                setTimeout(() => {
                    setLoading(false);
                    navigate("/privilege");
                }, 2000);
            })
            .catch((error) => {
                setLoading(false);
                if (error.response) {
                    if (error.response.data?.errors) {
                        const errors = error.response.data.errors;
                        if (errors.prefix_privilege_name) setPrefixPrivilegeNameError(errors.prefix_privilege_name[0]);
                        if (errors.suffix_privilege_name) setSuffixPrivilegeNameError(errors.suffix_privilege_name[0]);
                        if (errors.prefix_description) setPrefixDescriptionError(errors.prefix_description[0]);
                        if (errors.suffix_description) setSuffixDescriptionError(errors.suffix_description[0]);
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

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            setLoading(true);
            try {
                const response = await axios.put(
                    `${apiUrl}/admin/privilege/find_privilege`,
                    qs.stringify({ id: privilegeId }),
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    }
                );
                const privilegeData = response.data.data;
                setPrivilegeGetId(privilegeData.privilege_id);
                setPrefixPrivilegeName(privilegeData.prefix_privilege_name);
                setSuffixPrivilegeName(privilegeData.suffix_privilege_name);
                setPrefixDescription(privilegeData.prefix_description);
                setSuffixDescription(privilegeData.suffix_description);
            } catch (error) {
                showAlert({
                        title: "Error!",
                        text: "Failed to fetch privilege data. Please try again later.",
                        icon: "error",
                    });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [privilegeId, apiUrl]);

    return (
        <Box sx={{ display: "flex" }}>
            <Paper elevation={10} sx={{ width: "100%", overflow: "hidden", padding: "4px", borderRadius: "10px" }}>
                {loading && (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                        <CircularProgress />
                    </Box>
                )}

                {!loading && (
                    <Grid>
                        <PageHeader title="Update Privilege" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 1 }} />

                        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                            <Grid item xs={12} md={12}>
                                <Grid container spacing={2} sx={{ marginBottom: 3, justifyContent: 'center', alignItems: 'center' }}>
                                    <Grid item xs={12} md={5}>
                                        <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
                                            Prefix Privilege Name :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Prefix Privilege Name"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={prefixPrivilegeName}
                                            onChange={(e) => setPrefixPrivilegeName(e.target.value)}
                                            error={!!prefixPrivilegeNameError}
                                            helperText={prefixPrivilegeNameError}
                                            disabled={loading}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
                                            Suffix Privilege Name :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Suffix Privilege Name"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={suffixPrivilegeName}
                                            onChange={(e) => setSuffixPrivilegeName(e.target.value)}
                                            error={!!suffixPrivilegeNameError}
                                            helperText={suffixPrivilegeNameError}
                                            disabled={loading}
                                            InputProps={{
                                                startAdornment: <Typography variant="body1" style={{ marginRight: 8 }}> - </Typography>
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginBottom: 3, justifyContent: 'center', alignItems: 'center' }}>
                                    <Grid item xs={12} md={5}>
                                        <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
                                            Prefix Description:
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Prefix Description"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={prefixDescription}
                                            onChange={(e) => setPrefixDescription(e.target.value)}
                                            error={!!prefixDescriptionError}
                                            helperText={prefixDescriptionError}
                                            disabled={loading}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
                                            Suffix Description :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Suffix Description"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={suffixDescription}
                                            onChange={(e) => setSuffixDescription(e.target.value)}
                                            error={!!suffixDescriptionError}
                                            helperText={suffixDescriptionError}
                                            disabled={loading}
                                            InputProps={{
                                                startAdornment: <Typography variant="body1" style={{ marginRight: 8 }}> @ </Typography>
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Divider sx={{ marginY: 1 }} />
                        <ActionButtons
                            handleCancel={handleCancelClick}
                            handleSubmit={handleSubmit}
                            loading={loading}
                            submitLabel="Update Privilege"
                        />
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default UpdatePrivilegePage;
