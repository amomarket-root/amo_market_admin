import React from "react";
import DataTable from "../../Template/DataTable";
import Tooltip from "@mui/material/Tooltip";
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';

const ShopDocumentPage = () => {
  const columns = [
    {
      field: "shop_id",
      headerName: "Shop",
      align: "center",
      render: (row) => (
        <Tooltip title={row.shop?.name || "Not Assigned"}>
          {row.shop?.name
            ? (row.shop.name.length > 15 ? `${row.shop.name.substring(0, 15)}...` : row.shop.name)
            : <BusinessTwoToneIcon />}
        </Tooltip>
      ),
    },
    {
      field: "PAN_Number",
      headerName: "PAN Number",
      align: "center"
    },
    {
      field: "FSSAI_Licence",
      headerName: "FSSAI Licence",
      align: "center"
    },
    {
      field: "GST_number",
      headerName: "GST Number",
      align: "center"
    },
    {
      field: "Shop_Licence",
      headerName: "Shop Licence",
      align: "center"
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
      fetchDataUrl="/admin/shop_document/fetch_all"
      addButtonPath="/add-shop-document"
      editButtonPath="/update-shop-document"
      deleteUrl="/admin/shop_document/delete"
      title="Shop Documents"
      enableChangePassword={false}
    />
  );
};

export default ShopDocumentPage;
