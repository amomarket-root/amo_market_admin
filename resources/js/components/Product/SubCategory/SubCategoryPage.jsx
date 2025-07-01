import React from "react";
import DataTable from "../../Template/DataTable";
import ToggleOnTwoToneIcon from "@mui/icons-material/ToggleOnTwoTone";
import ToggleOffTwoToneIcon from "@mui/icons-material/ToggleOffTwoTone";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import ExtensionOffTwoToneIcon from '@mui/icons-material/ExtensionOffTwoTone';

const SubCategoryPage = () => {
  const columns = [
    { field: "name", headerName: "Name" },
    {
      field: "category",
      headerName: "Category",
      align: "center",
      render: (row) => (
        <Tooltip title={row.category?.name || "Not Assign"}>
          {row.category?.name
            ? (row.category.name.length > 20 ? `${row.category.name.substring(0, 20)}...` : row.category.name)
            : <ExtensionOffTwoToneIcon />}
        </Tooltip>
      ),
    },
    {
      field: "image",
      headerName: "Image",
      align: "center",
      render: (row) => (
        <Avatar src={row.image} alt="Image" loading="eager" decoding="async" sx={{ width: 50, height: 55, borderRadius: 2 }} />
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
      fetchDataUrl="/admin/subcategory/fetch_all_subcategory"
      addButtonPath="/add-subcategory"
      editButtonPath="/update-subcategory"
      deleteUrl="/admin/subcategory/delete_subcategory"
      title="SubCategory List"
      enableChangePassword={false} // Disable change password button for SubCategoryPage
    />
  );
};

export default SubCategoryPage;
