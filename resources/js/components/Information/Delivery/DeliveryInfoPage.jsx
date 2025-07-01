import React from "react";
import DataTable from "../../Template/DataTable";
import ToggleOnTwoToneIcon from '@mui/icons-material/ToggleOnTwoTone';
import ToggleOffTwoToneIcon from '@mui/icons-material/ToggleOffTwoTone';
import { format } from "date-fns";
import Tooltip from "@mui/material/Tooltip";
import { Avatar, Link } from "@mui/material";

const DeliveryInfoPage = () => {
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
            field: "video_url",
            headerName: "Video URL",
            align: "center",
            render: (row) => (
                row.video_url ? (
                    <Link href={row.video_url} target="_blank" rel="noopener">
                        View Video
                    </Link>
                ) : "-"
            ),
        },
        {
            field: "link",
            headerName: "Link",
            align: "center",
            render: (row) => (
                row.link ? (
                    <Link href={row.link} target="_blank" rel="noopener">
                        Visit Link
                    </Link>
                ) : "-"
            ),
        },
        {
            field: "image_path",
            headerName: "Image",
            align: "center",
            render: (row) => (
                <Tooltip title="Delivery Page Image">
                    <Avatar
                        src={row.image_path}
                        alt="Delivery"
                        sx={{ marginLeft: 4, width: 90, height: 50, borderRadius: 2 }}
                    />
                </Tooltip>
            ),
        },
        {
            field: "is_active",
            headerName: "Status",
            align: "center",
            render: (row) => (
                row.is_active ? (
                    <Tooltip title="Active">
                        <ToggleOnTwoToneIcon color="success" />
                    </Tooltip>
                ) : (
                    <Tooltip title="Inactive">
                        <ToggleOffTwoToneIcon color="error" />
                    </Tooltip>
                )
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
            fetchDataUrl="/admin/delivery_pages/fetch_all_delivery_pages"
            addButtonPath="/add-delivery-page"
            editButtonPath="/update-delivery-page"
            deleteUrl="/admin/delivery_pages/delete_delivery_page"
            title="Delivery Pages"
            enableChangePassword={false}
        />
    );
};

export default DeliveryInfoPage;
