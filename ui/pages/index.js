import Head from 'next/head'
import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from '../components/CheckoutForm'
import axios from 'axios';

let stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

export default function Home() {
  const [clientSecret, setClientSecret] = useState();
  const items = [{ id: "xl-tshirt" }];

  useEffect(async () => {
    const { data: { clientSecret } } = await axios.post('/api/payment/create-payment-intent', { items })
    setClientSecret(clientSecret)
  }, [])

  const options = {
    clientSecret,
  };

  return (<>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://js.stripe.com/v3/"></script>
      </Head>
      <main>
        { clientSecret &&
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
        }
      </main>
    </>
  )
}
