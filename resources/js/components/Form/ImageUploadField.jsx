import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import ImageTwoToneIcon from "@mui/icons-material/ImageTwoTone";
import Typography from "@mui/material/Typography";

const ImageUploadField = ({
  label,
  preview,
  onFileChange,
  error,
  accept = "image/jpeg,image/png,image/gif,image/webp",
  onClickPreview,
  id,
  startIcon = <ImageTwoToneIcon />
}) => {
  return (
    <Box>
      <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
        {label}:
      </InputLabel>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          onClick={onClickPreview}
          sx={{
            cursor: 'pointer',
            width: 80,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ddd',
            borderRadius: 4,
            overflow: 'hidden'
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <ImageTwoToneIcon color="disabled" />
          )}
        </Box>
        <label htmlFor={id}>
          <input
            style={{ display: 'none' }}
            id={id}
            type="file"
            accept={accept}
            onChange={onFileChange}
          />
          <Button
            variant="contained"
            component="span"
            startIcon={startIcon}
          >
            Upload
          </Button>
        </label>
      </Box>
      {error && <Typography variant="body2" color="error">{error}</Typography>}
    </Box>
  );
};

export default ImageUploadField;
