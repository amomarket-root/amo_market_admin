import React from "react";
import { Grid, Typography, Tooltip } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useTheme } from '@mui/material/styles';
import { useTheme as useCustomTheme } from '../Template/ThemeContext';

const PageHeader = ({ title, handleBackClick }) => {
    const theme = useTheme();
    const { darkMode } = useCustomTheme();

    return (
        <Grid
            item
            container
            alignItems="center"
            spacing={1}
            xs={12}
            sm="auto"
            sx={{
                flexDirection: { xs: "column", sm: "row" },
                marginY: 1,
                paddingX: { xs: 1, sm: 2 },
            }}
        >
            {/* Back Icon */}
            <Grid item>
                <Tooltip title="Return Back">
                    <IconButton
                        onClick={handleBackClick}
                        sx={{
                            backgroundColor: darkMode ? theme.palette.grey[800] : "#f0f0f0",
                            "&:hover": {
                                backgroundColor: darkMode ? theme.palette.grey[700] : "#e0e0e0",
                            },
                        }}
                    >
                        <ArrowBackRoundedIcon color={darkMode ? "primary" : "disabled"} />
                    </IconButton>
                </Tooltip>
            </Grid>

            {/* Title */}
            <Grid item xs>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textAlign: { xs: "center", md: "left" },
                        width: "100%",
                        color: darkMode ? theme.palette.text.primary : 'inherit',
                    }}
                >
                    {title}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default PageHeader;
