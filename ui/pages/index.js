import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import CheckoutForm from '../components/CheckoutForm'
import axios from 'axios';

let stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

export default function Home() {
  const [clientSecret, setClientSecret] = useState();
  const items = [{ id: "xl-tshirt" }];

  useEffect(async () => {
    const { data: { clientSecret } } = await axios.post('/api/payment/create-payment-intent', { items })
    setClientSecret(clientSecret)
  }, [])

  return (<>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary">Dashboard</Typography>
      </Breadcrumbs>
      { clientSecret &&
        <Elements stripe={stripePromise} options={{
          clientSecret,
        }}>
          <CheckoutForm />
        </Elements>
      }
    </>
  )
}
