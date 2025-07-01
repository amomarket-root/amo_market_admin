import React from "react";
import { MenuItem, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";

const MenuItems = ({
  handleViewProfile,
  handleChangePassword,
  handleCustomerSupport,
  handleLogout,
}) => {
  return (
    <>
      <MenuItem
        onClick={handleViewProfile}
        sx={{
          color: "#3f51b5",
          "&:hover": { backgroundColor: "#e8eaf6" },
          borderRadius: 8,
        }}
      >
        <IconButton>
          <PersonIcon sx={{ color: "#3f51b5" }} />
        </IconButton>
        View Profile
      </MenuItem>
      <MenuItem
        onClick={handleChangePassword}
        sx={{
          color: "#F8B311",
          "&:hover": { backgroundColor: "#F2FB9A" },
          borderRadius: 8,
        }}
      >
        <IconButton>
          <LockIcon sx={{ color: "#F8B311" }} />
        </IconButton>
        Change Password
      </MenuItem>
      <MenuItem
        onClick={handleCustomerSupport}
        sx={{
          color: "#10d915",
          "&:hover": { backgroundColor: "#F2FB9A" },
          borderRadius: 8,
        }}
      >
        <IconButton>
          <ChatIcon sx={{ color: "#10d915" }} />
        </IconButton>
        Customer Support
      </MenuItem>
      <MenuItem
        onClick={handleLogout}
        sx={{
          color: "#f44336",
          "&:hover": { backgroundColor: "#ffcdd2" },
          borderRadius: 8,
        }}
      >
        <IconButton>
          <LogoutIcon sx={{ color: "#f44336" }} />
        </IconButton>
        Logout
      </MenuItem>
    </>
  );
};

export default MenuItems;
