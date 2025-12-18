import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';

const BookDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const { data: book = {}, isLoading } = useQuery({
    queryKey: ['book', id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  const handleOpenModal = () => {
    setFormData({
      name: user?.displayName || '',
      email: user?.email || '',
      phone: '',
      address: '',
    });
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderInfo = {
      book: { _id: book._id, name: book.name, price: book.price },
      customer: { ...formData },
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/orders`, orderInfo);
      alert('Order placed successfully!');
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert('Order failed');
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-xl shadow">
          <img src={book.image} alt={book.name} className="rounded-xl" />
          <div>
            <h1 className="text-4xl font-bold">{book.name}</h1>
            <p>Author: {book.author}</p>
            <p>Status: {book.status}</p>
            <p className="text-2xl text-green-600">৳ {book.price}</p>
            <button onClick={handleOpenModal} className="btn btn-primary mt-6">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input readOnly value={formData.name} className="input w-full" />
              <input readOnly value={formData.email} className="input w-full" />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="input w-full"
                required
              />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="textarea w-full"
                required
              />
              <button type="submit" className="btn btn-success w-full">
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BookDetails;
