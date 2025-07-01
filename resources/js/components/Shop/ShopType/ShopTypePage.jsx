import React from "react";
import DataTable from "../../Template/DataTable";
import LocalOfferTwoToneIcon from '@mui/icons-material/LocalOfferTwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import PointOfSaleTwoToneIcon from '@mui/icons-material/PointOfSaleTwoTone';
import Tooltip from "@mui/material/Tooltip";
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

const StyledChip = styled(Chip)(({ theme }) => ({
    margin: theme.spacing(0.5),
    fontWeight: 'bold',
}));

const ShopTypePage = () => {
    const columns = [
        { field: "name", headerName: "Name", flex: 1 },
        {
            field: "has_services",
            headerName: "Has Services",
            align: "center",
            render: (row) => (
                <Tooltip title={row.has_services ? "Yes" : "No"}>
                    {row.has_services ? (
                        <StyledChip label="Services" color="primary" size="small" />
                    ) : (
                        <StyledChip label="No Services" color="default" size="small" />
                    )}
                </Tooltip>
            ),
        },
        {
            field: "delivery_charge",
            headerName: "Delivery Charge",
            align: "center",
            render: (row) => (
                <Tooltip title={row.delivery_charge ? "Has Delivery Charge" : "No Delivery Charge"}>
                    {row.delivery_charge ? (
                        <LocalShippingTwoToneIcon color="primary" />
                    ) : (
                        <LocalShippingTwoToneIcon color="disabled" />
                    )}
                </Tooltip>
            ),
        },
        {
            field: "platform_charge",
            headerName: "Platform Charge",
            align: "center",
            render: (row) => (
                <Tooltip title={row.platform_charge ? "Has Platform Charge" : "No Platform Charge"}>
                    {row.platform_charge ? (
                        <PointOfSaleTwoToneIcon color="primary" />
                    ) : (
                        <PointOfSaleTwoToneIcon color="disabled" />
                    )}
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
                        month: "short",
                        year: "numeric",
                    })}
                    <br />
                    {new Date(row.updated_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    })}
                </>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            fetchDataUrl="/admin/shop-type/fetch_all"
            addButtonPath="/add-shop-type"
            editButtonPath="/update-shop-type"
            deleteUrl="/admin/shop-type/delete"
            title="Shop Types"
            enableChangePassword={false}
            enableRowCount={true}
            enableSearch={true}
        />
    );
};

export default ShopTypePage;
