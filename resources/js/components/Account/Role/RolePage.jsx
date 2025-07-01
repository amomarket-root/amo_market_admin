import React from "react";
import DataTable from "../../Template/DataTable";

const RolePage = () => {
  const columns = [
    { field: "name", headerName: "Role" },
    { field: "parent_id", headerName: "Parent Role", align: "center", render: (row) => row.parent_id || "-" },
    {
      field: "users",
      headerName: "Total Users",
      align: "center",
      render: (row) => (Array.isArray(row.users) ? row.users.length : row.users) + " Users",
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
      fetchDataUrl="/admin/role/fetch_all_role"
      addButtonPath="/add-role"
      editButtonPath="/update-role"
      deleteUrl="/admin/role/delete_role"
      title="Role List"
      enableChangePassword={false} // Disable change password button for RolePage
    />
  );
};

export default RolePage;
