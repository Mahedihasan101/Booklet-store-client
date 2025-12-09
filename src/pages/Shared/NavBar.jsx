import React from 'react';
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import Logo from './Logo/Logo';
import { Link } from 'react-router';

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const [dark, setDark] = useState(false);
    return (
        <nav className={`${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"} shadow-md w-full`}>
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
               
             <Logo></Logo>


             
                <ul className="hidden md:flex items-center gap-6 font-medium">
                    <li className="cursor-pointer hover:text-green-600">Home</li>
                    <li className="cursor-pointer hover:text-green-600">Books</li>
                    <li className="cursor-pointer hover:text-green-600">Dashboard</li>
                    <li className="cursor-pointer hover:text-green-600">Login / Register</li>
                </ul>


              
                <div className="hidden md:flex items-center gap-4">
                   
                    <button onClick={() => setDark(!dark)}>
                        {dark ? <Sun size={22} /> : <Moon size={22} />}
                    </button>


                   
                    <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
                    <Link to='login'><button className='btn bg-green-500'>Login</button></Link>
                </div>


                <button className="md:hidden" onClick={() => setOpen(!open)}>
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>


            {open && (
                <div className={`${dark ? "bg-gray-800" : "bg-gray-100"} md:hidden px-6 py-4 space-y-3 font-medium`}>
                    <p className="cursor-pointer hover:text-green-600">Home</p>
                    <p className="cursor-pointer hover:text-green-600">Books</p>
                    <p className="cursor-pointer hover:text-green-600">Dashboard</p>
                    <p className="cursor-pointer hover:text-green-600">Login / Register</p>


                   
                    <button onClick={() => setDark(!dark)} className="flex items-center gap-2 pt-3">
                        {dark ? <Sun size={22} /> : <Moon size={22} />}
                        Theme
                    </button>


                   
                    <div className="w-10 h-10 bg-gray-300 rounded-full mt-3"></div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;