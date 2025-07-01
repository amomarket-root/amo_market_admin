import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import qs from "qs";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useSweetAlert } from "./SweetAlert";
import IconButton from '@mui/material/IconButton';
import { Grid, Card, CardContent } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useTheme as useCustomTheme } from "./ThemeContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : "#efebf2",
    color: theme.palette.mode === 'dark' ? theme.palette.common.white : "black",
    fontSize: "14px",
    fontWeight: "bold",
    "&:first-of-type": {
        borderTopLeftRadius: "5px",
        borderBottomLeftRadius: "5px",
    },
    "&:last-of-type": {
        borderTopRightRadius: "5px",
        borderBottomRightRadius: "5px",
    },
}));

const DataTable = ({
    columns,
    fetchDataUrl,
    addButtonPath,
    editButtonPath,
    deleteUrl,
    enableChangePassword = false,
    changePasswordComponent,
    title = "Data List",
    customActions = [],
}) => {
    const showAlert = useSweetAlert();
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const theme = useTheme();
    const { darkMode } = useCustomTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // State for pagination and sorting
    const [currentPage, setCurrentPage] = useState(1);
    const [rows, setRows] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState("desc");
    const [sortBy, setSortBy] = useState("id");
    const [rangeStart, setRangeStart] = useState(1);
    const [rangeEnd, setRangeEnd] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        setCurrentPage(1);
    }, [fetchDataUrl]);

    const fetchData = useCallback(
        (page, perPage, sortOrder, sortBy) => {
            setLoading(true);
            setFetchError(null);
            const token = localStorage.getItem("token");
            axios
                .get(
                    `${apiUrl}${fetchDataUrl}?page=${page}&per_page=${perPage}&sort_order=${sortOrder}&sort_by=${sortBy}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((response) => {
                    const data = response.data.data;
                    setRows(data.data || []);
                    setRangeStart(data.from || 0);
                    setRangeEnd(data.to || 0);
                    setTotalRows(data.total || 0);
                    setTotalPages(Math.ceil(data.total / perPage) || 1);

                    if (!data.data || data.data.length === 0) {
                        setFetchError("No data available");
                    }
                })
                .catch((error) => {
                    setFetchError("Failed to fetch data");
                    if (error.response?.data?.message) {
                        showAlert({
                            title: "Error!",
                            text: error.response.data.message,
                            icon: "error",
                            timer: 2000,
                            showConfirmButton: false,
                            timerProgressBar: true,
                        });
                        if (error.response.data.message === "Unauthenticated.") {
                            window.location.href = "/login";
                        }
                    } else {
                        showAlert({
                            title: "Error!",
                            text: "Failed to fetch data.",
                            icon: "error",
                        });
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [apiUrl, fetchDataUrl, showAlert]
    );

    useEffect(() => {
        fetchData(currentPage, perPage, sortOrder, sortBy);
    }, [currentPage, perPage, sortOrder, sortBy, fetchData]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handlePerPageChange = (event) => {
        const perPageValue = event.target.value;
        setPerPage(perPageValue);
        setCurrentPage(1);
        fetchData(1, perPageValue, sortOrder, sortBy);
    };

    const handleSortOrderChange = (event) => {
        const newSortOrder = event.target.value;
        setSortOrder(newSortOrder);
        fetchData(currentPage, perPage, newSortOrder, sortBy);
    };

    const handleSortByChange = (event) => {
        const newSortBy = event.target.value;
        setSortBy(newSortBy);
        fetchData(currentPage, perPage, sortOrder, newSortBy);
    };

    const handleAddButtonClick = () => {
        navigate(addButtonPath);
    };

    const handleEditButtonClick = (id) => {
        navigate(`${editButtonPath}/${id}`);
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleDeleteButtonClick = (id) => {
        showAlert({
            title: "Are you sure?",
            text: "You will not be able to recover this data!",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result) {
                deleteData(id);
            }
        });
    };

    const deleteData = (id) => {
        const token = localStorage.getItem("token");
        setLoading(true);

        axios({
            method: "delete",
            url: `${apiUrl}${deleteUrl}`,
            data: qs.stringify({ id: id }),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then((response) => {
                showAlert({
                    title: "Deleted!",
                    text: response.data.message,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });
                fetchData(currentPage, perPage, sortOrder, sortBy);
            })
            .catch((error) => {
                showAlert({
                    title: "Error!",
                    text: error.response?.data?.message || "An error occurred while deleting the data.",
                    icon: "error",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredRows = rows.filter((row) => {
        return columns.some((column) => {
            const value = row[column.field];
            return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
    });

    return (
        <Box sx={{ display: "flex" }}>
            <Paper elevation={10} sx={{
                width: "100%",
                overflow: "hidden",
                borderRadius: "10px",
                backgroundColor: darkMode ? theme.palette.background.paper : '#fff'
            }}>
                {loading && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "90vh",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}
                {!loading && (
                    <Grid>
                        <TableContainer sx={{
                            maxHeight: { xs: 674, sm: 600, md: 460, lg: 460, xl: 500 },
                            backgroundColor: darkMode ? theme.palette.background.default : 'inherit'
                        }}>
                            <Grid
                                container
                                spacing={2}
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{
                                    flexDirection: { xs: "column", sm: "row" },
                                    marginY: 1,
                                    paddingX: { xs: 1, sm: 2 },
                                }}
                            >
                                {/* Left: Back Icon and Title */}
                                <Grid
                                    item
                                    container
                                    alignItems="center"
                                    spacing={1}
                                    xs={12}
                                    sm="auto"
                                    sx={{
                                        flexWrap: "nowrap",
                                        justifyContent: { xs: "center", sm: "flex-start" },
                                    }}
                                >
                                    <Grid item>
                                        <Tooltip title="Return Back">
                                            <IconButton
                                                onClick={handleBackClick}
                                                sx={{
                                                    backgroundColor: darkMode ? theme.palette.grey[800] : "#f0f0f0",
                                                    "&:hover": {
                                                        backgroundColor: darkMode ? theme.palette.grey[700] : "#e0e0e0",
                                                    },
                                                }}
                                            >
                                                <ArrowBackRoundedIcon color={darkMode ? "primary" : "disabled"} />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: "bold",
                                                whiteSpace: "nowrap",
                                                color: darkMode ? theme.palette.text.primary : 'inherit'
                                            }}
                                        >
                                            {title}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                {/* Right: Add Button and Search */}
                                <Grid
                                    item
                                    container
                                    spacing={1}
                                    xs={12}
                                    sm="auto"
                                    alignItems="center"
                                    justifyContent={{ xs: "center", sm: "flex-end" }}
                                    sx={{
                                        marginTop: { xs: 1, sm: 0 },
                                        flexWrap: "nowrap",
                                        flexDirection: { xs: "column", sm: "row" },
                                    }}
                                >
                                    {addButtonPath && (
                                        <Grid item>
                                            <Tooltip title="Add New Data">
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    size="large"
                                                    startIcon={<AddCircleOutlineIcon />}
                                                    onClick={handleAddButtonClick}
                                                    sx={{
                                                        color: "white",
                                                        whiteSpace: "nowrap",
                                                        width: { xs: "100%", sm: "auto" },
                                                    }}
                                                    fullWidth={true}
                                                >
                                                    Add
                                                </Button>
                                            </Tooltip>
                                        </Grid>
                                    )}
                                    <Grid item sx={{ width: { xs: "100%", sm: "auto" } }}>
                                        <TextField
                                            label="Search"
                                            variant="outlined"
                                            size="small"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            fullWidth
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: darkMode ? theme.palette.background.paper : '#fff'
                                                }
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            {!isMobile && (
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <StyledTableCell key={column.field} align={column.align || "left"}>
                                                    {column.headerName}
                                                </StyledTableCell>
                                            ))}
                                            <StyledTableCell align="center">Action</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredRows.length > 0 ? (
                                            filteredRows.map((row) => (
                                                <TableRow
                                                    key={row.id}
                                                    sx={{
                                                        backgroundColor: darkMode ? theme.palette.background.paper : '#fff',
                                                        '&:hover': {
                                                            backgroundColor: darkMode ? theme.palette.grey[800] : '#f5f5f5'
                                                        }
                                                    }}
                                                >
                                                    {columns.map((column) => (
                                                        <TableCell
                                                            key={column.field}
                                                            align={column.align || "left"}
                                                            sx={{
                                                                color: darkMode ? theme.palette.text.primary : 'inherit',
                                                                borderColor: darkMode ? theme.palette.divider : 'rgba(224, 224, 224, 1)'
                                                            }}
                                                        >
                                                            {column.render ? column.render(row) : row[column.field]}
                                                        </TableCell>
                                                    ))}
                                                    <TableCell
                                                        align="center"
                                                        sx={{
                                                            color: darkMode ? theme.palette.text.primary : 'inherit',
                                                            borderColor: darkMode ? theme.palette.divider : 'rgba(224, 224, 224, 1)'
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                gap: "8px",
                                                            }}
                                                        >
                                                            {enableChangePassword && changePasswordComponent(row.id)}
                                                            {customActions.map((action, index) => (
                                                                <Tooltip key={index} title={action.tooltip}>
                                                                    <Button
                                                                        variant="outlined"
                                                                        color={action.color}
                                                                        size="small"
                                                                        sx={{
                                                                            borderRadius: "50%",
                                                                            minWidth: "32px",
                                                                            minHeight: "32px",
                                                                            width: "32px",
                                                                            height: "32px",
                                                                            padding: 0,
                                                                            borderColor: darkMode ? theme.palette.divider : 'rgba(0, 0, 0, 0.23)'
                                                                        }}
                                                                        onClick={() => action.onClick(row.id)}
                                                                    >
                                                                        {action.icon}
                                                                    </Button>
                                                                </Tooltip>
                                                            ))}
                                                            {editButtonPath && (
                                                                <Tooltip title="Edit">
                                                                    <Button
                                                                        variant="outlined"
                                                                        color="secondary"
                                                                        size="small"
                                                                        sx={{
                                                                            borderRadius: "50%",
                                                                            minWidth: "32px",
                                                                            minHeight: "32px",
                                                                            width: "32px",
                                                                            height: "32px",
                                                                            padding: 0,
                                                                            borderColor: darkMode ? theme.palette.divider : 'rgba(0, 0, 0, 0.23)'
                                                                        }}
                                                                        onClick={() => handleEditButtonClick(row.id)}
                                                                    >
                                                                        <EditTwoToneIcon fontSize="small" />
                                                                    </Button>
                                                                </Tooltip>
                                                            )}
                                                            {deleteUrl && (
                                                                <Tooltip title="Delete">
                                                                    <Button
                                                                        variant="outlined"
                                                                        color="error"
                                                                        size="small"
                                                                        sx={{
                                                                            borderRadius: "50%",
                                                                            minWidth: "32px",
                                                                            minHeight: "32px",
                                                                            width: "32px",
                                                                            height: "32px",
                                                                            padding: 0,
                                                                            borderColor: darkMode ? theme.palette.divider : 'rgba(0, 0, 0, 0.23)'
                                                                        }}
                                                                        onClick={() => handleDeleteButtonClick(row.id)}
                                                                    >
                                                                        <DeleteTwoToneIcon fontSize="small" />
                                                                    </Button>
                                                                </Tooltip>
                                                            )}
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={columns.length + 1}
                                                    align="center"
                                                    sx={{
                                                        py: 4,
                                                        color: darkMode ? theme.palette.text.primary : 'inherit'
                                                    }}
                                                >
                                                    <Typography variant="body1">
                                                        {fetchError || "Data is not available"}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            )}
                            {isMobile && (
                                <Grid item xs={12}>
                                    {filteredRows.length > 0 ? (
                                        filteredRows.map((row) => (
                                            <Card
                                                key={row.id}
                                                style={{
                                                    marginBottom: '10px',
                                                    backgroundColor: darkMode ? theme.palette.background.paper : '#fff'
                                                }}
                                            >
                                                <CardContent>
                                                    {columns.map((column) => (
                                                        <Box key={column.field} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                            <Typography
                                                                variant="body2"
                                                                color={darkMode ? "textSecondary" : "textSecondary"}
                                                                component="div"
                                                            >
                                                                {column.headerName}
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                color={darkMode ? "textPrimary" : "textPrimary"}
                                                                align="right"
                                                                component="div"
                                                            >
                                                                {column.render ? column.render(row) : row[column.field]}
                                                            </Typography>
                                                        </Box>
                                                    ))}
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography
                                                            variant="body2"
                                                            color={darkMode ? "textPrimary" : "textPrimary"}
                                                            component="div"
                                                        >
                                                            Actions
                                                        </Typography>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                gap: "8px",
                                                            }}
                                                        >
                                                            {enableChangePassword && changePasswordComponent(row.id)}
                                                            {customActions.map((action, index) => (
                                                                <Tooltip key={index} title={action.tooltip}>
                                                                    <Button
                                                                        variant="outlined"
                                                                        color={action.color}
                                                                        size="small"
                                                                        sx={{
                                                                            borderRadius: "50%",
                                                                            minWidth: "32px",
                                                                            minHeight: "32px",
                                                                            width: "32px",
                                                                            height: "32px",
                                                                            padding: 0,
                                                                            borderColor: darkMode ? theme.palette.divider : 'rgba(0, 0, 0, 0.23)'
                                                                        }}
                                                                        onClick={() => action.onClick(row.id)}
                                                                    >
                                                                        {action.icon}
                                                                    </Button>
                                                                </Tooltip>
                                                            ))}
                                                            {editButtonPath && (
                                                                <Tooltip title="Edit">
                                                                    <Button
                                                                        variant="outlined"
                                                                        color="secondary"
                                                                        size="small"
                                                                        sx={{
                                                                            borderRadius: "50%",
                                                                            minWidth: "32px",
                                                                            minHeight: "32px",
                                                                            width: "32px",
                                                                            height: "32px",
                                                                            padding: 0,
                                                                            borderColor: darkMode ? theme.palette.divider : 'rgba(0, 0, 0, 0.23)'
                                                                        }}
                                                                        onClick={() => handleEditButtonClick(row.id)}
                                                                    >
                                                                        <EditTwoToneIcon fontSize="small" />
                                                                    </Button>
                                                                </Tooltip>
                                                            )}
                                                            {deleteUrl && (
                                                                <Tooltip title="Delete">
                                                                    <Button
                                                                        variant="outlined"
                                                                        color="error"
                                                                        size="small"
                                                                        sx={{
                                                                            borderRadius: "50%",
                                                                            minWidth: "32px",
                                                                            minHeight: "32px",
                                                                            width: "32px",
                                                                            height: "32px",
                                                                            padding: 0,
                                                                            borderColor: darkMode ? theme.palette.divider : 'rgba(0, 0, 0, 0.23)'
                                                                        }}
                                                                        onClick={() => handleDeleteButtonClick(row.id)}
                                                                    >
                                                                        <DeleteTwoToneIcon fontSize="small" />
                                                                    </Button>
                                                                </Tooltip>
                                                            )}
                                                        </Box>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : (
                                        <Card style={{
                                            marginBottom: '10px',
                                            backgroundColor: darkMode ? theme.palette.background.paper : '#fff'
                                        }}>
                                            <CardContent>
                                                <Typography
                                                    variant="body1"
                                                    align="center"
                                                    sx={{ py: 4 }}
                                                    color={darkMode ? "textPrimary" : "inherit"}
                                                >
                                                    {fetchError || "Data is not available"}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    )}
                                </Grid>
                            )}
                        </TableContainer>
                        <Grid
                            item
                            xs={12}
                            md={12}
                            order={2}
                            sx={{ py: 0.7, my: "2px", m: 0.5 }}
                        >
                            <Grid
                                container
                                spacing={2}
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{
                                    flexDirection: { xs: "column", sm: "row" },
                                }}
                            >
                                {/* Sort Order and Sort By Fields */}
                                <Grid item xs={12} sm="auto">
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: { xs: "column", sm: "row" },
                                            alignItems: { xs: "flex-start", sm: "center" },
                                            gap: 1,
                                        }}
                                    >
                                        <TextField
                                            select
                                            label="Sort Order"
                                            value={sortOrder}
                                            onChange={handleSortOrderChange}
                                            size="small"
                                            sx={{ width: 120 }}
                                        >
                                            {["asc", "desc"].map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option.toUpperCase()}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            select
                                            label="Sort By"
                                            value={sortBy}
                                            onChange={handleSortByChange}
                                            size="small"
                                            sx={{ width: 150 }}
                                        >
                                            {["id", "created_at", "updated_at"].map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option.toUpperCase()}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Box>
                                </Grid>

                                {/* Pagination and Rows per Page */}
                                <Grid item xs={12} sm="auto">
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: { xs: "column", sm: "row" },
                                            alignItems: { xs: "flex-start", sm: "center" },
                                            gap: 1,
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <Typography
                                                sx={{ mr: 1 }}
                                                variant="body2"
                                                color={darkMode ? "textPrimary" : "inherit"}
                                            >
                                                Rows per page:
                                            </Typography>
                                            <TextField
                                                select
                                                value={perPage}
                                                onChange={handlePerPageChange}
                                                size="small"
                                                sx={{ width: 80 }}
                                            >
                                                {[10, 20, 50].map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Box>

                                        <Typography
                                            variant="body2"
                                            sx={{ whiteSpace: "nowrap" }}
                                            color={darkMode ? "textPrimary" : "inherit"}
                                        >
                                            {`${rangeStart} - ${rangeEnd} of ${totalRows}`}
                                        </Typography>

                                        <Pagination
                                            shape="rounded"
                                            color="primary"
                                            count={totalPages}
                                            page={currentPage}
                                            onChange={handlePageChange}
                                            renderItem={(item) => (
                                                <PaginationItem
                                                    component="button"
                                                    onClick={() => handlePageChange(null, item.page)}
                                                    {...item}
                                                    sx={{
                                                        color: darkMode ? theme.palette.text.primary : 'inherit',
                                                        backgroundColor: darkMode ? theme.palette.background.paper : '#fff'
                                                    }}
                                                />
                                            )}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default DataTable;
