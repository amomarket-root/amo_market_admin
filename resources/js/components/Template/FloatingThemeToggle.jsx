import React from 'react';
import { useTheme } from './ThemeContext';
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const FloatingThemeToggle = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <Tooltip title={darkMode ? "Switch to light mode" : "Switch to dark mode"} arrow>
            <IconButton
                onClick={toggleTheme}
                sx={{
                    position: 'fixed',
                    top: 24,
                    right: 24,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'primary.dark',
                    },
                    width: 56,
                    height: 56,
                    boxShadow: 6,
                    zIndex: 1000,
                }}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
                {darkMode ? (
                    <Brightness7Icon sx={{ fontSize: 30 }} />
                ) : (
                    <Brightness4Icon sx={{ fontSize: 30 }} />
                )}
            </IconButton>
        </Tooltip>
    );
};

export default FloatingThemeToggle;
