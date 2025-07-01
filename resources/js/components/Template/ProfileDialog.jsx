import React, { useState } from "react";
import {Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField,Avatar,Box,Chip,Grid,CircularProgress,} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const ProfileDialog = ({
  open,
  onClose,
  profileData,
  loading,
  avatar,
  avatarList,
  scrollIndex,
  email,
  name,
  emailError,
  nameError,
  avatarError,
  handleAvatarClick,
  handleFileChange,
  scrollLeft,
  scrollRight,
  handleAvatarSelect,
  setEmail,
  setName,
  handleProfileUpdate,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>View Profile</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 1,
            }}
          >
            <CircularProgress />
          </Box>
        ) : profileData ? (
          <div style={{ textAlign: "center" }}>
            <Avatar
              alt={profileData.name}
              src={avatar}
              sx={{
                width: 100,
                height: 100,
                margin: "0 auto",
                mb: 1,
                cursor: "pointer",
              }}
              onClick={handleAvatarClick}
            />
            <input
              id="avatar-upload-input"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {avatarError && (
              <Box sx={{ color: "red", textAlign: "center", mt: 1 }}>
                {avatarError}
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Chip
                label="Click To Upload Picture OR Choose Avatar"
                size="medium"
                sx={{ margin: "0 5px" }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Button
                onClick={scrollLeft}
                sx={{
                  marginRight: 1,
                  borderRadius: "50%",
                  width: 40,
                  height: 60,
                  padding: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ArrowBackRoundedIcon />
              </Button>

              {avatarList
                .slice(scrollIndex, scrollIndex + 3)
                .map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar.path}
                    alt="Avatar"
                    style={{
                      borderRadius: "50%",
                      width: 60,
                      height: 60,
                      objectFit: "cover",
                      border: "1px solid grey",
                      marginRight: 8,
                      cursor: "pointer",
                    }}
                    onClick={() => handleAvatarSelect(avatar.path, avatar.id)}
                  />
                ))}

              <Button
                onClick={scrollRight}
                sx={{
                  marginRight: 1,
                  borderRadius: "50%",
                  width: 40,
                  height: 60,
                  padding: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ArrowBackRoundedIcon sx={{ transform: "rotate(180deg)" }} />
              </Button>
            </Box>

            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              variant="outlined"
              sx={{ mb: 1 }}
            />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Name"
                  type="text"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!nameError}
                  helperText={nameError}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </div>
        ) : (
          <p>No profile data available.</p>
        )}
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
          onClick={handleProfileUpdate}
          variant="contained"
          color="success"
          sx={{ color: "white" }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileDialog;
