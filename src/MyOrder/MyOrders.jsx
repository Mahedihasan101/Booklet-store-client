import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router';

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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-black">My Orders</h2>

      <table className="table w-full text-black">
        <thead>
          <tr>
            <th>Book</th>
            <th>Date</th>
            <th>Status</th>
            <th>Payment Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const isCancelled = order.status === 'cancelled';
            const isPaid = order.paymentStatus === 'paid';

            return (
              <tr key={order._id}>
                <td>{order.book?.name}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className={isCancelled ? 'text-gray-500' : 'text-red-500'}>
                  {order.status}
                </td>
                <td>
                  {isPaid ? (
                    <span className='text-green-400'>Paid</span>
                  ) : isCancelled ? (
                    <span className='text-gray-500'>Unpaid</span>
                  ) : (
                    <Link to={`/dashboard/payment/${order._id}`}>
                      <button className="btn btn-sm btn-success">Pay Now</button>
                    </Link>
                  )}
                </td>
                <td>
                  {!isCancelled && order.status === 'pending' && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="btn btn-sm btn-error mr-2"
                    >
                      Cancel
                    </button>
                  )}
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
