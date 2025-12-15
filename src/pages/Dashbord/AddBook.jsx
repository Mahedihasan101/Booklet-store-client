import React from 'react';
import { useForm } from 'react-hook-form';
import { imageUpload } from '../../utils';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';


const AddBook = () => {
    const { user } = useAuth();

    // useMutation hook useCase
    const {isPending,isError,mutateAsync,} = useMutation({
        mutationFn:async payload =>
            await axios.post(`http://localhost:5000/books`, payload),
        onSuccess:data=>{
            console.log(data)
            toast.success('Book Added Successfully')
            
        },
            onError:error =>{
                console.log(error )
            },
            retry:true
    })

    // React Hook Form
    const { register, handleSubmit,reset, formState: { errors }} = useForm();

    const handleAddBook = async data => {

        const { name, author, status, price } = data
        const imageFile = data.photo[0];

        try {
            const imageUrl = await imageUpload(imageFile)
            const bookData = {
                image: imageUrl,
                name,
                author,
                status,
                price: Number(price),
                seller: {
                    image: user?.photoURL,
                    name: user?.displayName,
                    email: user?.email,
                }
            }
           await mutateAsync(bookData)
           reset()
        } catch (err) {
            console.log(err)
        }

    }

    if (isPending)return <p>Loading.....</p>
    if(isError)return <p>Error....</p>


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Book</h2>

                <form onSubmit={handleSubmit(handleAddBook)} className="space-y-5">
                    {/* Book Name */}
                    <div>
                        <label className="block text-gray-700 mb-2">Book Name</label>
                        <input
                            type="text"
                            {...register('name', { required: true })}
                            placeholder="Enter book name"
                            className="w-full px-4 py-3 border text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">Book name is required</p>}
                    </div>

                    {/* Book Author */}
                    <div>
                        <label className="block text-gray-700 mb-2">Author</label>
                        <input
                            type="text"
                            {...register('author', { required: true })}
                            placeholder="Enter author name"
                            className="w-full px-4 py-3 border text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        {errors.author && <p className="text-red-500 text-sm mt-1">Author is required</p>}
                    </div>

                    {/* Book Image */}
                    <div>
                        <label className="block text-gray-700 mb-2">Photo</label>
                        <input type="file"{...register('photo', { required: true })} className="file-input w-full rounded-xl bg-white text-black border-black" />
                        {errors.photo?.type === 'required' && <p className='text-red-500'>Photo  is required</p>}
                    </div>

                    {/* Book Price */}
                    <div>
                        <label className="block text-gray-700 mb-2">Price ($)</label>
                        <input
                            type="number"
                            {...register('price', { required: true, min: 0 })}
                            placeholder="Enter price"
                            className="w-full px-4 py-3 border text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">Valid price is required</p>}
                    </div>

                    {/* Status Dropdown */}
                    <div>
                        <label className="block text-gray-700 mb-2">Status</label>
                        <select
                            {...register('status', { required: true })}
                            className="w-full px-4 py-3 border text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            <option value="">Select status</option>
                            <option value="published">Published</option>
                            <option value="unpublished">Unpublished</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-sm mt-1">Status is required</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                    >
                        Add Book
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBook;
