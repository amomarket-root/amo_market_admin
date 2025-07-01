import React from "react";
import DataTable from "../../Template/DataTable";
import NotificationsTwoToneIcon from '@mui/icons-material/NotificationsTwoTone';
import NotificationsOffTwoToneIcon from '@mui/icons-material/NotificationsOffTwoTone';
import ToggleOnTwoToneIcon from '@mui/icons-material/ToggleOnTwoTone';
import ToggleOffTwoToneIcon from '@mui/icons-material/ToggleOffTwoTone';
import ExtensionOffTwoToneIcon from '@mui/icons-material/ExtensionOffTwoTone';
import Avatar from '@mui/material/Avatar';
import Tooltip from "@mui/material/Tooltip";

const ShopPage = () => {
    const columns = [
        { field: "name", headerName: "Name" },
        {
            field: "shop_type",
            headerName: "Type",
            align: "center",
            render: (row) => (
                <Tooltip title={row.shop_type?.name || "Not Assign"}>
                    {row.shop_type?.name
                        ? (row.shop_type?.name.length > 20 ? `${row.shop_type?.name.substring(0, 20)}...` : row.shop_type?.name)
                        : <ExtensionOffTwoToneIcon />}
                </Tooltip>
            ),
        },
        {
            field: "profile_picture",
            headerName: "Profile",
            align: "center",
            render: (row) => <Avatar src={row.profile_picture} alt={row.name} loading="eager" decoding="async" />,
        },
        {
            field: "location",
            headerName: "Location",
            align: "center",
            render: (row) => (
                <Tooltip title={row.location}>
                    {row.location.length > 20 ? `${row.location.substring(0, 20)}...` : row.location}
                </Tooltip>
            ),
        },
        {
            field: "online_status",
            headerName: "Online Status",
            align: "center",
            render: (row) => (
                row.online_status === 1 ? (
                    <Tooltip title="Online">
                        <NotificationsTwoToneIcon style={{ color: 'green' }} />
                    </Tooltip>
                ) : row.online_status === 0 ? (
                    <Tooltip title="Offline">
                        <NotificationsOffTwoToneIcon style={{ color: 'red' }} />
                    </Tooltip>
                ) : (
                    <span>Unknown status</span>
                )
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
            fetchDataUrl="/admin/shop/fetch_all_shop"
            addButtonPath="/add-shop"
            editButtonPath="/update-shop"
            deleteUrl="/admin/shop/delete_shop"
            title="Shop List"
            enableChangePassword={false}
        />
    );
};

export default ShopPage;
