import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sessionId = searchParams.get('session_id');
  console.log(sessionId)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const confirmPayment = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/payment-success`, null, {
  params: { session_id: sessionId },
});

      } catch (err) {
        console.error('Payment confirmation failed', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-md">

        {loading && (
          <>
            <div className="loading loading-spinner loading-lg text-green-600 mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-700">
              Confirming your payment...
            </h2>
          </>
        )}

        {!loading && error && (
          <>
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-red-600 mb-2">
              Payment Verification Failed
            </h1>
            <p className="text-gray-600 mb-6">
              Something went wrong. Please contact support.
            </p>
          </>
        )}

        {!loading && !error && (
          <>
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase.  
              Your order has been marked as <b>Paid</b>.
            </p>

            <button
              onClick={() => navigate('/dashboard/my-orders')}
              className="btn btn-success btn-wide"
            >
              Go to My Orders
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default PaymentSuccess;
