import { useRouter } from 'next/router'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutComplete from '../../components/CheckoutComplete'

let stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

export function Checkout() {
  const { query } = useRouter()
  const clientSecret = query['payment_intent_client_secret']

  const options = {
    clientSecret,
  };

  return <>
    { clientSecret &&
      <Elements stripe={stripePromise} options={options}>
        <CheckoutComplete clientSecret={clientSecret} />
      </Elements>
    }
  </>
}

export default Checkout
