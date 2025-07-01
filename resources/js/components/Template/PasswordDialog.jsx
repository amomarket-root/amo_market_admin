import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordDialog = ({
  open,
  onClose,
  passwordFormData,
  showPassword,
  oldPasswordError,
  passwordError,
  handlePasswordFormChange,
  handleToggleShowPassword,
  handlePasswordFormSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="old_password"
          label="Old Password"
          type={showPassword.old_password ? "text" : "password"}
          fullWidth
          value={passwordFormData.old_password}
          onChange={handlePasswordFormChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleToggleShowPassword("old_password")}
                  edge="end"
                >
                  {showPassword.old_password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!!oldPasswordError}
          helperText={oldPasswordError}
        />
        <TextField
          margin="dense"
          name="password"
          label="New Password"
          type={showPassword.password ? "text" : "password"}
          fullWidth
          value={passwordFormData.password}
          onChange={handlePasswordFormChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleToggleShowPassword("password")}
                  edge="end"
                >
                  {showPassword.password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!!passwordError}
          helperText={passwordError}
        />
        <TextField
          margin="dense"
          name="password_confirmation"
          label="Confirm Password"
          type={showPassword.password_confirmation ? "text" : "password"}
          fullWidth
          value={passwordFormData.password_confirmation}
          onChange={handlePasswordFormChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleToggleShowPassword("password_confirmation")}
                  edge="end"
                >
                  {showPassword.password_confirmation ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          color="error"
          sx={{ color: "white" }}
        >
          Close
        </Button>
        <Button
          onClick={handlePasswordFormSubmit}
          variant="contained"
          color="success"
          sx={{ color: "white" }}
        >
          Change
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordDialog;
