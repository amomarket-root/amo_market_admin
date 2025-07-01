import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { Box, Paper, CircularProgress, Grid, Card, Typography, Divider, Tooltip } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import PageHeader from "../../Form/PageHeader";
import { useSweetAlert } from "../../Template/SweetAlert";

const ShareActiveLogPage = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
     const showAlert = useSweetAlert();
    const { activeLogId } = useParams();

    const [activeLogAttributes, setActiveLogAttributes] = useState([]);
    const [activeLogOld, setActiveLogOld] = useState([]);
    const [activeLogData, setActiveLogData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchActiveLog = async () => {
            setLoading(true);
            const token = localStorage.getItem("token");

            try {
                const response = await axios.put(
                    `${apiUrl}/admin/active_log/find_active_log`,
                    qs.stringify({ id: activeLogId }),
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    }
                );

                const activelogByIdData = response.data;
                setActiveLogAttributes(activelogByIdData.data.attributes);
                setActiveLogOld(activelogByIdData.data.old);
                setActiveLogData(activelogByIdData.data.logs.causer_id);
            } catch (error) {
                  showAlert({
                        title: "Error!",
                        text: "Failed to fetch active log data. Please try again later.",
                        icon: "error",
                    });
            } finally {
                setLoading(false);
            }
        };

        fetchActiveLog();
    }, [activeLogId, apiUrl]);

    const handleBackClick = () => navigate(-1);

    const renderAttributesTable = (data, title) => (
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
                {title}
            </Typography>
            <TableContainer>
                <Table>
                    <TableBody>
                        {Object.entries(data).map(([key, value]) => (
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
    );

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
                        <PageHeader title="Active Log Details" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 2 }} />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "10px",
                                flexDirection: { xs: "column", md: "row" },
                                gap: 2,
                            }}
                        >
                            {activeLogData === null ? (
                                <>
                                    {renderAttributesTable(activeLogAttributes, "Attributes")}
                                    {renderAttributesTable(activeLogOld, "Old Attributes")}
                                </>
                            ) : (
                                <>
                                    {renderAttributesTable(activeLogAttributes, "Attributes")}
                                    <Box sx={{ width: { xs: "100%", md: "10px" } }} />
                                    {renderAttributesTable(activeLogOld, "Old Attributes")}
                                </>
                            )}
                        </Box>
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default ShareActiveLogPage;
