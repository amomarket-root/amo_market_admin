import React from "react";
import DataTable from "../../Template/DataTable";
import CompareIcon from '@mui/icons-material/Compare';
import PreviewTwoToneIcon from '@mui/icons-material/PreviewTwoTone';
import { useNavigate } from 'react-router-dom';

const ActiveLogPage = () => {
   const navigate = useNavigate();
  const columns = [
    { field: "user_name", headerName: "User Name" },
    { field: "log_name", headerName: "Log Name (Table)", align: "center" },
    {
      field: "event",
      headerName: "Event",
      align: "center",
      render: (row) => (
        <div
          style={{
            backgroundColor:
              row.event === "created"
                ? "#10d915"
                : row.event === "updated"
                ? "#d9c404"
                : "#f27474",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          {row.event}
        </div>
      ),
    },
    { field: "description", headerName: "Description", align: "center" },
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

  const handleCompareButtonClick = (activeLogId) => {
    navigate(`/compare-active-log/${activeLogId}`);
  };

  const handleShareButtonClick = (activeLogId) => {
    navigate(`/share-active-log/${activeLogId}`);
  };

  const customActions = [
    {
      tooltip: "Compare Active Log",
      color: "secondary",
      icon: <CompareIcon fontSize="small" />,
      onClick: handleCompareButtonClick,
    },
    {
      tooltip: "Preview Active Log",
      color: "warning",
      icon: <PreviewTwoToneIcon fontSize="small" />,
      onClick: handleShareButtonClick,
    },
  ];

  return (
    <DataTable
      columns={columns}
      fetchDataUrl="/admin/active_log/fetch_all_active_log"
      addButtonPath={false} // Disable Edit button
      editButtonPath={false} // Disable Edit button
      deleteUrl="/admin/active_log/delete_active_log"
      title="Active Log List"
      enableChangePassword={false}
      customActions={customActions} // Pass customActions to DataTable
    />
  );
};

export default ActiveLogPage;
