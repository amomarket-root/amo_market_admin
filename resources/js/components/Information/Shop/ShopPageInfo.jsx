import React from "react";
import DataTable from "../../Template/DataTable";
import ToggleOnTwoToneIcon from '@mui/icons-material/ToggleOnTwoTone';
import ToggleOffTwoToneIcon from '@mui/icons-material/ToggleOffTwoTone';
import { format } from "date-fns";
import Tooltip from "@mui/material/Tooltip";
import { Avatar, Link } from "@mui/material";

const ShopPageInfo = () => {
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
                <Tooltip title="Shop Page Image">
                    <Avatar
                        src={row.image_path}
                        alt="Shop Page"
                        sx={{ marginLeft: 4, width: 90, height: 50, borderRadius: 2 }}
                    />
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
            fetchDataUrl="/admin/shop_pages/fetch_all_shop_pages"
            addButtonPath="/add-shop-page"
            editButtonPath="/update-shop-page"
            deleteUrl="/admin/shop_pages/delete_shop_page"
            title="Shop Pages"
            enableChangePassword={false}
        />
    );
};

export default ShopPageInfo;
