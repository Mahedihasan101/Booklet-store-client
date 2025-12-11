import React from 'react';
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import Logo from './Logo/Logo';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { FaUser } from 'react-icons/fa';

const NavBar = () => {
    const { user, logOut } = useAuth();

    const [open, setOpen] = useState(false);
    const [dark, setDark] = useState(false);

    const handleLogOut =()=>{
        logOut()
         .then()
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <nav className={`${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"} shadow-md w-full`}>
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

                <Logo></Logo>



                <ul className="hidden md:flex items-center gap-6 font-medium">
                    <li className="cursor-pointer hover:text-green-600">Home</li>
                    <li className="cursor-pointer hover:text-green-600">Books</li>
                    <Link to='dashboard'><li className="cursor-pointer hover:text-green-600">Dashboard</li></Link>
                    <li className="cursor-pointer hover:text-green-600">Login / Register</li>
                </ul>



                <div className="hidden md:flex items-center gap-4">

                    <button onClick={() => setDark(!dark)}>
                        {dark ? <Sun size={22} /> : <Moon size={22} />}
                    </button>


                         {
                        user ? <div className="w-9 h-9 bg-gray-300 rounded-full"><img  src={user.photoURL} alt="" className='rounded-full'/></div> : <div className="w-9 h-9 bg-gray-300 rounded-full"><FaUser className='ml-2 mt-2' /></div>

                    }
                    
                    {
                        user ? <button onClick={handleLogOut} className='btn bg-green-500'>Log Out</button> : <Link to='login'><button className='btn bg-green-500'>Log in</button></Link>

                    }
                </div>


                <button className="md:hidden" onClick={() => setOpen(!open)}>
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>


            {open && (
                <div className={`${dark ? "bg-gray-800" : "bg-gray-100"} md:hidden px-6 py-4 space-y-3 font-medium`}>
                    <p className="cursor-pointer hover:text-green-600">Home</p>
                    <p className="cursor-pointer hover:text-green-600">Books</p>
                    <Link to='dashboard'><li className="cursor-pointer hover:text-green-600">Dashboard</li></Link>
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