import React from 'react';
import { useForm } from 'react-hook-form';

const AddBook = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleAddBook = (data) => {
        console.log("Book Data:", data);
        alert("Book added successfully!");
        reset(); 
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Book</h2>
                
                <form onSubmit={handleSubmit( handleAddBook)} className="space-y-5">
                    {/* Book Name */}
                    <div>
                        <label className="block text-gray-700 mb-2">Book Name</label>
                        <input
                            type="text"
                            {...register('name', { required: true })}
                            placeholder="Enter book name"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
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
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        {errors.author && <p className="text-red-500 text-sm mt-1">Author is required</p>}
                    </div>

                    {/* Book Image */}
                    <div>
                        <label className="block text-gray-700 mb-2">Book Image URL</label>
                        <input
                            type="text"
                            {...register('image', { required: true })}
                            placeholder="Enter image URL"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">Image URL is required</p>}
                    </div>

                    {/* Book Price */}
                    <div>
                        <label className="block text-gray-700 mb-2">Price ($)</label>
                        <input
                            type="number"
                            {...register('price', { required: true, min: 0 })}
                            placeholder="Enter price"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">Valid price is required</p>}
                    </div>

                    {/* Status Dropdown */}
                    <div>
                        <label className="block text-gray-700 mb-2">Status</label>
                        <select
                            {...register('status', { required: true })}
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
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
