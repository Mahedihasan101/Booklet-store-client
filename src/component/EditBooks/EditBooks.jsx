import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { imageUpload } from "../../utils"; // আপনার provided function

const EditBook = () => {
  const { id } = useParams(); // book id from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Fetch book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`);
        setBook(res.data);
        reset({
          name: res.data.name,
          author: res.data.author,
          price: res.data.price,
          published: res.data.published,
        });
      } catch (err) {
        console.error("Failed to fetch book", err);
      }
    };
    fetchBook();
  }, [id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const updatedData = { ...data };

      // If new image is selected, upload to imgbb
      if (data.image && data.image.length > 0) {
        updatedData.image = await imageUpload(data.image[0]);
      }

      await axios.patch(`${import.meta.env.VITE_API_URL}/books/${id}`, updatedData);
      alert("Book updated successfully ✅");
      navigate("/dashboard/my-books"); // go back to My Books page
    } catch (err) {
      console.error("Failed to update book", err);
      alert("Book update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!book) return <p className="text-center mt-10">Loading book details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Edit Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block mb-1 font-medium">Book Name</label>
          <input
            type="text"
            {...register("name", { required: "Book name is required" })}
            className="input input-bordered w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Author</label>
          <input
            type="text"
            {...register("author", { required: "Author is required" })}
            className="input input-bordered w-full"
          />
          {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            {...register("price", { required: "Price is required", min: 0 })}
            className="input input-bordered w-full"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select {...register("published")} className="input input-bordered w-full">
            <option value={true}>Published</option>
            <option value={false}>Unpublished</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Book Image</label>
          <input type="file" {...register("image")} className="file-input w-full" />
          {book.image && (
            <img src={book.image} alt={book.name} className="w-32 h-32 object-cover mt-2 rounded" />
          )}
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default EditBook;
