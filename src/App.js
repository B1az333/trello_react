import React from "react";
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import './styles/style.css';

import { LoginForm, RegisterForm, TaskBoard } from './components';
import { selectIsLogined } from "./redux/login/selectors";

function App() {
    const isLoginedBefore = useSelector(selectIsLogined);
    return (
        <Routes>
            <Route path="/" element={isLoginedBefore ? <TaskBoard /> : <Navigate to="/login" />} />
            <Route path="login" element={isLoginedBefore ? <Navigate to="/" /> : <LoginForm />} />
            <Route path="registration" element={isLoginedBefore ? <Navigate to="/" /> : <RegisterForm />} />
        </Routes>
    );
}

export { App };
