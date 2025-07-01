import React from "react";
import DataTable from "../../Template/DataTable";
import ToggleOnTwoToneIcon from "@mui/icons-material/ToggleOnTwoTone";
import ToggleOffTwoToneIcon from "@mui/icons-material/ToggleOffTwoTone";
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';
import GppBadTwoToneIcon from '@mui/icons-material/GppBadTwoTone';
import Tooltip from "@mui/material/Tooltip";
import { useSweetAlert } from "../../Template/SweetAlert";
import { useSnackbar } from '../../Template/SnackbarAlert';

const DeliveryPersonBankAccountPage = () => {
    const showAlert = useSweetAlert();
    const showSnackbar = useSnackbar();

    const handleVerifyAccount = (id, verify) => {
        showAlert({
            title: verify ? "Verify Account?" : "Unverify Account?",
            text: verify
                ? "Are you sure you want to verify this bank account?"
                : "Are you sure you want to unverify this bank account?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: verify ? "Verify" : "Unverify",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('token');
                const apiUrl = import.meta.env.VITE_API_URL;

                axios.post(`${apiUrl}/admin/delivery_person_bank_account/verify_account`,
                    { id, verified: verify },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                ).then(response => {
                    showSnackbar(response.data.message, { severity: 'success' });
                    // You might want to refresh the table data here
                }).catch(error => {
                    showSnackbar(error.response?.data?.message || "Failed to update verification status", { severity: 'error' });
                });
            }
        });
    };

    const columns = [
        { field: "account_holder_name", headerName: "Account Holder" },
        {
            field: "account_number",
            headerName: "Account Number",
            render: (row) => {
                const acc = row.account_number || "";
                const last4 = acc.slice(-4);
                const masked = acc.length > 4 ? "*".repeat(acc.length - 4) + last4 : acc;
                return masked;
            }
        },
        { field: "bank_name", headerName: "Bank Name" },
        { field: "branch_name", headerName: "Branch" },
        { field: "ifsc_code", headerName: "IFSC Code" },
        {
            field: "account_type",
            headerName: "Type",
            align: "center",
            render: (row) => row.account_type.charAt(0).toUpperCase() + row.account_type.slice(1)
        },
        {
            field: "upi_id",
            headerName: "UPI ID",
            render: (row) => row.upi_id || "-"
        },
        {
            field: "delivery_person",
            headerName: "Delivery Person",
            render: (row) => row.delivery_person?.name || "N/A"
        },
        {
            field: "is_verified",
            headerName: "Verified",
            align: "center",
            render: (row) => (
                <Tooltip title={row.is_verified ? "Verified - Click to unverify" : "Not Verified - Click to verify"}>
                    <span
                        onClick={() => handleVerifyAccount(row.id, !row.is_verified)}
                        style={{ cursor: 'pointer' }}
                    >
                        {row.is_verified ? (
                            <VerifiedTwoToneIcon color="success" />
                        ) : (
                            <GppBadTwoToneIcon color="error" />
                        )}
                    </span>
                </Tooltip>
            ),
        },
        {
            field: "updated_at",
            headerName: "Updated At",
            align: "center",
            render: (row) => (
                <>
                    {new Date(row.updated_at).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}{" "}
                    {new Date(row.updated_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                    })}
                </>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            fetchDataUrl="/admin/delivery_person_bank_account/fetch_all_accounts"
            addButtonPath="/add-delivery-person-bank-account"
            editButtonPath="/update-delivery-person-bank-account"
            deleteUrl="/admin/delivery_person_bank_account/delete_account"
            title="Delivery Person Bank Accounts"
            enableChangePassword={false}
        />
    );
};

export default DeliveryPersonBankAccountPage;
