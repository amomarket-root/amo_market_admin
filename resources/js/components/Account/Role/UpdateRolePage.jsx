import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Paper, Grid, Divider, CircularProgress, Card, CardContent } from "@mui/material";
import axios from "axios";
import qs from "qs";

// Reusable components
import PageHeader from "../../Form/PageHeader";
import ActionButtons from "../../Form/ActionButtons";
import { useSnackbar } from '../../Template/SnackbarAlert';
import { useSweetAlert } from "../../Template/SweetAlert";

// Form components
import { InputLabel, TextField, MenuItem, Checkbox, Typography } from "@mui/material";

const UpdateRolePage = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const { roleId } = useParams();
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();

    const [id, setId] = useState(null);
    const [scoreCount, setScoreCount] = useState(0);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [roles, setRoles] = useState([]);
    const [rows, setRows] = useState([]);

    const [nameError, setNameError] = useState("");
    const [roleError, setRoleError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRoles = async () => {
            setLoading(true);
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`${apiUrl}/admin/role/fetch_all_role`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRoles(response.data.data.data);
            } catch (error) {
                if (error.response?.data?.message) {
                    showAlert({
                        title: "Error!",
                        text: error.response.data.message,
                        icon: "error",
                    });
                } else {
                    showAlert({
                        title: "Error!",
                        text: "Failed to fetch roles",
                        icon: "error",
                    });
                }
            } finally {
                setLoading(false);
            }
        };
        fetchRoles();
    }, [apiUrl, showAlert]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await axios.put(
                    `${apiUrl}/admin/role/find_role`,
                    qs.stringify({ id: roleId }),
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    }
                );

                const data = response.data.data;
                setScoreCount(data.totalChecked);
                setRows(data.privileges);
                setId(data.role.id);
                setName(data.role.name);
                setRole(data.role.parent_id);
            } catch (error) {
                showAlert({
                    title: "Error!",
                    text: "Failed to fetch role data:" + (error || "Please try again later."),
                    icon: "error",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [roleId, apiUrl]);

    const fetchPrivilegesByRole = (roleId) => {
        setLoading(true);
        const token = localStorage.getItem("token");
        axios
            .get(`${apiUrl}/admin/role/find_privileges?id=${roleId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const privilegeData = response.data.data;
                setScoreCount(response.data.totalChecked);
                setRows(privilegeData);
            })
            .catch((error) => {
                 showAlert({
                    title: "Error!",
                    text: "Failed to fetch role privileges:" + (error || "Please try again later."),
                    icon: "error",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleBackClick = () => navigate(-1);
    const handleCancelClick = () => navigate("/role");

    const handleSubmit = () => {
        setNameError("");
        setRoleError("");
        setLoading(true);

        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("id", id);
        formData.append("name", name);
        formData.append("parent_id", role);
        formData.append("score_count", scoreCount);

        const checkedPrivileges = [];
        Object.keys(rows).forEach((group) => {
            rows[group].forEach((privilege) => {
                if (privilege.checked === 1) {
                    checkedPrivileges.push(privilege.id);
                }
            });
        });
        formData.append("privileges", JSON.stringify(checkedPrivileges));

        axios
            .post(`${apiUrl}/admin/role/update_role`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                const userData = response.data;
                showSnackbar(userData.message, { severity: 'success' });
                setTimeout(() => {
                    setLoading(false);
                    navigate("/role");
                }, 2000);
            })
            .catch((error) => {
                setLoading(false);
                if (error.response) {
                    if (error.response.data?.errors) {
                        const errors = error.response.data.errors;
                        if (errors.name) setNameError(errors.name[0]);
                        if (errors.parent_id) setRoleError(errors.parent_id[0]);
                    } else if (error.response.data?.message) {
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

    const handleCheckboxChange = (group, privilegeId) => {
        setRows((prevRows) => {
            const updatedRows = { ...prevRows };
            const privilegeIndex = updatedRows[group].findIndex(
                (privilege) => privilege.id === privilegeId
            );
            if (privilegeIndex !== -1) {
                const updatedPrivilege = { ...updatedRows[group][privilegeIndex] };
                updatedPrivilege.checked = updatedPrivilege.checked === 1 ? 0 : 1;
                updatedRows[group][privilegeIndex] = updatedPrivilege;

                setScoreCount((prevCount) =>
                    updatedPrivilege.checked === 1 ? prevCount + 1 : prevCount - 1
                );
            }
            return updatedRows;
        });
    };

    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;

        if (selectedRole === role) return;

        showAlert({
            title: "Override Selected Privileges",
            text: "Selecting a new role will override your previously selected privileges. Do you want to continue?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, proceed",
            cancelButtonText: "Cancel"
        }).then((confirmed) => {
            if (confirmed) {
                setRole(selectedRole);
                fetchPrivilegesByRole(selectedRole);
            }
        });
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
                        <PageHeader title="Update Role" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 1 }} />

                        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                            <Grid item xs={12}>
                                <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                                    <Grid item xs={12} md={4}>
                                        <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
                                            Name :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Role Name"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            error={!!nameError}
                                            helperText={nameError}
                                            disabled={loading}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
                                            Parent Role :
                                        </InputLabel>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Select Parent Role"
                                            value={role}
                                            onChange={handleRoleChange}
                                            error={Boolean(roleError)}
                                            helperText={roleError}
                                            disabled={loading}
                                        >
                                            {roles.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
                                            Role Score:
                                        </InputLabel>
                                        <TextField
                                            placeholder="Role Score Count"
                                            type="number"
                                            variant="outlined"
                                            fullWidth
                                            value={scoreCount}
                                            InputProps={{ readOnly: true }}
                                            disabled={loading}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    {Object.keys(rows).map((group) => (
                                        <Grid item xs={12} md={3} key={group}>
                                            <Card elevation={5}>
                                                <CardContent>
                                                    <Typography
                                                        variant="body1"
                                                        component="div"
                                                        sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                                    >
                                                        {group}
                                                    </Typography>
                                                    <Divider sx={{ marginY: 1 }} />
                                                    {rows[group].map((privilege) => (
                                                        <Box
                                                            key={privilege.id}
                                                            display="flex"
                                                            alignItems="center"
                                                        >
                                                            <Checkbox
                                                                checked={privilege.checked === 1}
                                                                onChange={() =>
                                                                    handleCheckboxChange(group, privilege.id)
                                                                }
                                                                disabled={loading}
                                                            />
                                                            <Typography>{privilege.name}</Typography>
                                                        </Box>
                                                    ))}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>

                        <Divider sx={{ marginY: 2 }} />
                        <ActionButtons
                            handleCancel={handleCancelClick}
                            handleSubmit={handleSubmit}
                            loading={loading}
                            submitLabel="Update Role"
                        />
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default UpdateRolePage;
