import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSweetAlert } from "../Template/SweetAlert";

const Telescope = () => {
    const navigate = useNavigate();
    const showAlert = useSweetAlert();

    useEffect(() => {
        const adminUrl = import.meta.env.VITE_ADMIN_URL;

        if (adminUrl) {
            const telescopeUrl = `${adminUrl}/telescope/requests`;
            window.open(telescopeUrl, '_blank'); // open in new tab
        } else {
            showAlert({
                title: "Error!",
                text: "VITE_ADMIN_URL is not defined. Please check your environment variables.",
                confirmButtonText: "OK",
                icon: "error",
            });
        }

        // Optional: redirect user back or to a dashboard
        navigate(-1); // Go back to previous page
    }, [navigate]);

    return null; // No UI needed
};

export default Telescope;
