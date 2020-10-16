import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/404/404';
import AddQuestion from '../features/trivia/AddQuestion';
import { Login, Register } from '../features/trivia/guest/auth';

export default function GuestLayoyt() {
    return (
        <Routes>
            <Route path="questions/add" element={<AddQuestion />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound parent="admin" />} />
        </Routes>
    );
}
