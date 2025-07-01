import React from "react";
import { Box, Button } from "@mui/material";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";

const ActionButtons = ({
  handleCancel,
  handleSubmit,
  loading,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", margin: 1 }}>
      <Button
        onClick={handleCancel}
        color="error"
        variant="contained"
        startIcon={<CancelTwoToneIcon />}
        sx={{ marginRight: 2, color: "white" }}
        disabled={loading}
      >
        {cancelLabel}
      </Button>
      <Button
        onClick={handleSubmit}
        color="success"
        variant="contained"
        startIcon={<SendTwoToneIcon />}
        disabled={loading}
        sx={{ color: "white" }}
      >
        {loading ? `${submitLabel}...` : submitLabel}
      </Button>
    </Box>
  );
};

export default ActionButtons;
