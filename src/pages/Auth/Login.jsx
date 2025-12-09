import React from 'react';

const Login = () => {
    return (
        <div className="min-h-screen flex">
            {/* Left side image */}
            <div className="hidden lg:flex w-1/2 bg-gray-200 items-center justify-center">
                <img src={''} alt="Login Illustration" className="w-3/4 h-auto" />
            </div>

            {/* Right side login form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center bg-white">
                <div className="w-full max-w-md p-10">
                    <h2 className="text-4xl font-bold text-secondary mb-6 text-center">Welcome Back</h2>
                    <p className="text-center text-gray-500 mb-8">
                        Log in to your Book Courier account
                    </p>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                placeholder="********"
                                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                        </div>
                        <button className="w-full bg-secondary text-white py-3 rounded-xl font-semibold hover:bg-secondary-dark transition-colors">
                            Log In
                        </button>
                    </div>
                    <p className="text-center text-gray-500 mt-6">
                        Don’t have an account?{" "}
                        <a href="#" className="text-secondary font-semibold hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
