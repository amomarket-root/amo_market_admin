import React from "react";
import DataTable from "../../Template/DataTable";
import ToggleOnTwoToneIcon from "@mui/icons-material/ToggleOnTwoTone";
import ToggleOffTwoToneIcon from "@mui/icons-material/ToggleOffTwoTone";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import ExtensionOffTwoToneIcon from '@mui/icons-material/ExtensionOffTwoTone';

const ProductPage = () => {
  const columns = [
    { field: "name", headerName: "Name" },
    {
      field: "sub_category",
      headerName: "SubCategory",
      align: "center",
      render: (row) => (
        <Tooltip title={row.sub_category?.name || "Not Assign"}>
          {row.sub_category?.name
            ? (row.sub_category.name.length > 20 ? `${row.sub_category.name.substring(0, 20)}...` : row.sub_category.name)
            : <ExtensionOffTwoToneIcon />}
        </Tooltip>
      ),
    },
    {
      field: "image",
      headerName: "Image",
      align: "center",
      render: (row) => (
        <Tooltip title="Image">
          <Avatar src={row.image} alt="Image" loading="eager" decoding="async" sx={{ width: 50, height: 55, borderRadius: 2 }} />
        </Tooltip>
      ),
    },
    {
      field: "about_product",
      headerName: "About Product",
      align: "center",
      render: (row) => (
        <Tooltip title={row.about_product || "Not Available"}>
          {row.about_product ? (row.about_product.length > 20 ? `${row.about_product.substring(0, 20)}...` : row.about_product) : "-"}
        </Tooltip>
      ),
    },
    { field: "weight", headerName: "Weight", align: "center" },
    { field: "price", headerName: "Selling Price", align: "center" },
    { field: "original_price", headerName: "Original Price", align: "center" },
    { field: "discount", headerName: "Discount", align: "center" },
    { field: "delivery_time", headerName: "Delivery Time", align: "center" },
    { field: "unit", headerName: "Available Unit", align: "center" },
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
      fetchDataUrl="/admin/product/fetch_all_product"
      addButtonPath="/add-product"
      editButtonPath="/update-product"
      deleteUrl="/admin/product/delete_product"
      title="Product List"
      enableChangePassword={false} // Disable change password button for ProductPage
    />
  );
};

export default ProductPage;
