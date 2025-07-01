import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import PrivateRoute from '../Route/PrivateRoute';
import { Box, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const MainContent = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    margin: theme.spacing(0, 1),
    padding: theme.spacing(0.1),
    paddingTop: theme.spacing(9),
    display: "flex",
    flexDirection: "column",
    opacity: 0,
    transform: "translateY(10px)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
    animation: "fadeSlideIn 0.3s ease forwards",
    "@keyframes fadeSlideIn": {
        "0%": {
            opacity: 0,
            transform: "translateY(20px)",
        },
        "100%": {
            opacity: 1,
            transform: "translateY(0)",
        },
    },
}));

const MainLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('down'); // 'up' or 'down'
    const [isHovered, setIsHovered] = useState(false);
    const [isManualToggle, setIsManualToggle] = useState(false);
    const lastScrollY = useRef(0);

    const handleMouseEnter = () => {
        if (!isManualToggle) {
            setIsHovered(true);
            setSidebarCollapsed(false);
        }
    };

    const handleMouseLeave = () => {
        if (!isManualToggle) {
            setIsHovered(false);
            setSidebarCollapsed(true);
        }
    };

    const toggleCollapse = () => {
        setIsManualToggle(true);
        setSidebarCollapsed(!sidebarCollapsed);
        setIsHovered(false);
    };

    const toggleFullScreen = () => {
        setFullScreen(!fullScreen);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [children]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;

            const isAtBottom = scrollY + clientHeight >= scrollHeight - 10;
            const isAtTop = scrollY <= 10;

            const scrollDiff = scrollY - lastScrollY.current;

            // Direction: positive = down, negative = up
            if (Math.abs(scrollDiff) > 10) {
                setScrollDirection(scrollDiff > 0 ? 'down' : 'up');
            }

            // Show scroll button if not very top or bottom
            setShowScrollBtn(!isAtBottom && !isAtTop);

            lastScrollY.current = scrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScrollAction = () => {
        if (scrollDirection === 'up') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                minHeight: '100vh',
                overflow: fullScreen ? 'hidden' : 'auto',
            }}
        >
            {!fullScreen && (
                <Sidebar
                    open={sidebarOpen}
                    collapsed={sidebarCollapsed}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    toggleCollapse={toggleCollapse}
                    isManualToggle={isManualToggle}
                />
            )}
            <div
                style={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    width: fullScreen ? '100vw' : 'auto',
                }}
            >
                <Header
                    toggleSidebarCollapse={toggleCollapse}
                    sidebarCollapsed={sidebarCollapsed}
                    toggleFullScreen={toggleFullScreen}
                />

                <PrivateRoute>
                    <MainContent>
                        {children}
                    </MainContent>
                </PrivateRoute>
            </div>

            {/* Unified Scroll Button */}
            {showScrollBtn && (
                <Tooltip title={scrollDirection === 'up' ? "Scroll To Top" : "Scroll To Bottom"} arrow>
                    <IconButton
                        onClick={handleScrollAction}
                        sx={{
                            position: 'fixed',
                            bottom: 16,
                            right: 16,
                            backgroundColor: scrollDirection === 'up' ? 'primary.main' : 'primary.main',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: scrollDirection === 'up' ? 'primary.dark' : 'primary.dark',
                            },
                            width: 48,
                            height: 48,
                            boxShadow: 5,
                            zIndex: 1300,
                        }}
                    >
                        {scrollDirection === 'up' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                    </IconButton>
                </Tooltip>
            )}
        </div>
    );
};

export default MainLayout;
