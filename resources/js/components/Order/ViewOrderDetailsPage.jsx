import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import qs from "qs";
import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const ViewOrderDetailsPage = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const [getOrderId, setOrderId] = useState(null);
    const [orderStatus, setOrderStatus] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [paymentId, setPaymentId] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [cartDetails, setCartDetails] = useState([]);
    const [shops, setShops] = useState([]);
    const [userAddress, setUserAddress] = useState(null);
    const [deliveryPartner, setDeliveryPartner] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleCancelClick = () => {
        navigate("/order");
    };

    const getServiceIcon = (serviceName) => {
        switch (true) {
            case serviceName.includes('Car Service Center'):
                return "/image/car_service.gif";
            case serviceName.includes('Internet Café'):
                return "/image/print.gif";
            case serviceName.includes('Beauty Parlor'):
                return "/image/beauty_parlour.gif";
            case serviceName.includes('TV Repair Services'):
                return "/image/tv_repair.gif";
            case serviceName.includes('Salon / Barber Shop'):
                return "/image/salon_shop.gif";
            case serviceName.includes('Mobile Repair Shop'):
                return "/image/mobile_repair.gif";
            case serviceName.includes('AC Service Center'):
                return "/image/ac_service.gif";
            case serviceName.includes('Home Appliances Store'):
                return "/image/home_appliance.gif";
            default:
                return "/image/default_service.png";
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.put(
            `${apiUrl}/admin/order/find_order`,
            qs.stringify({ id: orderId }),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
            .then((response) => {
                const orderData = response.data.data;
                const cartItems = JSON.parse(orderData?.user_cart?.cart_items || '[]');
                setCartDetails(cartItems || []);
                setOrderId(orderData.order_id);
                setOrderStatus(orderData.order_status);
                setOrderDate(orderData.updated_at);
                setPaymentId(orderData.payment_id);
                setTotalAmount(orderData.total_amount);
                setPaymentMethod(orderData.payment_method);
                setPaymentStatus(orderData.payment_status);
                setShops(orderData.shops || []);
                setUserAddress(orderData.address || null);
                setDeliveryPartner(orderData.delivery_person || null);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching order data:", error);
                setLoading(false);
            });
    }, [orderId, apiUrl]);

    return (
        <Box sx={{ display: "flex" }}>
            {loading ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "90vh",
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <Paper sx={{ width: "100%", overflow: "hidden", padding: "3px" }}>
                    <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                        <Tooltip title="Return Back">
                            <ArrowBackRoundedIcon
                                color="disabled"
                                onClick={handleBackClick}
                                sx={{ cursor: "pointer", marginRight: 1 }}
                            />
                        </Tooltip>
                        <Typography sx={{
                            marginRight: { xs: "0", sm: "10px", md: "700px" },
                            fontWeight: "bold",
                            whiteSpace: "nowrap",
                            flexGrow: 1,
                            textAlign: { xs: "center", md: "left" }
                        }} variant="h6">
                            View Order Details
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 1 }}>
                        <Chip label="Order Information" />
                    </Divider>
                    <Grid container spacing={2} sx={{ marginBottom: 1 }}>
                        <Grid item xs={12} md={12}>
                            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                <Grid item xs={12} md={4}>
                                    <InputLabel
                                        sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                        shrink
                                    >
                                        Order Date :
                                    </InputLabel>
                                    <TextField
                                        placeholder="Order Date"
                                        variant="outlined"
                                        type="text"
                                        fullWidth
                                        value={orderDate ? format(new Date(orderDate), "MMM-dd-yyyy hh:mm a") : ""}
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputLabel
                                        sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                        shrink
                                    >
                                        Order Id :
                                    </InputLabel>
                                    <TextField
                                        placeholder="Order Id"
                                        variant="outlined"
                                        type="text"
                                        fullWidth
                                        value={getOrderId}
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputLabel
                                        sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                        shrink
                                    >
                                        Order Status :
                                    </InputLabel>
                                    <TextField
                                        placeholder="Order Status"
                                        variant="outlined"
                                        type="text"
                                        fullWidth
                                        value={orderStatus}
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: 3 }}>
                                <Chip label="Payment Information" />
                            </Divider>
                            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                <Grid item xs={12} md={3}>
                                    <InputLabel
                                        sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                        shrink
                                    >
                                        Payment Id :
                                    </InputLabel>
                                    <TextField
                                        placeholder="Payment Id"
                                        variant="outlined"
                                        type="text"
                                        fullWidth
                                        value={paymentId}
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <InputLabel
                                        sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                        shrink
                                    >
                                        Total Amount :
                                    </InputLabel>
                                    <TextField
                                        placeholder="Total Amount"
                                        variant="outlined"
                                        type="text"
                                        fullWidth
                                        value={totalAmount}
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <InputLabel
                                        sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                        shrink
                                    >
                                        Payment Method :
                                    </InputLabel>
                                    <TextField
                                        placeholder="Payment Method"
                                        variant="outlined"
                                        type="text"
                                        fullWidth
                                        value={paymentMethod}
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <InputLabel
                                        sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                        shrink
                                    >
                                        Payment Status :
                                    </InputLabel>
                                    <TextField
                                        placeholder="Payment Status"
                                        variant="outlined"
                                        type="text"
                                        fullWidth
                                        value={paymentStatus}
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: 3 }}>
                                <Chip label="Product/Service Information" />
                            </Divider>
                            <Paper>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Item</TableCell>
                                                <TableCell>Type</TableCell>
                                                <TableCell>Details</TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell>Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {cartDetails.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell>
                                                        <Box display="flex" alignItems="center">
                                                            {item.product ? (
                                                                <img
                                                                    src={item.product.image}
                                                                    alt={item.product.name}
                                                                    style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                                                />
                                                            ) : item.service ? (
                                                                <img
                                                                    src={getServiceIcon(item.service.name)}
                                                                    alt={item.service.name}
                                                                    style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                                                />
                                                            ) : (
                                                                <div style={{ width: '50px', height: '50px', marginRight: '10px', backgroundColor: '#eee' }} />
                                                            )}
                                                            <Typography>
                                                                {item.product?.name || item.service?.name || 'Unknown Item'}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.product ? 'Product' : item.service ? 'Service' : 'Unknown'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.product ? (
                                                            <>
                                                                <div>Weight: {item.product.weight}</div>
                                                                {item.product.original_price && (
                                                                    <div>Original: ₹{item.product.original_price}</div>
                                                                )}
                                                            </>
                                                        ) : item.service ? (
                                                            <>
                                                                <div>Type: {item.service.options?.service_type}</div>
                                                                <div>Duration: {item.service.options?.service_duration}</div>
                                                            </>
                                                        ) : (
                                                            'No details available'
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{item.quantity}</TableCell>
                                                    <TableCell>₹{item.price}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                            {shops.map((shop, index) => (
                                <React.Fragment key={shop.id}>
                                    <Divider sx={{ my: 3 }}>
                                        <Chip label={`Shop${index + 1} Information`} />
                                    </Divider>
                                    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel
                                                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                                shrink
                                            >
                                                Shop Name :
                                            </InputLabel>
                                            <TextField
                                                placeholder="Shop Name"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={shop.name}
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel
                                                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                                shrink
                                            >
                                                Shop Number :
                                            </InputLabel>
                                            <TextField
                                                placeholder="Shop Number"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={shop.number}
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel
                                                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                                shrink
                                            >
                                                Shop Latitude :
                                            </InputLabel>
                                            <TextField
                                                placeholder="Shop Latitude"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={shop.latitude}
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel
                                                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                                shrink
                                            >
                                                Shop Longitude :
                                            </InputLabel>
                                            <TextField
                                                placeholder="Shop longitude"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={shop.longitude}
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <InputLabel
                                                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                                shrink
                                            >
                                                Shop Location :
                                            </InputLabel>
                                            <TextField
                                                placeholder="Shop Location"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={shop.location}
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            ))}
                            {userAddress && (
                                <React.Fragment>
                                    <Divider sx={{ my: 3 }}>
                                        <Chip label="User Address Information" />
                                    </Divider>
                                    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel
                                                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                                shrink
                                            >
                                                User Address Name :
                                            </InputLabel>
                                            <TextField
                                                placeholder="User Address Name"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={userAddress.full_name}
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel
                                                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                                shrink
                                            >
                                                User Address Number :
                                            </InputLabel>
                                            <TextField
                                                placeholder="User Address Number"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={userAddress.phone_number}
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel
                                                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                                shrink
                                            >
                                                User Address Alt. Number :
                                            </InputLabel>
                                            <TextField
                                                placeholder="User Address Alt. Number"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={userAddress.alternative_number}
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel
                                                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                                shrink
                                            >
                                                User Address City :
                                            </InputLabel>
                                            <TextField
                                                placeholder="User Address City"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={userAddress.city}
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel
                                                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                                shrink
                                            >
                                                User Address State :
                                            </InputLabel>
                                            <TextField
                                                placeholder="User Address State"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={userAddress.state}
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel
                                                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                                shrink
                                            >
                                                User Address Pin Code :
                                            </InputLabel>
                                            <TextField
                                                placeholder="User Address Pin Code"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={userAddress.pin_code}
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel
                                                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                                shrink
                                            >
                                                User Address Latitude :
                                            </InputLabel>
                                            <TextField
                                                placeholder="User Address Latitude"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={userAddress.latitude}
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel
                                                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                                shrink
                                            >
                                                User Address Longitude :
                                            </InputLabel>
                                            <TextField
                                                placeholder="User Address longitude"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={userAddress.longitude}
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <InputLabel
                                                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                                shrink
                                            >
                                                User Address Location :
                                            </InputLabel>
                                            <TextField
                                                placeholder="User Address Location"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={userAddress.building_details + ", " + userAddress.location}
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            )}
                            {deliveryPartner && (
                                <React.Fragment>
                                    <Divider sx={{ my: 3 }}>
                                        <Chip label="delivery Person Information" />
                                    </Divider>
                                    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel
                                                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                                shrink
                                            >
                                                Delivery Person Name :
                                            </InputLabel>
                                            <TextField
                                                placeholder="Delivery Person Name"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={deliveryPartner.name}
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel
                                                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                                shrink
                                            >
                                                Delivery Person Number  :
                                            </InputLabel>
                                            <TextField
                                                placeholder="Delivery Person Number"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={deliveryPartner.number}
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel
                                                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                                shrink
                                            >
                                                Delivery Mode  :
                                            </InputLabel>
                                            <TextField
                                                placeholder="Delivery Mode"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={deliveryPartner.delivery_mode}
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel
                                                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                                shrink
                                            >
                                                Delivery Vehicle Number  :
                                            </InputLabel>
                                            <TextField
                                                placeholder="Delivery Vehicle Number"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={deliveryPartner.vehicle_number}
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <InputLabel
                                                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                                shrink
                                            >
                                                Delivery Person Location :
                                            </InputLabel>
                                            <TextField
                                                placeholder="Delivery Person Location"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={deliveryPartner.location}
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            )}
                        </Grid>
                    </Grid>
                    <Divider sx={{ marginY: 1 }} />
                    <Box sx={{ display: "flex", justifyContent: "flex-end", margin: 1 }}>
                        <Button
                            onClick={handleCancelClick}
                            color="error"
                            variant="contained"
                            startIcon={<ArrowBackRoundedIcon />}
                            sx={{ marginRight: 2, color: "white" }}
                        >
                            Back to order list
                        </Button>
                    </Box>
                </Paper>
            )}
        </Box>
    );
};

export default ViewOrderDetailsPage;
