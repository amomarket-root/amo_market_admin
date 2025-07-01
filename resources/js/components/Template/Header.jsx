import React, { useCallback, useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, Typography, Divider, Tooltip } from '@mui/material';
import { useTheme as useMuiTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import OpenWithIcon from '@mui/icons-material/OpenWith';
import CloseIcon from '@mui/icons-material/Close';
import CropFreeIcon from '@mui/icons-material/CropFree';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Avatar } from '@mui/material';
import { useNavigate } from "react-router-dom";
import MenuSection from "./MenuSection";
import { useTheme } from "./ThemeContext";

const Header = ({
    toggleFullScreen,
}) => {
    const [isMenuOpenHide, setIsMenuOpenHide] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const muiTheme = useMuiTheme();
    const navigate = useNavigate();
    const { darkMode, toggleTheme } = useTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
    const apiUrl = import.meta.env.VITE_API_URL;
    const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);
    const [avatarPath, setAvatarPath] = useState(
        localStorage.getItem("admin_avatar") || "/image/avatar.webp"
    );

    const handleAvatarMenuOpen = (event) => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate("/login");
        } else {
            setAvatarAnchorEl(event.currentTarget);
        }
    };

    const handleMenuHideToggle = () => {
        setIsMenuOpenHide((prev) => !prev);
        toggleFullScreen();
    };

    const handleFullscreenToggle = () => {
        if (!isFullscreen) {
            document.documentElement.requestFullscreen().catch((error) => {
                console.error("Error attempting to enter fullscreen mode:", error);
            });
        } else {
            if (document.fullscreenElement) {
                document.exitFullscreen().catch((error) => {
                    console.error("Error attempting to exit fullscreen mode:", error);
                });
            }
        }
        setIsFullscreen((prev) => !prev);
    };

    const handleMenuClose = () => {
        setAvatarAnchorEl(null);
    };
    const isAvatarMenuOpen = Boolean(avatarAnchorEl);

    const fetchAvatar = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch(`${apiUrl}/admin/get_avatar`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (data.status && data.data?.path) {
                if (localStorage.getItem('admin_avatar')) {
                    localStorage.removeItem('admin_avatar');
                }
                setAvatarPath(data.data.path);
                localStorage.setItem("admin_avatar", data.data.path);
            }
        } catch (error) {
            console.error("Failed to fetch avatar:", error);
        }
    }, [apiUrl]);

    useEffect(() => {
        fetchAvatar();
    }, [fetchAvatar]);

    return (
        <AppBar
            position="fixed"
            color="transparent"
            elevation={0}
            sx={{
                zIndex: 1201,
                boxShadow: '0 6px 10px rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(15px)',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                backgroundColor: 'var(--appbar-bg)',
                color: 'var(--text-primary)',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', padding: '0 16px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <img
                        src="/image/amo_market_logo.webp"
                        alt="Amo Market Logo"
                        style={{
                            height: '50px',
                            width: 'auto',
                            objectFit: 'contain',
                        }}
                    />
                    <Box
                        sx={{
                            marginLeft: 3,
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                            bgcolor: 'background.paper',
                            color: 'text.secondary',
                            '& svg': {
                                m: 1,
                            },
                        }}
                    >
                        <Tooltip title={isMenuOpenHide ? "Appear Sidebar Menu" : "Hide Sidebar Menu"}>
                            {isMenuOpenHide ? (
                                <CloseIcon
                                    onClick={handleMenuHideToggle}
                                    sx={{ color: "#2eee07" }}
                                />
                            ) : (
                                <OpenWithIcon
                                    onClick={handleMenuHideToggle}
                                    sx={{ color: "#9F63FF" }}
                                />
                            )}
                        </Tooltip>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <Tooltip title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
                            {isFullscreen ? (
                                <FullscreenExitIcon
                                    onClick={handleFullscreenToggle}
                                    sx={{ color: "#2eee07" }}
                                />
                            ) : (
                                <CropFreeIcon
                                    onClick={handleFullscreenToggle}
                                    sx={{ color: "#9F63FF" }}
                                />
                            )}
                        </Tooltip>
                    </Box>
                </Box>
                <IconButton onClick={toggleTheme} color="inherit">
                    {darkMode ? (
                        <Brightness7Icon sx={{ fontSize: 35 }} />
                    ) : (
                        <Brightness4Icon sx={{ fontSize: 35 }} />
                    )}
                </IconButton>
                <IconButton color="inherit" onClick={handleAvatarMenuOpen}>
                    <Avatar
                        alt="Avatar"
                        src={avatarPath}
                        sx={{
                            width: 40,
                            height: 40,
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                        }}
                    />
                </IconButton>

                <MenuSection
                    anchorEl={avatarAnchorEl}
                    isMenuOpen={isAvatarMenuOpen}
                    handleMenuClose={handleMenuClose}
                    apiUrl={apiUrl}
                    setAnchorEl={setAvatarAnchorEl}
                    fetchAvatar={fetchAvatar}
                />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
