import React, { useState } from "react";
import {Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField,} from "@mui/material";
import axios from "axios";
import { useSweetAlert } from "../../Template/SweetAlert";

const ChangePasswordDialog = ({ open, onClose, userId }) => {
    const showAlert = useSweetAlert();
    const [passwordFormData, setPasswordFormData] = useState({
        old_password: "",
        password: "",
        password_confirmation: "",
    });
    const [oldPasswordError, setOldPasswordError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handlePasswordFormChange = (event) => {
        const { name, value } = event.target;
        setPasswordFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handlePasswordFormSubmit = () => {
        setOldPasswordError("");
        setPasswordError("");

        const token = localStorage.getItem("token");

        axios
            .post(
                `${import.meta.env.VITE_API_URL}/admin/user/change_password`,
                { ...passwordFormData, user_id: userId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                showAlert({
                    title: "Success!",
                    text: response.data.message,
                    icon: "success",
                    timer: 2000,
                    timerProgressBar: true,
                });
                onClose();
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.data && error.response.data.errors) {
                        if (error.response.data.errors.old_password) {
                            setOldPasswordError(error.response.data.errors.old_password[0]);
                        }
                        if (error.response.data.errors.password) {
                            setPasswordError(error.response.data.errors.password[0]);
                        }
                    } else if (error.response.data.message) {
                         showAlert({
                            title: "Error!",
                            text: error.response.data.message,
                            icon: "error",
                        });
                    }
                } else {
                     showAlert({
                            title: "Error!",
                            text: "Server error or network issue. Please try again later.",
                            icon: "error",
                        });
                }
            });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="old_password"
                    label="Old Password"
                    type="password"
                    fullWidth
                    value={passwordFormData.old_password}
                    onChange={handlePasswordFormChange}
                    error={!!oldPasswordError}
                    helperText={oldPasswordError}
                />
                <TextField
                    margin="dense"
                    name="password"
                    label="New Password"
                    type="password"
                    fullWidth
                    value={passwordFormData.password}
                    onChange={handlePasswordFormChange}
                    error={!!passwordError}
                    helperText={passwordError}
                />
                <TextField
                    margin="dense"
                    name="password_confirmation"
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    value={passwordFormData.password_confirmation}
                    onChange={handlePasswordFormChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained" color="error" sx={{ color: "white" }}>
                    Cancel
                </Button>
                <Button onClick={handlePasswordFormSubmit} variant="contained" color="success" sx={{ color: "white" }}>
                    Change
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChangePasswordDialog;
