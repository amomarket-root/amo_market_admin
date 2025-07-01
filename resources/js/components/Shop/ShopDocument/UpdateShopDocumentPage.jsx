import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";

// Reusable components
import PageHeader from "../../Form/PageHeader";
import ActionButtons from "../../Form/ActionButtons";
import ShopDocumentForm from "./ShopDocumentForm";
import DocumentPreviewModal from "../../Form/DocumentPreviewModal";
import { useSnackbar } from '../../Template/SnackbarAlert';
import { useSweetAlert } from "../../Template/SweetAlert";

const UpdateShopDocumentPage = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const showAlert = useSweetAlert();
  const showSnackbar = useSnackbar();
  const apiUrl = import.meta.env.VITE_API_URL;

  // Form state
  const [formData, setFormData] = useState({
    shopId: "",
    panNumber: "",
    fssaiLicence: "",
    gstNumber: "",
    shopLicence: "",
    panPhotoFile: null,
    panPhotoPreview: "/image/no_image.webp",
    fssaiDocFile: null,
    fssaiDocPreview: "/image/no_image.webp",
    gstDocFile: null,
    gstDocPreview: "/image/no_image.webp",
    shopLicenceDocFile: null,
    shopLicenceDocPreview: "/image/no_image.webp"
  });

  const [errors, setErrors] = useState({
    shopId: '',
    panNumber: '',
    panPhoto: '',
    fssaiLicence: '',
    fssaiDoc: '',
    gstNumber: '',
    gstDoc: '',
    shopLicence: '',
    shopLicenceDoc: ''
  });

  const [loading, setLoading] = useState(false);
  const [shops, setShops] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentPreview, setCurrentPreview] = useState(null);
  const [currentPreviewTitle, setCurrentPreviewTitle] = useState("");

  const handleBackClick = () => navigate(-1);
  const handleCancelClick = () => navigate("/shop-document");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileTypes = {
      panPhoto: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      fssaiDoc: ['application/pdf', 'image/jpeg', 'image/png'],
      gstDoc: ['application/pdf', 'image/jpeg', 'image/png'],
      shopLicenceDoc: ['application/pdf', 'image/jpeg', 'image/png']
    };

    const maxSize = 5 * 1024 * 1024; // 5MB

    // Validate file type
    if (!fileTypes[field].some(type => file.type.includes(type))) {
      setErrors(prev => ({ ...prev, [`${field}`]: `File must be one of: ${fileTypes[field].join(', ')}` }));
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      setErrors(prev => ({ ...prev, [`${field}`]: 'File size should be less than 5MB' }));
      return;
    }

    // Clear error
    setErrors(prev => ({ ...prev, [`${field}`]: '' }));

    // Create preview
    let preview;
    if (file.type.startsWith('image/')) {
      preview = URL.createObjectURL(file);
    } else if (file.type === 'application/pdf') {
      preview = {
        url: URL.createObjectURL(file),
        name: file.name,
        type: 'pdf'
      };
    }

    // Update state
    setFormData(prev => ({
      ...prev,
      [`${field}File`]: file,
      [`${field}Preview`]: preview
    }));
  };

  const handlePreviewClick = (preview, title) => {
    if (!preview) return;
    setCurrentPreview(preview);
    setCurrentPreviewTitle(title);
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setCurrentPreview(null);
    setCurrentPreviewTitle("");
  };

  const handleSubmit = () => {
    // Clear previous errors
    setErrors({
      shopId: '',
      panNumber: '',
      panPhoto: '',
      fssaiLicence: '',
      fssaiDoc: '',
      gstNumber: '',
      gstDoc: '',
      shopLicence: '',
      shopLicenceDoc: ''
    });

    setLoading(true);

    const token = localStorage.getItem('token');
    const formDataToSend = new FormData();

    // Add text fields
    formDataToSend.append('document_id', documentId);
    formDataToSend.append('shop_id', formData.shopId);
    formDataToSend.append('PAN_Number', formData.panNumber);
    formDataToSend.append('FSSAI_Licence', formData.fssaiLicence);
    formDataToSend.append('GST_number', formData.gstNumber);
    formDataToSend.append('Shop_Licence', formData.shopLicence);

    // Add files if they exist
    if (formData.panPhotoFile) formDataToSend.append('PAN_Photo_file', formData.panPhotoFile);
    if (formData.fssaiDocFile) formDataToSend.append('FSSAI_Licence_Document_file', formData.fssaiDocFile);
    if (formData.gstDocFile) formDataToSend.append('GST_Document_file', formData.gstDocFile);
    if (formData.shopLicenceDocFile) formDataToSend.append('Shop_Licence_Document_file', formData.shopLicenceDocFile);

    axios.post(`${apiUrl}/admin/shop_document/update`, formDataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        const documentData = response.data;
        showSnackbar(documentData.message, { severity: 'success' });
        setTimeout(() => {
          setLoading(false);
          navigate("/shop-document");
        }, 2000);
      })
      .catch(error => {
        setLoading(false);
        if (error.response) {
          if (error.response.data && error.response.data.errors) {
            // Handle validation errors
            const newErrors = { ...errors };
            Object.keys(error.response.data.errors).forEach(key => {
              const fieldMap = {
                'shop_id': 'shopId',
                'PAN_Number': 'panNumber',
                'PAN_Photo_file': 'panPhoto',
                'FSSAI_Licence': 'fssaiLicence',
                'FSSAI_Licence_Document_file': 'fssaiDoc',
                'GST_number': 'gstNumber',
                'GST_Document_file': 'gstDoc',
                'Shop_Licence': 'shopLicence',
                'Shop_Licence_Document_file': 'shopLicenceDoc'
              };
              const field = fieldMap[key];
              if (field) {
                newErrors[field] = error.response.data.errors[key][0];
              }
            });
            setErrors(newErrors);
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

  useEffect(() => {
    const fetchShopDocument = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
          `${apiUrl}/admin/shop_document/find`,
          qs.stringify({ id: documentId }),
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        const documentData = response.data.data;
        setFormData({
          shopId: documentData.shop_id || "",
          panNumber: documentData.PAN_Number || "",
          fssaiLicence: documentData.FSSAI_Licence || "",
          gstNumber: documentData.GST_number || "",
          shopLicence: documentData.Shop_Licence || "",
          panPhotoPreview: documentData.PAN_Photo || "/image/no_image.webp",
          fssaiDocPreview: documentData.FSSAI_Licence_Document || "/image/no_image.webp",
          gstDocPreview: documentData.GST_Document || "/image/no_image.webp",
          shopLicenceDocPreview: documentData.Shop_Licence_Document || "/image/no_image.webp",
          panPhotoFile: null,
          fssaiDocFile: null,
          gstDocFile: null,
          shopLicenceDocFile: null
        });
      } catch (error) {
        showAlert({
          title: "Error!",
          text: "Error fetching shop document data: " + error.message,
          icon: "error",
        });
      }
    };

    const fetchShops = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/admin/shop/get_all_shop`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setShops(response.data.data);
      } catch (error) {
        showAlert({
          title: "Error!",
          text: 'Error fetching shops: ' + error.message,
          icon: "error",
        });
      }
    };

    fetchShopDocument();
    fetchShops();
  }, [documentId, apiUrl]);

  useEffect(() => {
    return () => {
      // Clean up object URLs
      ['panPhotoPreview', 'fssaiDocPreview', 'gstDocPreview', 'shopLicenceDocPreview'].forEach(field => {
        if (formData[field] && typeof formData[field] === 'string' && formData[field].startsWith('blob:')) {
          URL.revokeObjectURL(formData[field]);
        } else if (formData[field]?.url && formData[field].url.startsWith('blob:')) {
          URL.revokeObjectURL(formData[field].url);
        }
      });
    };
  }, [formData]);

  return (
    <Box sx={{ display: "flex" }}>
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          overflow: "hidden",
          padding: "4px",
          borderRadius: "10px",
        }}
      >
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {!loading && (
          <>
            <PageHeader title="Update Shop Documents" handleBackClick={handleBackClick} />
            <Divider sx={{ marginY: 1 }} />

            <ShopDocumentForm
              formData={formData}
              errors={errors}
              shops={shops}
              onInputChange={handleInputChange}
              onFileChange={handleFileChange}
              onPreviewClick={handlePreviewClick}
            />

            <Divider sx={{ marginY: 2 }} />
            <ActionButtons
              handleCancel={handleCancelClick}
              handleSubmit={handleSubmit}
              loading={loading}
              submitLabel="Update Shop Documents"
            />
          </>
        )}
      </Paper>

      <DocumentPreviewModal
        open={previewOpen}
        onClose={closePreview}
        preview={currentPreview?.url || currentPreview}
        title={currentPreviewTitle}
      />
    </Box>
  );
};

export default UpdateShopDocumentPage;
