import React from "react";
import DataTable from "../../Template/DataTable";
import ToggleOnTwoToneIcon from "@mui/icons-material/ToggleOnTwoTone";
import ToggleOffTwoToneIcon from "@mui/icons-material/ToggleOffTwoTone";
import Tooltip from "@mui/material/Tooltip";
import ExtensionOffTwoToneIcon from '@mui/icons-material/ExtensionOffTwoTone';

const ProductInformationPage = () => {
  const columns = [
    {
      field: "product",
      headerName: "Product Name",
      render: (row) => (
        <Tooltip title={row.product?.name || "Not Assign"}>
          {row.product?.name
            ? (row.product.name.length > 20 ? `${row.product.name.substring(0, 20)}...` : row.product.name)
            : <ExtensionOffTwoToneIcon />}
        </Tooltip>
      ),
    },
    {
      field: "product_type",
      headerName: "Type",
      align: "center",
      render: (row) => (
        <Tooltip title={row.product_type || "Not Describe"}>
          {row.product_type ? (row.product_type.length > 10 ? `${row.product_type.substring(0, 10)}...` : row.product_type) : "-"}
        </Tooltip>
      ),
    },
    {
      field: "product_flavour",
      headerName: "Flavour",
      align: "center",
      render: (row) => (
        <Tooltip title={row.product_flavour || "Not Describe"}>
          {row.product_flavour ? (row.product_flavour.length > 20 ? `${row.product_flavour.substring(0, 20)}...` : row.product_flavour) : "-"}
        </Tooltip>
      ),
    },
    {
      field: "product_Ingredients",
      headerName: "Ingredients",
      align: "center",
      render: (row) => (
        <Tooltip title={row.product_Ingredients || "Not Describe"}>
          {row.product_Ingredients ? (row.product_Ingredients.length > 20 ? `${row.product_Ingredients.substring(0, 20)}...` : row.product_Ingredients) : "-"}
        </Tooltip>
      ),
    },
    {
      field: "product_attraction",
      headerName: "Attraction",
      align: "center",
      render: (row) => (
        <Tooltip title={row.product_attraction || "Not Describe"}>
          {row.product_attraction ? (row.product_attraction.length > 20 ? `${row.product_attraction.substring(0, 20)}...` : row.product_attraction) : "-"}
        </Tooltip>
      ),
    },
    {
      field: "key_features",
      headerName: "Key Features",
      align: "center",
      render: (row) => (
        <Tooltip title={row.key_features || "Not Describe"}>
          {row.key_features ? (row.key_features.length > 20 ? `${row.key_features.substring(0, 20)}...` : row.key_features) : "-"}
        </Tooltip>
      ),
    },
    { field: "fssai_license", headerName: "FSSAI License", align: "center" },
    {
      field: "manufacturer_details",
      headerName: "Manufacturer",
      align: "center",
      render: (row) => (
        <Tooltip title={row.manufacturer_details || "Not Describe"}>
          {row.manufacturer_details ? (row.manufacturer_details.length > 20 ? `${row.manufacturer_details.substring(0, 20)}...` : row.manufacturer_details) : "-"}
        </Tooltip>
      ),
    },
    {
      field: "second_unit",
      headerName: "Second Unit",
      align: "center",
      render: (row) => (
        row.second_unit_weight && row.second_unit_price ? "Yes" : "No"
      ),
    },
    {
      field: "third_unit",
      headerName: "Third Unit",
      align: "center",
      render: (row) => (
        row.third_unit_weight && row.third_unit_price ? "Yes" : "No"
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
      fetchDataUrl="/admin/product_info/fetch_all_product_info"
      addButtonPath="/add-product-information"
      editButtonPath="/update-product-information"
      deleteUrl="/admin/product_info/delete_product_info"
      title="Product Information List"
      enableChangePassword={false} // Disable change password button for ProductInformationPage
    />
  );
};

export default ProductInformationPage;
