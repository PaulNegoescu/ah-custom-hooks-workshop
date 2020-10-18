import React, { useContext, useDebugValue, useEffect, useRef } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { AuthContext } from '../features/guest/auth/authContext';

export default function ProtectedRoute(props) {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const isLoggedIn = !!token;
    const timeout = useRef(null);

    useDebugValue(timeout);

    useEffect(() => {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
        if (!isLoggedIn) {
            timeout.current = setTimeout(() => navigate('/login'), 1000);
        }
        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        };
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) {
        return null;
    }

    return <Route {...props} />;
}
