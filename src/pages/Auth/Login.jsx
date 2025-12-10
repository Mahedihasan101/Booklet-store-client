import React from 'react';
import { Link } from 'react-router';
import img from '../../assets/1013998_OJ8XX60.jpg'
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin/SocialLogin';


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth()

    const handleLogin = (data) => {
        console.log('form data', data);
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error)
            })

    }
    return (
        <div className="min-h-screen flex ">
            {/* Left side image */}
            <div className="hidden lg:flex w-1/2 bg-gray-200 items-center justify-center">
                <img src={img} alt="Login Illustration" className="w-30% h-50%" />
            </div>

            {/* Right side login form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center bg-[#725334]/55">
                <div className="w-full max-w-md p-10">
                    <h2 className="text-4xl font-bold text-[#00a63e] mb-6 text-center">Welcome Back</h2>
                    <p className="text-center text-gray-500 mb-8">
                        Log in to your Book Courier account
                    </p>
                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"{...register('email', { required: true })}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                            {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Password</label>
                            <input
                                type="password"{...register('password', { required: true, minLength: 6 })}
                                placeholder="********"
                                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                            {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>}
                        </div>
                        <button className="w-full bg-[#00a63e] text-white py-3 rounded-xl font-semibold hover:bg-secondary-dark transition-colors">
                            Log In
                        </button>
                    </form>
                    <p className="text-center text-gray-500 mt-6">
                        Don’t have an account?{" "}
                        <Link to='/register'>
                            <span className="text-[#00a63e] font-semibold hover:underline">
                                Sign Up
                            </span>
                        </Link>
                    </p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;
