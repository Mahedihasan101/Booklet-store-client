import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

const MyOrders = () => {
  const { user } = useAuth();

  const { data: orders = [], refetch } = useQuery({
    queryKey: ['orders', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/orders?email=${user.email}`);
      return res.data;
    },
  });

  // Cancel order
  const handleCancel = async (id) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    await axios.patch(`${import.meta.env.VITE_API_URL}/orders/cancel/${id}`);
    refetch(); // refresh data
  };

  // Pay now
  const handlePay = async (order) => {
    try {
      const paymentInfo = {
        orderId: order._id,
        bookId: order.book._id,
        name: order.book.name,
        image: order.book.image,
        price: order.book.price,
        quantity: 1,
        customer: {
          name: order.customer.name,
          email: order.customer.email,
        },
      };

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/create-checkout-session`, paymentInfo);

      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error(err);
      alert('Payment failed');
    }
  };

  // Polling to refresh orders every 5s
  useEffect(() => {
    const interval = setInterval(() => refetch(), 5000);
    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-black">My Orders</h2>

      <table className="table w-full text-black">
        <thead>
          <tr>
            <th>Book</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const isPending = order.status === 'pending';
            const isCancelled = order.status === 'cancelled';
            const isPaid = order.status === 'paid';

            return (
              <tr key={order._id}>
                <td>{order.book?.name}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className={isPaid ? 'text-green-600 font-bold' : isCancelled ? 'text-red-600 font-bold' : 'text-yellow-600 font-bold'}>
                  {isPaid ? 'Paid' : isCancelled ? 'Cancelled' : 'Pending'}
                </td>
                <td>
                  {/* Buttons only show if order is pending */}
                  {isPending && !isCancelled && (
                    <>
                      <button onClick={() => handleCancel(order._id)} className="btn btn-sm btn-error mr-2">
                        Cancel
                      </button>
                      <button onClick={() => handlePay(order)} className="btn btn-sm btn-success">
                        Pay Now
                      </button>
                    </>
                  )}
                  {/* If cancelled or paid, no button is shown */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
