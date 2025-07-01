import React from "react";
import DataTable from "../../Template/DataTable";
import { format } from "date-fns";
import Tooltip from "@mui/material/Tooltip";
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';

const ContactUsPage = () => {
    const columns = [
        {
            field: "company_name",
            headerName: "Company",
            align: "center",
            render: (row) => (
                <Tooltip title={row.company_name || "Not Available"}>
                    {row.company_name ? (row.company_name.length > 20 ? `${row.company_name.substring(0, 20)}...` : row.company_name) : "-"}
                </Tooltip>
            ),
        },
        {
            field: "address",
            headerName: "Address",
            align: "center",
            render: (row) => (
                <Tooltip title={`${row.address_line1}, ${row.city}, ${row.state}` || "Not Available"}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <LocationOnTwoToneIcon color="primary" sx={{ mr: 1 }} />
                        {row.address_line1 ? (row.address_line1.length > 20 ? `${row.address_line1.substring(0, 20)}...` : row.address_line1) : "-"}
                    </div>
                </Tooltip>
            ),
        },
        {
            field: "phone_numbers",
            headerName: "Phone",
            align: "center",
            render: (row) => (
                <Tooltip title={row.phone_numbers || "Not Available"}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <LocalPhoneTwoToneIcon color="primary" sx={{ mr: 1 }} />
                        {row.phone_numbers ? (row.phone_numbers.length > 15 ? `${row.phone_numbers.substring(0, 15)}...` : row.phone_numbers) : "-"}
                    </div>
                </Tooltip>
            ),
        },
        {
            field: "email",
            headerName: "Email",
            align: "center",
            render: (row) => (
                <Tooltip title={row.email || "Not Available"}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <EmailTwoToneIcon color="primary" sx={{ mr: 1 }} />
                        {row.email ? (row.email.length > 20 ? `${row.email.substring(0, 20)}...` : row.email) : "-"}
                    </div>
                </Tooltip>
            ),
        },
        {
            field: "updated_at",
            headerName: "Last Updated",
            align: "center",
            render: (row) => (
                <>
                    {row.updated_at ? format(new Date(row.updated_at), "MMM-dd-yyyy hh:mm a") : "Not updated"}
                </>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            fetchDataUrl="/admin/contact_us/fetch_all_contact_us"
            addButtonPath="/add-contact-us"
            editButtonPath="/update-contact-us"
            deleteUrl="/admin/contact_us/delete_contact_us"
            title="Contact Us"
            enableChangePassword={false}
        />
    );
};

export default ContactUsPage;
