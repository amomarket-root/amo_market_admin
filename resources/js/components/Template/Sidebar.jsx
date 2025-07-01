import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import EventSeatTwoToneIcon from '@mui/icons-material/EventSeatTwoTone';
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import SupervisedUserCircleTwoToneIcon from '@mui/icons-material/SupervisedUserCircleTwoTone';
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import HomeWorkTwoToneIcon from '@mui/icons-material/HomeWorkTwoTone';
import PrivacyTipTwoToneIcon from '@mui/icons-material/PrivacyTipTwoTone';
import GavelTwoToneIcon from '@mui/icons-material/GavelTwoTone';
import SecurityTwoToneIcon from '@mui/icons-material/SecurityTwoTone';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import InfoIcon from '@mui/icons-material/Info';
import StorefrontIcon from '@mui/icons-material/Storefront';
import StoreTwoToneIcon from '@mui/icons-material/StoreTwoTone';
import AddBusinessTwoToneIcon from '@mui/icons-material/AddBusinessTwoTone';
import TrackChangesTwoToneIcon from '@mui/icons-material/TrackChangesTwoTone';
import SwapHorizontalCircleTwoToneIcon from '@mui/icons-material/SwapHorizontalCircleTwoTone';
import CategoryIcon from '@mui/icons-material/Category';
import ContactPhoneTwoToneIcon from '@mui/icons-material/ContactPhoneTwoTone';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
import AllInboxTwoToneIcon from '@mui/icons-material/AllInboxTwoTone';
import PermMediaTwoToneIcon from '@mui/icons-material/PermMediaTwoTone';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Crop169Icon from '@mui/icons-material/Crop169';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CropPortraitIcon from '@mui/icons-material/CropPortrait';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ElectricMopedTwoToneIcon from '@mui/icons-material/ElectricMopedTwoTone';
import { styled, keyframes } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useTheme as useCustomTheme } from './ThemeContext';

const drawerWidth = 240;
const collapsedWidth = 60;

const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const StyledDrawer = styled(Drawer)(({ theme, collapsed }) => ({
    width: collapsed ? collapsedWidth : drawerWidth,
    flexShrink: 0,
    animation: `${slideIn} 0.5s ease-out`,
    overflow: 'visible',
    '& .MuiDrawer-paper': {
        overflow: 'visible',
        width: collapsed ? collapsedWidth : drawerWidth,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#f9f9f9',
        top: '64px',
        height: 'calc(100vh - 50px)',
        animation: `${slideIn} 0.5s ease-out`,
        borderRadius: '0 10px 10px 0',
        boxShadow: '0 6px 10px rgba(0, 0, 0, 0.3)',
        transition: 'width 0.3s ease',
        color: theme.palette.text.primary,
    },
}));

const StyledListItemText = styled(ListItemText)(({ theme, collapsed }) => ({
    display: collapsed ? 'none' : 'block',
    transition: 'display 0.3s ease',
    color: 'inherit',
}));

const StyledListItem = styled(ListItem)(({ theme, selected }) => ({
    ...(selected && {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : '#dbbef1',
        color: theme.palette.mode === 'dark' ? theme.palette.common.white : '#10d915',
        '& .MuiListItemIcon-root': {
            color: theme.palette.mode === 'dark' ? theme.palette.common.white : '#10d915'
        },
    }),
    borderRadius: '20px',
    marginBottom: theme.spacing(1),
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? '#dbbef1' : '#dbbef1',
        color: theme.palette.mode === 'dark' ? theme.palette.common.white : 'inherit',
    },
    overflow: 'hidden',
    color: 'inherit',
}));

const SearchContainer = styled('div')(({ theme, collapsed }) => ({
    display: collapsed ? 'none' : 'flex',
    padding: theme.spacing(1, 2),
    marginBottom: theme.spacing(1),
    transition: 'all 0.3s ease',
}));

function Sidebar({ open, collapsed, onMouseEnter, onMouseLeave, toggleCollapse, isManualToggle }) {
    const [expandedMenu, setExpandedMenu] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const { darkMode } = useCustomTheme();

    const handleListItemClick = (path) => navigate(path);

    const handleMenuClick = (menu) => {
        setExpandedMenu(expandedMenu === menu ? null : menu);
    };

    const isSubmenuSelected = (submenuPaths) =>
        submenuPaths.some((submenuPath) => location.pathname === submenuPath || location.pathname.startsWith(`${submenuPath}/`));

    React.useEffect(() => {
        const path = location.pathname;
        if (['/user', '/role', '/privilege', '/active-log', '/avatar', '/address'].some(p => path.startsWith(p))) {
            setExpandedMenu('account');
        } else if (['/category', '/subcategory', '/product', '/product-information'].some(p => path.startsWith(p))) {
            setExpandedMenu('products');
        } else if (['/advisement', '/banner'].some(p => path.startsWith(p))) {
            setExpandedMenu('multimedia');
        } else if (['/shop', '/shop-type', '/shop-document','/shop-bank-account'].some(p => path.startsWith(p))) {
            setExpandedMenu('shops');
        } else if (['/delivery_person', '/delivery_person_bank_account'].some(p => path.startsWith(p))) {
            setExpandedMenu('delivery');
        } else if (['/about-us', '/contact-us', '/blog', '/career', '/privacy-policy', '/term', '/security', '/delivery-page', '/shop-page'].some(p => path.startsWith(p))) {
            setExpandedMenu('information');
        } else if (['/telescope', '/horizon '].some(p => path.startsWith(p))) {
            setExpandedMenu('tools');
        } else {
            setExpandedMenu(null);
        }
    }, [location.pathname]);

    const handleSearchChange = (event) =>
        setSearchTerm(event.target.value.toLowerCase());

    const menuItems = [{
        primary: 'Dashboard',
        icon: <SpaceDashboardIcon color={darkMode ? "primary" : "inherit"} />,
        path: '/dashboard',
    },
    {
        primary: 'Account',
        icon: <ManageAccountsIcon color={darkMode ? "primary" : "inherit"} />,
        submenu: 'account',
        items: [
            { primary: 'Users', icon: <SwitchAccountIcon color={darkMode ? "primary" : "inherit"} />, path: '/user' },
            { primary: 'Roles', icon: <EventSeatTwoToneIcon color={darkMode ? "primary" : "inherit"} />, path: '/role' },
            { primary: 'Privileges', icon: <AdminPanelSettingsTwoToneIcon color={darkMode ? "primary" : "inherit"} />, path: '/privilege' },
            { primary: 'Active Log', icon: <InfoIcon color={darkMode ? "primary" : "inherit"} />, path: '/active-log' },
            { primary: 'Avatar', icon: <SupervisedUserCircleTwoToneIcon color={darkMode ? "primary" : "inherit"} />, path: '/avatar' },
            { primary: 'User Address', icon: <HomeTwoToneIcon color={darkMode ? "primary" : "inherit"} />, path: '/address' },
        ],
    },
    {
        primary: 'Shops',
        icon: <StorefrontIcon color={darkMode ? "primary" : "inherit"} />,
        submenu: 'shops',
        items: [
            { primary: 'Shop', icon: <StoreTwoToneIcon color={darkMode ? "primary" : "inherit"} />, path: '/shop' },
            { primary: 'Shop Type', icon: <AddBusinessTwoToneIcon color={darkMode ? "primary" : "inherit"} />, path: '/shop-type' },
            { primary: 'Shop Doc.', icon: <InfoIcon color={darkMode ? "primary" : "inherit"} />, path: '/shop-document' },
            { primary: 'Shop Bank Account', icon: <AccountBalanceIcon color={darkMode ? "primary" : "inherit"} />, path: '/shop-bank-account' },
        ],
    },
    {
        primary: 'Products',
        icon: <CategoryIcon color={darkMode ? "primary" : "inherit"} />,
        submenu: 'products',
        items: [
            { primary: 'Category', icon: <VideoLabelIcon color={darkMode ? "primary" : "inherit"} />, path: '/category' },
            { primary: 'Subcategory', icon: <DynamicFeedIcon color={darkMode ? "primary" : "inherit"} />, path: '/subcategory' },
            { primary: 'Product', icon: <Inventory2TwoToneIcon color={darkMode ? "primary" : "inherit"} />, path: '/product' },
            { primary: 'ProductInfo', icon: <AllInboxTwoToneIcon color={darkMode ? "primary" : "inherit"} />, path: '/product-information' },
        ],
    },
    {
        primary: 'Delivery',
        icon: <ElectricMopedTwoToneIcon color={darkMode ? "primary" : "inherit"} />,
        submenu: 'delivery',
        items: [
            { primary: 'Delivery Person', icon: <DirectionsBikeIcon color={darkMode ? "primary" : "inherit"} />, path: '/delivery_person' },
            { primary: 'Delivery Person Account', icon: <AccountBalanceIcon color={darkMode ? "primary" : "inherit"} />, path: '/delivery-person-bank-account' },
        ],
    },
    {
        primary: 'order',
        icon: <ShoppingBagTwoToneIcon color={darkMode ? "primary" : "inherit"} />,
        path: '/order',
    },
    {
        primary: 'Multimedia',
        icon: <PermMediaTwoToneIcon color={darkMode ? "primary" : "inherit"} />,
        submenu: 'multimedia',
        items: [
            { primary: 'Advisement', icon: <CropPortraitIcon color={darkMode ? "primary" : "inherit"} />, path: '/advisement' },
            { primary: 'Banner', icon: <Crop169Icon color={darkMode ? "primary" : "inherit"} />, path: '/banner' },
        ],
    },
    {
        primary: 'Information',
        icon: <InfoTwoToneIcon color={darkMode ? "primary" : "inherit"} />,
        submenu: 'information',
        items: [
            { primary: 'About Us', icon: <HomeWorkTwoToneIcon color={darkMode ? "primary" : "inherit"} />, path: '/about-us' },
            { primary: 'Contact Us', icon: <ContactPhoneTwoToneIcon color={darkMode ? "primary" : "inherit"} />, path: '/contact-us' },
            { primary: 'Blog / News', icon: <NewspaperIcon color={darkMode ? "primary" : "inherit"} />, path: '/blog' },
            { primary: 'Career', icon: <WorkTwoToneIcon color={darkMode ? "primary" : "inherit"} />, path: '/career' },
            { primary: 'Privacy Policy', icon: <PrivacyTipTwoToneIcon color={darkMode ? "primary" : "inherit"} />, path: '/privacy-policy' },
            { primary: 'Terms & Conditions', icon: <GavelTwoToneIcon color={darkMode ? "primary" : "inherit"} />, path: '/term' },
            { primary: 'Security', icon: <SecurityTwoToneIcon color={darkMode ? "primary" : "inherit"} />, path: '/security' },
            { primary: 'Delivery Page', icon: <DirectionsBikeIcon color={darkMode ? "primary" : "inherit"} />, path: '/delivery-page' },
            { primary: 'Shop Page', icon: <AddBusinessIcon color={darkMode ? "primary" : "inherit"} />, path: '/shop-page' },
        ],
    },
    {
        primary: 'Tools',
        icon: <HandymanTwoToneIcon color={darkMode ? "primary" : "inherit"} />,
        submenu: 'tools',
        items: [
            { primary: 'Telescope-All', icon: <TrackChangesTwoToneIcon color={darkMode ? "primary" : "inherit"} />, path: '/telescope' },
            { primary: 'Horizon-Portal', icon: <SwapHorizontalCircleTwoToneIcon color={darkMode ? "primary" : "inherit"} />, path: '/horizon' },
        ],
    },
    ];

    const filteredMenuItems = menuItems.filter(item => {
        if (searchTerm === '') return true;
        const primaryMatch = item.primary.toLowerCase().includes(searchTerm);
        let itemsMatch = false;
        if (item.items) {
            itemsMatch = item.items.some(subItem =>
                subItem.primary.toLowerCase().includes(searchTerm)
            );
        }
        return primaryMatch || itemsMatch;
    });

    return (
        <StyledDrawer
            variant="persistent"
            open={open}
            collapsed={collapsed}
            onMouseEnter={isManualToggle ? undefined : onMouseEnter}
            onMouseLeave={isManualToggle ? undefined : onMouseLeave}
            sx={{
                '& .MuiDrawer-paper': {
                    '&:hover': {
                        width: isManualToggle ? (collapsed ? collapsedWidth : drawerWidth) : drawerWidth,
                        '& .MuiListItemText-root': {
                            display: isManualToggle ? (collapsed ? 'none' : 'block') : 'block',
                        },
                        '& .search-container': {
                            display: isManualToggle ? (collapsed ? 'none' : 'flex') : 'flex',
                        },
                    },
                },
            }}
        >
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 15,
                        right: collapsed ? -20 : -16,
                        zIndex: 2000,
                        backgroundColor: '#9F63FF',
                        borderRadius: '50%',
                        width: 30,
                        height: 30,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                        cursor: 'pointer',
                        transition: 'right 0.3s ease',
                        border: '2px solid white',
                    }}
                    onClick={toggleCollapse}
                >
                    {collapsed ? (
                        <ArrowForwardIosIcon sx={{ fontSize: 10, color: '#fff' }} />
                    ) : (
                        <ArrowBackIosIcon sx={{ fontSize: 10, color: '#fff' }} />
                    )}
                </Box>

                <Box className="scrollableBox" sx={{
                    overflowY: 'auto',
                    height: '100%',
                    paddingBottom: 2,
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: darkMode ? theme.palette.primary.main : '#9F63FF',
                        borderRadius: '2px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: darkMode ? theme.palette.background.default : '#f5f5f5',
                    }
                }}>
                    <List>
                        <SearchContainer className="search-container" collapsed={collapsed}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Search menu..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon color={darkMode ? "primary" : "inherit"} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '20px',
                                        backgroundColor: darkMode ? theme.palette.background.paper : 'white',
                                        color: darkMode ? theme.palette.text.primary : 'inherit',
                                    },
                                }}
                            />
                        </SearchContainer>

                        {filteredMenuItems.map((item) => (
                            <React.Fragment key={item.primary}>
                                <StyledListItem
                                    button
                                    selected={
                                        item.path ?
                                            location.pathname === item.path :
                                            isSubmenuSelected(item.items?.map(i => i.path) || [])
                                    }
                                    onClick={() =>
                                        item.path ?
                                            handleListItemClick(item.path) :
                                            handleMenuClick(item.submenu)
                                    }
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <StyledListItemText primary={item.primary} collapsed={collapsed} />
                                    {!collapsed && item.submenu && (expandedMenu === item.submenu ?
                                        <ExpandLess color={darkMode ? "primary" : "inherit"} /> :
                                        <ExpandMore color={darkMode ? "primary" : "inherit"} />)}
                                </StyledListItem>

                                {item.submenu && (
                                    <Collapse in={expandedMenu === item.submenu} timeout={300} unmountOnExit>
                                        <List component="div" disablePadding>
                                            {item.items.map((subItem) => (
                                                <StyledListItem
                                                    key={subItem.primary}
                                                    button
                                                    sx={{ paddingLeft: collapsed ? 2 : 4 }}
                                                    selected={
                                                        location.pathname === subItem.path ||
                                                        location.pathname.startsWith(`${subItem.path}/`)
                                                    }
                                                    onClick={() => handleListItemClick(subItem.path)}
                                                >
                                                    <ListItemIcon>{subItem.icon}</ListItemIcon>
                                                    <StyledListItemText primary={subItem.primary} collapsed={collapsed} />
                                                </StyledListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                )}
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
            </Box>
        </StyledDrawer>
    );
}

export default Sidebar;
