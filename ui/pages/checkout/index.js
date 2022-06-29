import { useRouter } from 'next/router'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutComplete from '../../components/CheckoutComplete'
import Link from 'next/link';

let stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const Checkout = () => {
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
    <Link href='/'>Home</Link>
  </>
}

export default Checkout
