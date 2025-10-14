import { useState, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_stripe_publishable_key_here');

const CheckoutForm = ({ address, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, totalCartPrice, axios, user } = useContext(AppContext);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  const handleStripePayment = async () => {
    if (!stripe || !elements) return;

    setProcessing(true);
    try {
      // Create payment intent
      const { data } = await axios.post('/payment/create-payment-intent', {
        items: cart.map(item => ({
          product: item._id,
          quantity: item.quantity
        })),
        address
      });

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        // Confirm with backend
        await axios.post('/payment/confirm-payment', {
          paymentIntentId: paymentIntent.id,
          items: cart.map(item => ({
            product: item._id,
            quantity: item.quantity
          })),
          address
        });
        
        toast.success('Payment successful!');
        onSuccess();
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handlePayPalPayment = async () => {
    setProcessing(true);
    try {
      await axios.post('/payment/paypal-order', {
        items: cart.map(item => ({
          product: item._id,
          quantity: item.quantity
        })),
        address
      });
      
      toast.success('PayPal payment successful!');
      onSuccess();
    } catch (error) {
      toast.error('PayPal payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleCOD = async () => {
    setProcessing(true);
    try {
      await axios.post('/order/place-cod', {
        items: cart.map(item => ({
          product: item._id,
          quantity: item.quantity
        })),
        address
      });
      
      toast.success('Order placed successfully!');
      onSuccess();
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'stripe') {
      await handleStripePayment();
    } else if (paymentMethod === 'paypal') {
      await handlePayPalPayment();
    } else if (paymentMethod === 'cod') {
      await handleCOD();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Payment Details</h3>
      
      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700">
          Total: ${totalCartPrice.toFixed(2)}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="stripe"
                checked={paymentMethod === 'stripe'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              Credit/Debit Card (Stripe)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              PayPal
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              Cash on Delivery
            </label>
          </div>
        </div>

        {paymentMethod === 'stripe' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Details
            </label>
            <div className="p-3 border border-gray-300 rounded-md">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={processing || (paymentMethod === 'stripe' && !stripe)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? 'Processing...' : `Pay $${totalCartPrice.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};

const PaymentForm = ({ address, onSuccess }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm address={address} onSuccess={onSuccess} />
    </Elements>
  );
};

export default PaymentForm;