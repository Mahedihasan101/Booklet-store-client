import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
          <Link to='/'>
           <div className="flex items-center gap-2 text-2xl font-bold">
                    <div className="bg-green-600 text-white p-2 rounded-md">📘</div>
                    Bookly
                </div></Link>
    );
};

export default Logo;