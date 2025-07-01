import React from "react";
import DataTable from "../../Template/DataTable";
import ToggleOnTwoToneIcon from '@mui/icons-material/ToggleOnTwoTone';
import ToggleOffTwoToneIcon from '@mui/icons-material/ToggleOffTwoTone';
import { format } from "date-fns";
import Tooltip from "@mui/material/Tooltip";
import { Avatar } from "@mui/material";

const TermPage = () => {
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
            field: "content",
            headerName: "Content",
            align: "center",
            render: (row) => (
                <Tooltip title={row.content || "Not Available"}>
                    {row.content ? (row.content.length > 30 ? `${row.content.substring(0, 30)}...` : row.content) : "-"}
                </Tooltip>
            ),
        },
        {
            field: "image_path",
            headerName: "Image",
            align: "center",
            render: (row) => (
                <Tooltip title="Term Image">
                    <Avatar
                        src={row.image_path}
                        alt="Term"
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
            fetchDataUrl="/admin/terms/fetch_all_terms"
            addButtonPath="/add-term"
            editButtonPath="/update-term"
            deleteUrl="/admin/terms/delete_term"
            title="Terms & Conditions"
            enableChangePassword={false}
        />
    );
};

export default TermPage;
