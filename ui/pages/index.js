import Head from 'next/head'
import { useEffect, useRef } from 'react'
import axios from 'axios';
import { create } from 'braintree-web-drop-in';

export default function Home() {

  const dropinContainerRef = useRef();

  useEffect(async () => {
    const { data: { token } } = await axios.get('/api/payment/generate-client-token')

    var button = document.querySelector('#submit-button');
    create({
      authorization: token,
      container: dropinContainerRef.current
    }, (createError, instance) => {
      button.addEventListener('click', () => {
        instance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
            axios.post('/api/payment/checkouts', null, {
              params: {
                amount: '100',
                paymentMethodNonce: payload.nonce
              }
            })
        });
      });
    })
  }, [])

  return (<>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div id="dropin-wrapper">
          <div id="checkout-message"></div>
          <div ref={dropinContainerRef}></div>
          <button id="submit-button">Submit payment</button>
        </div>
      </main>
    </>
  )
}
