import Head from 'next/head'
import GlobalStyles from '@mui/material/GlobalStyles';
import styles from 'style/styles.js'

const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || (page => page)

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
        <GlobalStyles styles={styles} />
        { getLayout(<Component {...pageProps} />) }
    </main>
  </>
}

export default App
