import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';


const Invoices = () => {
  const { user } = useAuth();

  const { data: invoices = [], isLoading, refetch } = useQuery({
    queryKey: ['invoices', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/invoices?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading invoices...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-black">My Invoices</h2>

      {invoices.length === 0 ? (
        <p className="text-gray-600">No payments found.</p>
      ) : (
        <table className="table w-full text-black">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Book Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice._id}>
                <td>{invoice._id}</td>
                <td>{invoice.book?.name || '-'}</td>
                <td>${invoice.book?.price || invoice.price}</td>
                <td>{new Date(invoice.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Invoices;
