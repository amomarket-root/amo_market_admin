import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    List,
    ListItem,
    Container,
    IconButton,
    Avatar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';

const SuperAdminChatPage = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [receiverId, setReceiverId] = useState("");
    const [customers, setCustomers] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    const currentUserId = localStorage.getItem("user_id");
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    // Fetch messages and customers when the component mounts
    useEffect(() => {
        if (!currentUserId) return;

        const fetchMessagesAndCustomers = async () => {
            try {
                // Fetch messages
                const messagesResponse = await fetch(`${apiUrl}/admin/support_messages`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                });

                if (messagesResponse.ok) {
                    const messagesData = await messagesResponse.json();
                    setMessages(messagesData.messages);

                    // Extract unique customer IDs from messages
                    const customerIds = [...new Set(messagesData.messages.map(msg => msg.sender_id))];
                    if (customerIds.length > 0) {
                        setReceiverId(customerIds[0]);
                    }

                    // Fetch customer details
                    const customersResponse = await fetch(`${apiUrl}/admin/list_customers`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify({ customerIds }),
                    });

                    if (customersResponse.ok) {
                        const customersData = await customersResponse.json();
                        setCustomers(customersData.customers);
                    }
                }
            } catch (error) {
                console.error("Error fetching messages or customers:", error);
            }
        };

        fetchMessagesAndCustomers();

        // Set up the event listener for real-time updates
        window.Echo.channel(`support_chat.${currentUserId}`)
            .listen('.message.sent', (data) => {
                setMessages((prevMessages) => [...prevMessages, data.message]);
            });

        // Clean up the event listener when the component unmounts
        return () => {
            window.Echo.leave(`support_chat.${currentUserId}`);
        };
    }, [currentUserId, apiUrl]);

    // Handle clicking on a customer avatar
    const handleCustomerClick = (customerId) => {
        setReceiverId(customerId);
        fetchChatHistory(customerId);
    };

    // Fetch chat history with a specific customer
    const fetchChatHistory = async (customerId) => {
        try {
            const response = await fetch(`${apiUrl}/admin/support_messages?customer_id=${customerId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                setMessages(data.messages);
            }
        } catch (error) {
            console.error("Error fetching chat history:", error);
        }
    };

    // Send message to the selected customer
    const sendMessage = async () => {
        if (!message.trim() || !receiverId) return;

        try {
            const response = await fetch(`${apiUrl}/admin/support_send_message`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ receiver_id: receiverId, message, type: "text" }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessages([...messages, data.data]);
                setMessage("");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    // Scroll to the bottom of the chat when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <Container
            maxWidth={{ xs: "sm", sm: "md", md: "lg", lg: "xl" }}
            sx={{ mt: 0, mb: 2 }}
        >
            <Box sx={{ padding: 1, display: "flex", alignItems: "center", justifyContent: "flex-start", ml: -3 }}>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon fontSize="large" sx={{ color: "#9F63FF" }} />
                </IconButton>
                <Typography variant="h5" sx={{ color: "#646363" }} fontWeight="bold">
                    Customer Support Chat
                </Typography>
            </Box>

            {/* Customer Avatars */}
            <Box sx={{ display: "flex", overflowX: "auto", gap: 2, my: 2 }}>
                {customers.map((customer) => (
                    <IconButton key={customer.id} onClick={() => handleCustomerClick(customer.id)}>
                        {customer.avatar_id ? (
                            <Avatar
                                alt={customer.name}
                                src={customer?.avatar?.path}
                                sx={{ width: 56, height: 56 }}
                            />
                        ) : (
                            <Avatar
                                alt={customer.name}
                                sx={{ width: 56, height: 56 }}
                            >
                                {customer.name.charAt(0).toUpperCase()}
                            </Avatar>
                        )}
                    </IconButton>
                ))}
            </Box>

            <Typography variant="h6" fontWeight="bold" sx={{ color: "#646363" }}>
                Chat with customers...
            </Typography>

            <Paper sx={{ p: 1, height: "500px", overflowY: "auto", mb: 2, boxShadow: 5 }}>
                <List>
                    {messages.map((msg, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                display: "flex",
                                justifyContent: msg.sender_id === currentUserId ? "flex-end" : "flex-start",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: msg.sender_id === currentUserId ? "flex-end" : "flex-start",
                                    maxWidth: "70%",
                                }}
                            >
                                <Paper
                                    elevation={3}
                                    sx={{
                                        p: 1,
                                        mb: 0.5,
                                        backgroundColor: msg.sender_id === currentUserId ? "#e3f2fd" : "#f5f5f5",
                                        borderRadius: msg.sender_id === currentUserId ? "20px 20px 0 20px" : "20px 20px 20px 0",
                                    }}
                                >
                                    <Typography variant="body1">{msg.message}</Typography>
                                </Paper>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <CheckCircleIcon fontSize="small" sx={{ color: "#4caf50" }} />
                                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                        {msg.sender_id === currentUserId ? "You" : "Customer"}
                                    </Typography>
                                </Box>
                            </Box>
                        </ListItem>
                    ))}
                    <div ref={messagesEndRef} />
                </List>
            </Paper>

            <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button variant="contained" onClick={sendMessage} disabled={!receiverId} endIcon={<SendIcon />}>
                    Send
                </Button>
            </Box>
        </Container>
    );
};

export default SuperAdminChatPage;
