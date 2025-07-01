import React from "react";
import DataTable from "../../Template/DataTable";
import ToggleOnTwoToneIcon from '@mui/icons-material/ToggleOnTwoTone';
import ToggleOffTwoToneIcon from '@mui/icons-material/ToggleOffTwoTone';
import ExtensionOffTwoToneIcon from '@mui/icons-material/ExtensionOffTwoTone';
import { format } from "date-fns";
import Tooltip from "@mui/material/Tooltip";
import { Avatar } from "@mui/material";

const AdvisementPage = () => {
    const columns = [
        {
            field: "shop_id",
            headerName: "Shop Name",
            align: "center",
            render: (row) => (
                <Tooltip title={row.shop?.name || "Not Assign"}>
                    {row.shop?.name
                        ? (row.shop.name.length > 20 ? `${row.shop.name.substring(0, 20)}...` : row.shop.name)
                        : <ExtensionOffTwoToneIcon />}
                </Tooltip>
            ),
        },
        { field: "title", headerName: "Title", align: "center"},
        {
            field: "content_image",
            headerName: "Advisement Image",
            align: "center",
            render: (row) => (
                <Tooltip title="Image">
                    <Avatar src={row.content_image} alt="Image" sx={{marginLeft:4, width: 90, height: 50, borderRadius: 2 }} />
                </Tooltip>
            ),
        },
        {
            field: "description",
            headerName: "Description",
            align: "center",
            render: (row) => (
                <Tooltip title={row.description || "Not Available"}>
                    {row.description ? (row.description.length > 20 ? `${row.description.substring(0, 20)}...` : row.description) : "-"}
                </Tooltip>
            ),
        },
        {
            field: "status",
            headerName: "Status",
            align: "center",
            render: (row) => (
                row.status === 1 ? (
                    <Tooltip title="Active">
                        <ToggleOnTwoToneIcon color="success" />
                    </Tooltip>
                ) : row.status === 0 ? (
                    <Tooltip title="Inactive">
                        <ToggleOffTwoToneIcon color="error" />
                    </Tooltip>
                ) : (
                    <Tooltip title="Unknown">
                        <ToggleOffTwoToneIcon color="warning" />
                    </Tooltip>
                )
            ),
        },
        {
            field: "updated_at",
            headerName: "Updated At",
            align: "center",
            render: (row) => (
                <>
                    {row.updated_at ? format(new Date(row.updated_at), "MMM-dd-yyyy hh:mm a") : ""}
                </>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            fetchDataUrl="/admin/advisement/fetch_all_advisement"
            addButtonPath="/add-advisement"
            editButtonPath="/update-advisement"
            deleteUrl="/admin/advisement/delete_advisement"
            title="Advisement List"
            enableChangePassword={false}
        />
    );
};

export default AdvisementPage;
