import Head from 'next/head'
import Navigation from '../components/Navigation'
import { Auth0Provider } from "@auth0/auth0-react";
import GlobalStyles from '@mui/material/GlobalStyles';
import styles from '../style/styles.js'

const App = ({ Component, pageProps }) => {
  return <>
    <Head>
      <title>Happy Tenant | Meraklis.io</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </Head>
    <main>
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
        redirectUri={'http://localhost:3000'}
        audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
        scope={process.env.NEXT_PUBLIC_AUTH0_SCOPE}
        >
          <GlobalStyles styles={styles} />
          <Navigation>
            <main>
              <Component {...pageProps} />
            </main>
          </Navigation>
      </Auth0Provider>
    </main>
  </>
}

export default App
