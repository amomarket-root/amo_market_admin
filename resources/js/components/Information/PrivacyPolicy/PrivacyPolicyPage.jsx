import React from "react";
import DataTable from "../../Template/DataTable";
import ToggleOnTwoToneIcon from '@mui/icons-material/ToggleOnTwoTone';
import ToggleOffTwoToneIcon from '@mui/icons-material/ToggleOffTwoTone';
import { format } from "date-fns";
import Tooltip from "@mui/material/Tooltip";
import { Avatar } from "@mui/material";

const PrivacyPolicyPage = () => {
    const columns = [
        {
            field: "title",
            headerName: "Title",
            align: "center",
            render: (row) => (
                <Tooltip title={row.title || "Not Available"}>
                    {row.title ? (row.title.length > 20 ? `${row.title.substring(0, 20)}...` : row.title) : "-"}
                </Tooltip>
            ),
        },
        {
            field: "introduction",
            headerName: "Introduction",
            align: "center",
            render: (row) => (
                <Tooltip title={row.introduction || "Not Available"}>
                    {row.introduction ? (row.introduction.length > 30 ? `${row.introduction.substring(0, 30)}...` : row.introduction) : "-"}
                </Tooltip>
            ),
        },
        {
            field: "image_path",
            headerName: "Image",
            align: "center",
            render: (row) => (
                <Tooltip title="Privacy Policy Image">
                    <Avatar
                        src={row.image_path}
                        alt="Privacy Policy"
                        sx={{ marginLeft: 4, width: 90, height: 50, borderRadius: 2 }}
                    />
                </Tooltip>
            ),
        },
        {
            field: "is_active",
            headerName: "Status",
            align: "center",
            render: (row) =>
                row.is_active === true ? (
                    <Tooltip title="Active">
                        <ToggleOnTwoToneIcon color="success" />
                    </Tooltip>
                ) : row.is_active === false ? (
                    <Tooltip title="Inactive">
                        <ToggleOffTwoToneIcon color="error" />
                    </Tooltip>
                ) : null,
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
            fetchDataUrl="/admin/privacy_policy/fetch_all_privacy_policies"
            addButtonPath="/add-privacy-policy"
            editButtonPath="/update-privacy-policy"
            deleteUrl="/admin/privacy_policy/delete_privacy_policy"
            title="Privacy Policies"
            enableChangePassword={false}
        />
    );
};

export default PrivacyPolicyPage;
