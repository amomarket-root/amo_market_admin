import React from "react";
import DataTable from "../../Template/DataTable";
import ToggleOnTwoToneIcon from '@mui/icons-material/ToggleOnTwoTone';
import ToggleOffTwoToneIcon from '@mui/icons-material/ToggleOffTwoTone';
import { format } from "date-fns";
import Tooltip from "@mui/material/Tooltip";
import { Avatar, Switch } from "@mui/material";

const CareerPage = () => {
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
            field: "description",
            headerName: "Description",
            align: "center",
            render: (row) => (
                <Tooltip title={row.description || "Not Available"}>
                    {row.description ? (row.description.length > 30 ? `${row.description.substring(0, 30)}...` : row.description) : "-"}
                </Tooltip>
            ),
        },
        {
            field: "image_path",
            headerName: "Image",
            align: "center",
            render: (row) => (
                <Tooltip title="Career Image">
                    <Avatar
                        src={row.image_path}
                        alt="Career"
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
            field: "sort_order",
            headerName: "Order",
            align: "center",
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
            fetchDataUrl="/admin/careers/fetch_all_careers"
            addButtonPath="/add-career"
            editButtonPath="/update-career"
            deleteUrl="/admin/careers/delete_career"
            title="Career Opportunities"
            enableChangePassword={false}
        />
    );
};

export default CareerPage;
