import React from "react";
import {
  Grid,
  TextField,
  InputLabel,
  Autocomplete,
  CircularProgress,
} from "@mui/material";

const UserFormFields = ({
  name,
  setName,
  nameError,
  email,
  setEmail,
  emailError,
  password,
  setPassword,
  passwordError,
  password_confirmation,
  setPasswordConfirm,
  passwordConfirmationError,
  roles,
  roleName,
  setRoleName,
  roleNameError,
  status,
  setStatus,
  statusError,
  loading,
  isUpdate = false,
}) => {
  return (
    <Grid container spacing={2} sx={{ marginBottom: 3 }}>
      <Grid item xs={12} md={6}>
        <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
          Name :
        </InputLabel>
        <TextField
          placeholder="Enter User Name"
          variant="outlined"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!nameError}
          helperText={nameError}
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
          Email :
        </InputLabel>
        <TextField
          placeholder="Enter Email Address"
          variant="outlined"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          disabled={loading}
        />
      </Grid>
      {!isUpdate && (
        <>
          <Grid item xs={12} md={6}>
            <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
              Password :
            </InputLabel>
            <TextField
              placeholder="Enter Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
              Confirm Password :
            </InputLabel>
            <TextField
              placeholder="Enter Confirm Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password_confirmation}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              error={!!passwordConfirmationError}
              helperText={passwordConfirmationError}
              disabled={loading}
            />
          </Grid>
        </>
      )}
      <Grid item xs={12} md={6}>
        <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
          Select Role :
        </InputLabel>
        <Autocomplete
          options={roles}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          loading={loading}
          value={roles.find((role) => role.id === roleName) || null}
          onChange={(event, newValue) => {
            setRoleName(newValue ? newValue.id : "");
          }}
          disabled={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Choose Role Name"
              variant="outlined"
              fullWidth
              error={Boolean(roleNameError)}
              helperText={roleNameError}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
          Status :
        </InputLabel>
        <TextField
          select
          placeholder="Select Status"
          variant="outlined"
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          error={!!statusError}
          helperText={statusError}
          disabled={loading}
          SelectProps={{
            native: true,
          }}
        >
          <option value={1}>Active</option>
          <option value={2}>Pending</option>
          <option value={0}>Inactive</option>
        </TextField>
      </Grid>
    </Grid>
  );
};

export default UserFormFields;
