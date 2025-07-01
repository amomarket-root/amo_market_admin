import React from "react";
import DataTable from "../../Template/DataTable";
import NotificationsTwoToneIcon from '@mui/icons-material/NotificationsTwoTone';
import NotificationsOffTwoToneIcon from '@mui/icons-material/NotificationsOffTwoTone';
import ToggleOnTwoToneIcon from '@mui/icons-material/ToggleOnTwoTone';
import ToggleOffTwoToneIcon from '@mui/icons-material/ToggleOffTwoTone';
import { format } from "date-fns";
import Tooltip from "@mui/material/Tooltip";

const DeliveryPersonPage = () => {
    const columns = [
        { field: "name", headerName: "Name" },
        { field: "driving_license", headerName: "License No." },
        { field: "delivery_mode", headerName: "Delivery Mode" },
        { field: "vehicle_number", headerName: "Vehicle Number" },
        {
            field: "location",
            headerName: "Current Location",
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
                    {row.updated_at ? format(new Date(row.updated_at), "MMM-dd-yyyy hh:mm a") : ""}
                </>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            fetchDataUrl="/admin/delivery_person/fetch_all_delivery_person"
            addButtonPath="/add-delivery_person"
            editButtonPath="/update-delivery_person"
            deleteUrl="/admin/delivery_person/delete_delivery_person"
            title="Delivery Person List"
            enableChangePassword={false}
        />
    );
};

export default DeliveryPersonPage;
