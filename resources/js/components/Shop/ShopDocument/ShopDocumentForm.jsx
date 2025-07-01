import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import ImageUploadField from "../../Form/ImageUploadField";

const ShopDocumentForm = ({
  formData,
  errors,
  shops,
  onInputChange,
  onFileChange,
  onPreviewClick
}) => {
  const {
    shopId,
    panNumber,
    fssaiLicence,
    gstNumber,
    shopLicence,
    panPhotoPreview,
    fssaiDocPreview,
    gstDocPreview,
    shopLicenceDocPreview
  } = formData;

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {/* Shop Selection */}
      <Grid item xs={12}>
        <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
          Select Shop:
        </InputLabel>
        <Autocomplete
          options={shops}
          getOptionLabel={(option) => option.name}
          value={shops.find(shop => shop.id === shopId) || null}
          onChange={(event, newValue) => {
            onInputChange({ target: { name: 'shopId', value: newValue ? newValue.id : '' } });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select Shop"
              variant="outlined"
              fullWidth
              error={!!errors.shopId}
              helperText={errors.shopId}
            />
          )}
        />
      </Grid>

      {/* PAN Section */}
      <Grid item xs={12} md={6}>
        <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
          PAN Number:
        </InputLabel>
        <TextField
          placeholder="Enter PAN Number"
          variant="outlined"
          fullWidth
          name="panNumber"
          value={panNumber}
          onChange={onInputChange}
          error={!!errors.panNumber}
          helperText={errors.panNumber}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <ImageUploadField
          label="PAN Photo"
          preview={panPhotoPreview}
          onFileChange={(e) => onFileChange(e, 'panPhoto')}
          error={errors.panPhoto}
          onClickPreview={() => onPreviewClick(panPhotoPreview, 'PAN Photo')}
          id="pan-photo-upload"
        />
      </Grid>

      {/* FSSAI Section */}
      <Grid item xs={12} md={6}>
        <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
          FSSAI Licence Number:
        </InputLabel>
        <TextField
          placeholder="Enter FSSAI Licence Number"
          variant="outlined"
          fullWidth
          name="fssaiLicence"
          value={fssaiLicence}
          onChange={onInputChange}
          error={!!errors.fssaiLicence}
          helperText={errors.fssaiLicence}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <ImageUploadField
          label="FSSAI Licence Document"
          preview={fssaiDocPreview}
          onFileChange={(e) => onFileChange(e, 'fssaiDoc')}
          error={errors.fssaiDoc}
          onClickPreview={() => onPreviewClick(fssaiDocPreview, 'FSSAI Licence Document')}
          id="fssai-doc-upload"
        />
      </Grid>

      {/* GST Section */}
      <Grid item xs={12} md={6}>
        <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
          GST Number:
        </InputLabel>
        <TextField
          placeholder="Enter GST Number"
          variant="outlined"
          fullWidth
          name="gstNumber"
          value={gstNumber}
          onChange={onInputChange}
          error={!!errors.gstNumber}
          helperText={errors.gstNumber}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <ImageUploadField
          label="GST Document"
          preview={gstDocPreview}
          onFileChange={(e) => onFileChange(e, 'gstDoc')}
          error={errors.gstDoc}
          onClickPreview={() => onPreviewClick(gstDocPreview, 'GST Document')}
          id="gst-doc-upload"
        />
      </Grid>

      {/* Shop Licence Section */}
      <Grid item xs={12} md={6}>
        <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }} shrink>
          Shop Licence Number:
        </InputLabel>
        <TextField
          placeholder="Enter Shop Licence Number"
          variant="outlined"
          fullWidth
          name="shopLicence"
          value={shopLicence}
          onChange={onInputChange}
          error={!!errors.shopLicence}
          helperText={errors.shopLicence}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <ImageUploadField
          label="Shop Licence Document"
          preview={shopLicenceDocPreview}
          onFileChange={(e) => onFileChange(e, 'shopLicenceDoc')}
          error={errors.shopLicenceDoc}
          onClickPreview={() => onPreviewClick(shopLicenceDocPreview, 'Shop Licence Document')}
          id="shop-licence-doc-upload"
        />
      </Grid>
    </Grid>
  );
};

export default ShopDocumentForm;
