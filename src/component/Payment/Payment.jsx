import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';

const Payment = () => {
    const { orderId } = useParams();

    const { isLoading, data: order } = useQuery({
        queryKey: ['orders', orderId],
        queryFn: async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/orders/${orderId}`
            );
            return res.data;
        },
        enabled: !!orderId,
    });


    const handlePayment = async () => {
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

        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/create-checkout-session`,
            paymentInfo
        );

        window.location.href = res.data.url;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                

                <div className="card-body">
                    <h2 className="card-title text-xl">{order.book.name}</h2>

                    <div className="text-sm text-gray-500 space-y-1">
                        <p>
                            <span className="font-medium">Customer:</span>{' '}
                            {order.customer.name}
                        </p>
                        <p>
                            <span className="font-medium">Email:</span>{' '}
                            {order.customer.email}
                        </p>
                    </div>

                    <div className="divider"></div>

                    <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold">
                            Total:
                            <span className="text-primary ml-1">
                                ${order.book.price}
                            </span>
                        </p>
                        <span className="badge badge-warning">Unpaid</span>
                    </div>

                    <div className="card-actions mt-4">
                        <button
                            onClick={handlePayment}
                            className="btn btn-primary btn-block"
                        >
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
