import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import {useToast} from "@chakra-ui/react";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const toast = useToast();

    if (!isAuthenticated) {
        toast(
            {
                title: 'You must be logged in to access this page.',
                description: 'You will be redirected to the login page.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            }
        )
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;