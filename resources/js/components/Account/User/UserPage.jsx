import React, { useState } from "react";
import DataTable from "../../Template/DataTable";
import { Avatar, Button, Tooltip } from "@mui/material";
import ToggleOnTwoToneIcon from "@mui/icons-material/ToggleOnTwoTone";
import ToggleOffTwoToneIcon from "@mui/icons-material/ToggleOffTwoTone";
import KeyTwoToneIcon from "@mui/icons-material/KeyTwoTone";
import ChangePasswordDialog from "./ChangePasswordDialog";

// Function to generate a color based on the name
const stringToColor = (string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

// Function to get initials from name
const getInitials = (name) => {
  if (!name) return '';
  const names = name.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }

  return initials;
};

const UserPage = () => {
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleOpenChangePasswordDialog = (userId) => {
    setSelectedUserId(userId);
    setChangePasswordOpen(true);
  };

  const handleCloseChangePasswordDialog = () => {
    setChangePasswordOpen(false);
    setSelectedUserId(null);
  };

  const columns = [
    { field: "name", headerName: "Name" },
    {
      field: "avatar",
      headerName: "Avatar",
      align: "center",
      render: (row) => {
        // If avatar path exists and is not empty, show the image
        if (row.avatar?.path) {
          return <Avatar src={row.avatar.path} alt={row.name}  loading="eager" decoding="async"/>;
        }

        // Otherwise show initials with colored background
        return (
          <Avatar
            sx={{
              bgcolor: stringToColor(row.name),
              width: 40,
              height: 40,
              fontSize: '1rem'
            }}
          >
            {getInitials(row.name)}
          </Avatar>
        );
      },
    },
    {
      field: "role",
      headerName: "Role",
      align: "center",
      render: (row) => row.role?.name || "N/A",
    },
    { field: "email", headerName: "Email", align: "center" },
    {
      field: "status",
      headerName: "Status",
      align: "center",
      render: (row) =>
        row.status === 1 ? (
          <Tooltip title="Active">
            <ToggleOnTwoToneIcon color="success" />
          </Tooltip>
        ) : row.status === 0 ? (
          <Tooltip title="Inactive">
            <ToggleOffTwoToneIcon color="error" />
          </Tooltip>
        ) : (
          <Tooltip title="Pending">
            <ToggleOffTwoToneIcon color="warning" />
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

  const changePasswordComponent = (userId) => (
    <Tooltip title="Change Password">
      <Button
        variant="outlined"
        color="primary"
        size="small"
        sx={{
          borderRadius: "50%",
          minWidth: "32px",
          minHeight: "32px",
          width: "32px",
          height: "32px",
          padding: 0,
        }}
        onClick={() => handleOpenChangePasswordDialog(userId)}
      >
        <KeyTwoToneIcon fontSize="small" />
      </Button>
    </Tooltip>
  );

  return (
    <>
      <DataTable
        columns={columns}
        fetchDataUrl="/admin/user/fetch_all_user"
        addButtonPath="/add-user"
        editButtonPath="/update-user"
        deleteUrl="/admin/user/delete_user"
        enableChangePassword={true}
        changePasswordComponent={changePasswordComponent}
        title="User List"
      />
      <ChangePasswordDialog
        open={changePasswordOpen}
        onClose={handleCloseChangePasswordDialog}
        userId={selectedUserId}
      />
    </>
  );
};

export default UserPage;
