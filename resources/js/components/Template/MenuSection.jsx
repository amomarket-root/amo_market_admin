import React, { useEffect, useState } from "react";
import { Menu} from "@mui/material";
import { useSweetAlert } from "./SweetAlert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfileDialog from "./ProfileDialog";
import PasswordDialog from "./PasswordDialog";
import MenuItems from "./MenuItems";

const MenuSection = ({ anchorEl, isMenuOpen, handleMenuClose, apiUrl, fetchAvatar }) => {
  const navigate = useNavigate();
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [viewProfileOpen, setViewProfileOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });
  const [showPassword, setShowPassword] = useState({
    old_password: false,
    password: false,
    password_confirmation: false,
  });
  const [profileData, setProfileData] = useState(null);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [roleName, setRoleName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("/image/portal/avatar.png");
  const [avatarId, setAvatarId] = useState(null);
  const [selectedAvatarId, setSelectedAvatarId] = useState(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [avatarList, setAvatarList] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const showAlert = useSweetAlert();

  const handleProfileUpdate = () => {
    setNameError("");
    setEmailError("");
    setAvatarError("");
    setLoading(true);

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("user_id", user);
    formData.append("name", name);
    formData.append("role_id", roleName);
    formData.append("email", email);

    if (selectedAvatarId) {
      formData.append("main_avatar", selectedAvatarId);
    } else if (avatarFile) {
      formData.append("main_avatar", avatarFile);
    } else {
      formData.append("main_avatar", avatarId);
    }

    axios
      .post(`${apiUrl}/admin/update_profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const userData = response.data;
        fetchAvatar();
        showAlert({
          title: "Success!",
          text: userData.message,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
        });
        handleCloseViewProfileDialog();
        navigate("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          if (error.response.data && error.response.data.errors) {
            if (error.response.data.errors.name) {
              setNameError(error.response.data.errors.name[0]);
            }
            if (error.response.data.errors.email) {
              setEmailError(error.response.data.errors.email[0]);
            }
            if (error.response.data.errors.main_avatar) {
              setAvatarError(error.response.data.errors.main_avatar[0]);
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

  const handleViewProfile = async () => {
    setViewProfileOpen(true);
    handleMenuClose();
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const [profileResponse, avatarsResponse] = await Promise.all([
        axios.get(`${apiUrl}/admin/view_profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(`${apiUrl}/admin/avatars`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (profileResponse.data.status) {
        const userData = profileResponse.data.user;
        setProfileData(userData);
        setUser(userData.id);
        setName(userData.name);
        setRoleName(userData.role_id);
        setEmail(userData.email);
        setAvatarId(userData.avatar_id);
        setAvatar(userData.avatar?.path ?? "/image/avatar.webp");
      } else {
        showAlert({
          title: "Error!",
          text: "Failed to fetch profile details.",
          icon: "error",
        });
      }

      const avatars = avatarsResponse.data.map((avatar) => ({
        id: avatar.id,
        path: avatar.path,
      }));
      setAvatarList(avatars);
    } catch (error) {
      console.error("Error fetching profile:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseViewProfileDialog = () => {
    setViewProfileOpen(false);
    setProfileData(null);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${apiUrl}/admin/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.status === true) {
        showAlert({
          title: "Success!",
          text: response.data.message || "Logout successful",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          localStorage.clear();
          navigate("/login");
          //window.location.reload();
        });
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/login");
    }
    handleMenuClose();
  };

  const handleCustomerSupport = () => {
    navigate("/support/customer-support");
    handleMenuClose();
  };

  const handleChangePassword = () => {
    setChangePasswordOpen(true);
    handleMenuClose();
  };

  const handleCloseChangePasswordDialog = () => {
    setChangePasswordOpen(false);
    setPasswordFormData({
      old_password: "",
      password: "",
      password_confirmation: "",
    });
  };

  const handlePasswordFormChange = (event) => {
    const { name, value } = event.target;
    setPasswordFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleToggleShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePasswordFormSubmit = () => {
    setOldPasswordError("");
    setPasswordError("");

    const token = localStorage.getItem("token");

    axios
      .post(`${apiUrl}/admin/change_password`, passwordFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        showAlert({
          title: "Success!",
          text: response.data.message,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
        });
        handleCloseChangePasswordDialog();
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          const errors = error.response.data.errors;
          if (errors.old_password) setOldPasswordError(errors.old_password[0]);
          if (errors.password) setPasswordError(errors.password[0]);
        } else {
          showAlert({
            title: "Error!",
            text: "Server error or network issue. Please try again later.",
            icon: "error",
          });
        }
      });
  };

  const scrollLeft = () => {
    setScrollIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const scrollRight = () => {
    setScrollIndex((prevIndex) => Math.min(prevIndex + 1, avatarList.length - 1));
  };

  const handleAvatarClick = () => {
    document.getElementById("avatar-upload-input").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setAvatar(URL.createObjectURL(file));
        setAvatarFile(file);
        setSelectedAvatarId(null);
        setAvatarError("");
      } else {
        setAvatarError("The file must be an image.");
      }
    }
  };

  const handleAvatarSelect = (avatarUrl, avatarId) => {
    setAvatar(avatarUrl);
    setSelectedAvatarId(avatarId);
    setAvatarFile(null);
  };

  useEffect(() => {
    return () => {
      if (avatar.startsWith("blob:")) {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);

  useEffect(() => {}, [apiUrl]);

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItems
          handleViewProfile={handleViewProfile}
          handleChangePassword={handleChangePassword}
          handleCustomerSupport={handleCustomerSupport}
          handleLogout={handleLogout}
        />
      </Menu>

      <ProfileDialog
        open={viewProfileOpen}
        onClose={handleCloseViewProfileDialog}
        profileData={profileData}
        loading={loading}
        avatar={avatar}
        avatarList={avatarList}
        scrollIndex={scrollIndex}
        email={email}
        name={name}
        emailError={emailError}
        nameError={nameError}
        avatarError={avatarError}
        handleAvatarClick={handleAvatarClick}
        handleFileChange={handleFileChange}
        scrollLeft={scrollLeft}
        scrollRight={scrollRight}
        handleAvatarSelect={handleAvatarSelect}
        setEmail={setEmail}
        setName={setName}
        handleProfileUpdate={handleProfileUpdate}
      />

      <PasswordDialog
        open={changePasswordOpen}
        onClose={handleCloseChangePasswordDialog}
        passwordFormData={passwordFormData}
        showPassword={showPassword}
        oldPasswordError={oldPasswordError}
        passwordError={passwordError}
        handlePasswordFormChange={handlePasswordFormChange}
        handleToggleShowPassword={handleToggleShowPassword}
        handlePasswordFormSubmit={handlePasswordFormSubmit}
      />
    </>
  );
};

export default MenuSection;
