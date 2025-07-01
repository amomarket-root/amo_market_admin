import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PermissionPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading) {
            navigate(isAuthenticated ? '/dashboard' : '/login');
        }
    }, [isAuthenticated, isLoading, navigate]);

    return (
        <div className="loader-container">
            <img src="/image/loader.gif" alt="Loading..." className="loader" />
        </div>
    );
};

export default PermissionPage;
