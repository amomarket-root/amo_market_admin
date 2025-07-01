import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSweetAlert } from "../Template/SweetAlert";

const Horizon = () => {
    const navigate = useNavigate();
    const showAlert = useSweetAlert();

    useEffect(() => {
        const portalUrl = import.meta.env.VITE_PORTAL_URL;
        if (portalUrl) {
            const horizonUrl = `${portalUrl}/horizon`;
            window.open(horizonUrl, '_blank'); // open in new tab
        } else {
            showAlert({
                title: "Error!",
                text: "VITE_PORTAL_URL is not defined. Please check your environment variables.",
                confirmButtonText: "OK",
                icon: "error",
            });
        }

        // Optional: redirect user elsewhere after opening
        navigate(-1); // Go back to previous page
    }, [navigate]);

    return null;
};

export default Horizon;
