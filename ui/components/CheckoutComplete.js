import { useEffect, useState } from 'react'
import { useStripe } from '@stripe/react-stripe-js';

export const CheckoutComplete = ({ clientSecret }) => {
  const [message, setMessage] = useState();
  const stripe = useStripe();

  useEffect(async () => {

    if (!stripe || !clientSecret) {
      return;
    }

    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

    switch (paymentIntent.status) {
      case "succeeded":
        setMessage("Payment succeeded!");
        break;
      case "processing":
        setMessage("Your payment is processing.");
        break;
      case "requires_payment_method":
        setMessage("Your payment was not successful, please try again.");
        break;
      default:
        setMessage("Something went wrong.");
        break;
    }
  });

  return <>
    <div>Checkout</div>
    { message }
  </>
}

export default CheckoutComplete
