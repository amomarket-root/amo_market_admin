import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Autocomplete } from "@mui/material";
import { useSnackbar } from '../../Template/SnackbarAlert';
import { useSweetAlert } from "../../Template/SweetAlert";

// Reusable components
import PageHeader from "../../Form/PageHeader";
import ActionButtons from "../../Form/ActionButtons";

const AddDeliveryPersonBankAccountPage = () => {
    const navigate = useNavigate();
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();
    const [deliveryPersonId, setDeliveryPersonId] = useState("");
    const [deliveryPersons, setDeliveryPersons] = useState([]);
    const [accountHolderName, setAccountHolderName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [bankName, setBankName] = useState("");
    const [branchName, setBranchName] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [accountType, setAccountType] = useState("savings");
    const [upiId, setUpiId] = useState("");
    const [isVerified, setIsVerified] = useState(false);

    const [deliveryPersonError, setDeliveryPersonError] = useState('');
    const [accountHolderNameError, setAccountHolderNameError] = useState('');
    const [accountNumberError, setAccountNumberError] = useState('');
    const [bankNameError, setBankNameError] = useState('');
    const [branchNameError, setBranchNameError] = useState('');
    const [ifscCodeError, setIfscCodeError] = useState('');
    const [accountTypeError, setAccountTypeError] = useState('');
    const [upiIdError, setUpiIdError] = useState('');

    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const accountTypes = ['savings', 'current'];

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleCancelClick = () => {
        navigate("/delivery-person-bank-account");
    };

    const handleSubmit = () => {
        setDeliveryPersonError('');
        setAccountHolderNameError('');
        setAccountNumberError('');
        setBankNameError('');
        setBranchNameError('');
        setIfscCodeError('');
        setAccountTypeError('');
        setUpiIdError('');
        setLoading(true);

        const token = localStorage.getItem('token');
        const formData = {
            delivery_person_id: deliveryPersonId,
            account_holder_name: accountHolderName,
            account_number: accountNumber,
            bank_name: bankName,
            branch_name: branchName,
            ifsc_code: ifscCode,
            account_type: accountType,
            upi_id: upiId,
            is_verified: isVerified
        };

        axios.post(`${apiUrl}/admin/delivery_person_bank_account/create_account`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                const accountData = response.data;
                showSnackbar(accountData.message, { severity: 'success' });
                setTimeout(() => {
                    setLoading(false);
                    navigate("/delivery-person-bank-account");
                }, 2000);
            })
            .catch(error => {
                setLoading(false);
                if (error.response) {
                    if (error.response.data && error.response.data.errors) {
                        if (error.response.data.errors.delivery_person_id) {
                            setDeliveryPersonError(error.response.data.errors.delivery_person_id[0]);
                        }
                        if (error.response.data.errors.account_holder_name) {
                            setAccountHolderNameError(error.response.data.errors.account_holder_name[0]);
                        }
                        if (error.response.data.errors.account_number) {
                            setAccountNumberError(error.response.data.errors.account_number[0]);
                        }
                        if (error.response.data.errors.bank_name) {
                            setBankNameError(error.response.data.errors.bank_name[0]);
                        }
                        if (error.response.data.errors.branch_name) {
                            setBranchNameError(error.response.data.errors.branch_name[0]);
                        }
                        if (error.response.data.errors.ifsc_code) {
                            setIfscCodeError(error.response.data.errors.ifsc_code[0]);
                        }
                        if (error.response.data.errors.account_type) {
                            setAccountTypeError(error.response.data.errors.account_type[0]);
                        }
                        if (error.response.data.errors.upi_id) {
                            setUpiIdError(error.response.data.errors.upi_id[0]);
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

    useEffect(() => {
        const fetchDeliveryPersons = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${apiUrl}/admin/delivery_person/get_all_delivery_person`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDeliveryPersons(response.data.data);
            } catch (error) {
                showAlert({
                    title: "Error!",
                    text: `Error fetching delivery persons: ${error?.response?.data?.message || error.message}`,
                    icon: "error",
                });
            }
        };

        fetchDeliveryPersons();
    }, [apiUrl]);

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
                        <PageHeader title="Add Bank Account" handleBackClick={handleBackClick} />
                        <Divider sx={{ marginY: 1 }} />
                        <Grid container spacing={2} sx={{ marginBottom: 1 }}>
                            <Grid item xs={12}>
                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Delivery Person :
                                        </InputLabel>
                                        <Autocomplete
                                            options={deliveryPersons}
                                            getOptionLabel={(option) => option.name}
                                            value={deliveryPersons.find(person => person.id === deliveryPersonId) || null}
                                            onChange={(event, newValue) => {
                                                setDeliveryPersonId(newValue ? newValue.id : '');
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder="Select Delivery Person"
                                                    variant="outlined"
                                                    fullWidth
                                                    error={!!deliveryPersonError}
                                                    helperText={deliveryPersonError}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Account Holder Name :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Account Holder Name"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={accountHolderName}
                                            onChange={(e) => setAccountHolderName(e.target.value)}
                                            error={!!accountHolderNameError}
                                            helperText={accountHolderNameError}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Account Number :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Account Number"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={accountNumber}
                                            onChange={(e) => setAccountNumber(e.target.value)}
                                            error={!!accountNumberError}
                                            helperText={accountNumberError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Bank Name :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Bank Name"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={bankName}
                                            onChange={(e) => setBankName(e.target.value)}
                                            error={!!bankNameError}
                                            helperText={bankNameError}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Branch Name :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter Branch Name"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={branchName}
                                            onChange={(e) => setBranchName(e.target.value)}
                                            error={!!branchNameError}
                                            helperText={branchNameError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            IFSC Code :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter IFSC Code"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={ifscCode}
                                            onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                                            error={!!ifscCodeError}
                                            helperText={ifscCodeError}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Account Type :
                                        </InputLabel>
                                        <TextField
                                            select
                                            placeholder="Select Account Type"
                                            variant="outlined"
                                            fullWidth
                                            value={accountType}
                                            onChange={(e) => setAccountType(e.target.value)}
                                            error={!!accountTypeError}
                                            helperText={accountTypeError}
                                            SelectProps={{
                                                native: true,
                                            }}
                                        >
                                            {accountTypes.map((type) => (
                                                <option key={type} value={type}>
                                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                                </option>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            UPI ID (Optional) :
                                        </InputLabel>
                                        <TextField
                                            placeholder="Enter UPI ID"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            value={upiId}
                                            onChange={(e) => setUpiId(e.target.value)}
                                            error={!!upiIdError}
                                            helperText={upiIdError}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12}>
                                        <InputLabel
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            shrink
                                        >
                                            Verified :
                                        </InputLabel>
                                        <TextField
                                            select
                                            placeholder="Select Verification Status"
                                            variant="outlined"
                                            fullWidth
                                            value={isVerified}
                                            onChange={(e) => setIsVerified(e.target.value === 'true')}
                                            SelectProps={{
                                                native: true,
                                            }}
                                        >
                                            <option value={true}>Verified</option>
                                            <option value={false}>Not Verified</option>
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
                            submitLabel="Add Bank Account"
                        />
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default AddDeliveryPersonBankAccountPage;
