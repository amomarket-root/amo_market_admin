import React from "react";
import DataTable from "../Template/DataTable";
import ToggleOnTwoToneIcon from "@mui/icons-material/ToggleOnTwoTone";
import ToggleOffTwoToneIcon from "@mui/icons-material/ToggleOffTwoTone";
import PreviewTwoToneIcon from '@mui/icons-material/PreviewTwoTone';
import { Tooltip } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";


const OrderPage = () => {
   const navigate = useNavigate();
  const columns = [
    { field: "order_id", headerName: "Order Id" },
    { field: "total_amount", headerName: "Total Amount" },
    { field: "payment_method", headerName: "Payment Method" },
    { field: "payment_id", headerName: "payment Id" },
    {
        field: "payment_status",
        headerName: "Payment Status",
        align: "center",
        render: (row) => (
          row.payment_status === 'success' ? (
            <Tooltip title="Success">
              <ToggleOnTwoToneIcon color="success" />
            </Tooltip>
          ) : row.payment_status === 'failed' ? (
            <Tooltip title="Failed">
              <ToggleOffTwoToneIcon color="error" />
            </Tooltip>
          ) : (
            <Tooltip title="Pending">
              <ToggleOffTwoToneIcon color="warning" />
            </Tooltip>
          )
        ),
      },
      {
        field: "status",
        headerName: "Order Status",
        align: "center",
        render: (row) => (
          <div
            style={{
              backgroundColor:
                row.status === "delivered"
                  ? "#10d915"
                  : row.status === "pending"
                  ? "#d9c404"
                  : "#f27474",
              color: "white",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {row.status}
          </div>
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

  const handleViewButtonClick = (orderId) => {
    navigate(`/admin/view-order-details/${orderId}`);
  };

  const customActions = [
    {
      tooltip: "View Order Details",
      color: "secondary",
      icon: <PreviewTwoToneIcon fontSize="small" />,
      onClick: handleViewButtonClick,
    },
  ];


  return (
    <DataTable
      columns={columns}
      fetchDataUrl="/admin/order/fetch_all_order"
      addButtonPath={false} // Disable Edit button
      editButtonPath={false} // Disable Edit button
      deleteUrl= {false}
      title="Order List"
      enableChangePassword={false}
      customActions={customActions} // Pass customActions to DataTable
    />
  );
};

export default OrderPage;