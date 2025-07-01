import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { CircularProgress, Grid } from "@mui/material";

// Reusable components
import PageHeader from "../../Form/PageHeader";
import ActionButtons from "../../Form/ActionButtons";
import { useSnackbar } from '../../Template/SnackbarAlert';
import { useSweetAlert } from "../../Template/SweetAlert";

const CompareActiveLogPage = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();
    const { activeLogId } = useParams();
    const [ActiveLogAttributes, setActiveLogAttributes] = useState([]);
    const [ActiveLogOld, setActiveLogOld] = useState([]);
    const [ActiveLogData, setActiveLogData] = useState([]);
    const [logId, setLogId] = useState("");
    const [userData, setUserData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        const fetchActiveLog = () => {
            const token = localStorage.getItem("token");
            axios
                .put(
                    `${apiUrl}/admin/active_log/find_active_log`,
                    qs.stringify({ id: activeLogId }),
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    }
                )
                .then((response) => {
                    const activelogByIdData = response.data;
                    setActiveLogAttributes(activelogByIdData.data.attributes);
                    setActiveLogOld(activelogByIdData.data.old);
                    setActiveLogData(activelogByIdData.data.logs.causer_id);
                    setLogId(activelogByIdData.data.logs.id);
                })
                .catch((error) => {
                    showAlert({
                        title: "Error!",
                        text: "Error fetching active log data:" + (error || "Please try again later."),
                        icon: "error",
                    });
                }).finally(() => {
                    setLoading(false);
                });
        };

        const fetchUser = () => {
            setLoading(true);
            const token = localStorage.getItem("token");
            axios
                .get(`${apiUrl}/admin/user/fetch_all_user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const userData = response.data.data.data.map((user) => ({
                        label: user.name,
                        value: user.id,
                    }));
                    setUserData(userData);
                })
                .catch((error) => {
                    showAlert({
                        title: "Error!",
                        text: "Error fetching user data:" + (error || "Please try again later."),
                        icon: "error",
                    });
                }).finally(() => {
                    setLoading(false);
                });
        };

        fetchActiveLog();
        fetchUser();
    }, [activeLogId, apiUrl]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleCancelClick = () => {
        navigate("/active-log");
    };

    const handleUserSelect = (event, value) => {
        setSelectedUser(value);
    };

    const handleSubmit = () => {
        if (selectedUser) {
            showAlert({
                title: "Are you sure?",
                text: "This active log will be assigned to the selected user. This action cannot be undone.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, assign it!",
                cancelButtonText: "No, cancel!",
            }).then((confirmed) => {
                if (confirmed) {
                    submitData();
                }
            });
        } else {
            showAlert({
                title: "Error!",
                text: "Please choose a user or the log is already assigned.",
                icon: "error",
            });
        }
    };

    const submitData = () => {
        const token = localStorage.getItem("token");
        const formUpdateData = new FormData();
        formUpdateData.append("log_id", logId);
        formUpdateData.append("user_id", selectedUser.value); // Use selected user's ID

        setLoading(true);

        axios
            .post(
                `${apiUrl}/admin/active_log/update_active_log`,
                formUpdateData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then((response) => {
                const subCategoryUpdateData = response.data;
                showSnackbar(subCategoryUpdateData.message, { severity: 'success' });
                setTimeout(() => {
                    setLoading(false);
                    navigate("/active-log");
                }, 2000);

            })
            .catch((error) => {
                setLoading(false);
                if (error.response?.data?.message) {
                    showSnackbar(error.response.data.message, { severity: 'error' }, 2000);
                } else {
                    showAlert({
                        title: "Error!",
                        text: "Error updating active log",
                        icon: "error",
                    });
                }
                showAlert({
                    title: "Error!",
                    text: "Something went wrong.",
                    icon: "error",
                });
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
                        <PageHeader title="Compare Active Log" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 1 }} />
                        {ActiveLogData === null ? (
                            <div>
                                <Autocomplete
                                    sx={{ padding: 1.2 }}
                                    options={userData}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Choose User" />
                                    )}
                                    onChange={handleUserSelect}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: "10px",
                                    }}
                                >
                                    <Card sx={{ flex: 1, border: "1px solid #ccc" }} elevation={10}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                textAlign: "center",
                                                borderBottom: "1px solid #ccc",
                                                paddingBottom: "5px",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            Attributes
                                        </Typography>
                                        <TableContainer>
                                            <Table>
                                                <TableBody>
                                                    {Object.entries(ActiveLogAttributes).map(
                                                        ([key, value]) => (
                                                            <TableRow key={key}>
                                                                <TableCell>{key}</TableCell>
                                                                <TableCell>
                                                                    <Tooltip title={value}>
                                                                        <span>{value}</span>
                                                                    </Tooltip>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Card>
                                    <Card
                                        sx={{ flex: 1, border: "1px solid #ccc", marginLeft: "10px" }} elevation={10}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                textAlign: "center",
                                                borderBottom: "1px solid #ccc",
                                                paddingBottom: "5px",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            Old Attributes
                                        </Typography>
                                        <TableContainer>
                                            <Table>
                                                <TableBody>
                                                    {Object.entries(ActiveLogOld).map(([key, value]) => (
                                                        <TableRow key={key}>
                                                            <TableCell>{key}</TableCell>
                                                            <TableCell>
                                                                <Tooltip title={value}>
                                                                    <span>{value}</span>
                                                                </Tooltip>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Card>
                                </Box>
                            </div>
                        ) : (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "10px",
                                }}
                            >
                                <Card sx={{ flex: 1, border: "1px solid #ccc" }} elevation={10}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            textAlign: "center",
                                            borderBottom: "1px solid #ccc",
                                            paddingBottom: "5px",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        Attributes
                                    </Typography>
                                    <TableContainer>
                                        <Table>
                                            <TableBody>
                                                {Object.entries(ActiveLogAttributes).map(
                                                    ([key, value]) => (
                                                        <TableRow key={key}>
                                                            <TableCell>{key}</TableCell>
                                                            <TableCell>
                                                                <Tooltip title={value}>
                                                                    <span>{value}</span>
                                                                </Tooltip>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Card>
                                <Card
                                    sx={{ flex: 1, border: "1px solid #ccc", marginLeft: "10px" }} elevation={10}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            textAlign: "center",
                                            borderBottom: "1px solid #ccc",
                                            paddingBottom: "5px",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        Old Attributes
                                    </Typography>
                                    <TableContainer>
                                        <Table>
                                            <TableBody>
                                                {Object.entries(ActiveLogOld).map(([key, value]) => (
                                                    <TableRow key={key}>
                                                        <TableCell>{key}</TableCell>
                                                        <TableCell>
                                                            <Tooltip title={value}>
                                                                <span>{value}</span>
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Card>
                            </Box>
                        )}
                        <Divider sx={{ marginY: 2 }} />
                        <ActionButtons
                            handleCancel={handleCancelClick}
                            handleSubmit={handleSubmit}
                            loading={loading}
                            submitLabel="Update Active Log"
                        />
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default CompareActiveLogPage;
