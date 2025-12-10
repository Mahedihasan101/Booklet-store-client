import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin/SocialLogin';
import axios from 'axios';

const Registration = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser,updateUserProfile}= useAuth();

    const handleRegistration = (data) => {
        console.log('after register', data);
        const profileImg = data.photo[0];
       registerUser(data.email,data.password)
       .then(result =>{
        console.log(result.user);

        const formData = new FormData();
        formData.append('image',profileImg)
        const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_host}`
        axios.post(image_API_URL,formData)
        .then(res =>{
            console.log('after image upload',res.data.data.url)

            const userProfile = {
                displayName: data.name,
                photoURL: res.data.data.url

            }
            updateUserProfile(userProfile)
            .then(()=>{
                console.log('user profile updated done')
            })
            .catch(error =>console.log(error))
        })

       })
       .catch(error =>{
        console.log(error)
       })

    }
    return (
        <div className="min-h-screen flex">
            {/* Left side image */}
            <div className="flex w-full lg:w-1/2 items-center justify-center bg-white">
                <div className="w-full max-w-md p-10">
                    <h2 className="text-4xl font-bold text-[#00a63e] mb-6 text-center">Create Account</h2>
                    <p className="text-center text-gray-500 mb-8">
                        Sign up to start your Book Courier journey
                    </p>
                    <form onSubmit={handleSubmit(handleRegistration)} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"{...register('name', { required: true })}
                                placeholder="John Doe"
                                className="w-full px-4 py-3 border rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                            {errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Photo</label>
                            <input type="file"{...register('photo', { required: true })} className="file-input w-full rounded-xl bg-white text-black border-black"/>
                            {errors.photo?.type === 'required' && <p className='text-red-500'>Photo  is required</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"{...register('email', { required: true })}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 border rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                            {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}
                        </div>
                        <div>
                            <label className="block text-black mb-2">Password</label>
                            <input
                                type="password"{...register('password', {
                                    required: true,
                                    minLength: 6,
                                    pattern:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
                                })}
                                placeholder="******"
                                className="w-full px-4 py-3 border rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                            {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                            {errors.password?.type==='minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>}
                            {
                                errors.password?.type==='pattern'&& <p className='text-red-500'>Password must be one uppercase,one lowercase letter and one number ,one special character</p>
                            }
                        </div>

                        <button className="w-full bg-[#00a63e] text-white py-3 rounded-xl font-semibold hover:bg-secondary-dark transition-colors">
                            Sign Up
                        </button>
                    </form>
                    <p className="text-center text-gray-500 mt-6">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#00a63e] font-semibold hover:underline">
                            Log In
                        </Link>
                    </p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>

            {/* Right side register form */}
            <div className="hidden lg:flex w-1/2 bg-gray-200 items-center justify-center">
                <img src={''} alt="Register Illustration" className="w-3/4 h-auto" />
            </div>

        </div>
    );
};

export default Registration;