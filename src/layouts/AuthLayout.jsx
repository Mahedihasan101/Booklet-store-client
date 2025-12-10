import React from 'react';
import Logo from '../pages/Shared/Logo/Logo';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='max-w-6xl mx-auto'>
            <Logo></Logo>
            <Outlet></Outlet>
            
        </div>
    );
};

export default AuthLayout;