import React from "react";
import {
  Button,
  Box,
  Divider,
  Chip,
  Tooltip,
  Typography,
  CircularProgress,
} from "@mui/material";
import CloudUploadTwoToneIcon from "@mui/icons-material/CloudUploadTwoTone";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const AvatarUploader = ({
  avatar,
  avatarError,
  loading,
  avatarList,
  scrollIndex,
  handleFileChange,
  handleAvatarSelect,
  scrollLeft,
  scrollRight,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={avatar}
        alt="Avatar"
        style={{
          borderRadius: "50%",
          width: 150,
          height: 150,
          objectFit: "cover",
          border: "1px solid grey",
        }}
      />
      <label htmlFor="avatar-upload" style={{ marginTop: 10 }}>
        <input
          style={{ display: "none" }}
          id="avatar-upload"
          name="avatar-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <Button
          sx={{
            marginTop: 0.5,
            backgroundColor: "#10d915",
            color: "white",
            "&:hover": { backgroundColor: "#10d915" },
          }}
          variant="contained"
          component="span"
          startIcon={<CloudUploadTwoToneIcon />}
          disabled={loading}
        >
          Upload Avatar
        </Button>
      </label>
      {avatarError && (
        <Typography variant="body2" color="error">
          {avatarError}
        </Typography>
      )}
      <Box sx={{ display: "flex", alignItems: "center", marginY: 1 }}>
        <Divider sx={{ flexGrow: 1 }} />
        <Chip
          label="------ OR Choose Avatar ------"
          size="small"
          sx={{ margin: "0 5px" }}
        />
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      <Box sx={{ display: "flex", overflowX: "auto", paddingX: 2 }}>
        <Tooltip title="Previous avatars">
          <Button
            onClick={scrollLeft}
            sx={{ marginRight: 0.5, borderRadius: "50%" }}
            disabled={loading || scrollIndex === 0}
          >
            <ArrowBackRoundedIcon />
          </Button>
        </Tooltip>
        {avatarList.slice(scrollIndex, scrollIndex + 3).map((avatar, index) => (
          <Tooltip key={index} title="Click to select">
            <img
              src={avatar.path}
              alt="Avatar"
              style={{
                borderRadius: "50%",
                width: 60,
                height: 60,
                objectFit: "cover",
                border: "1px solid grey",
                marginRight: 2,
                cursor: "pointer",
              }}
              onClick={() => handleAvatarSelect(avatar.path, avatar.id)}
            />
          </Tooltip>
        ))}
        <Tooltip title="Next avatars">
          <Button
            onClick={scrollRight}
            sx={{ marginLeft: 0.5, borderRadius: "50%" }}
            disabled={
              loading || scrollIndex >= avatarList.length - 3 || avatarList.length <= 3
            }
          >
            <ArrowBackRoundedIcon sx={{ transform: "rotate(180deg)" }} />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default AvatarUploader;
