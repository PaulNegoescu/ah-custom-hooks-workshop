import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminLayout, GuestLayout } from '../layouts';

function App() {
    return (
        <Routes>
            <Route path="/*" element={<GuestLayout />} />
            <Route path="admin/*" element={<AdminLayout />} />
        </Routes>
    );
}

export default App;
