import React from 'react';
import Logo from '../pages/Shared/Logo/Logo';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <Logo></Logo>
            <Outlet></Outlet>
            
        </div>
    );
};

export default AuthLayout;