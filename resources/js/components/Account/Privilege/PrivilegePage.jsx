import React from "react";
import DataTable from "../../Template/DataTable";

const PrivilegePage = () => {
  const columns = [
    { field: "name", headerName: "Privilege Name" },
    { field: "description", headerName: "Description", align: "center" },
    {
      field: "created_at",
      headerName: "Created At",
      align: "center",
      render: (row) => (
        <>
          {new Date(row.created_at).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
          {new Date(row.created_at).toLocaleTimeString("en-US", {
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
      fetchDataUrl="/admin/privilege/fetch_all_privilege"
      addButtonPath="/add-privilege"
      editButtonPath="/update-privilege"
      deleteUrl="/admin/privilege/delete_privilege"
      title="Privilege List"
    />
  );
};

export default PrivilegePage;
