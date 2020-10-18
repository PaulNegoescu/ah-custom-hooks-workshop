import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { AdminLayout, GuestLayout } from '../layouts';
import { AuthContextProvider } from '../features/guest/auth/authContext';

function App() {
    return (
        <AuthContextProvider>
            <Routes>
                <Route path="/*" element={<GuestLayout />} />
                <ProtectedRoute path="admin/*" element={<AdminLayout />} />
            </Routes>
        </AuthContextProvider>
    );
}

export default App;
