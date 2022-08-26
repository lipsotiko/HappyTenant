import Navigation from 'components/Navigation'
import { Auth0Provider } from "@auth0/auth0-react";
import Home from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AuthToken from 'components/AuthToken'
import { TENANT_PORTAL_BASE_ROUTE } from 'util/constants'
import store from 'store/store'
import { Provider } from 'react-redux'
import LoadingOverlay from 'components/LoadingOverlay'

export const getLayout = page => {

  return <Auth0Provider
    domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
    redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECT + TENANT_PORTAL_BASE_ROUTE}
    audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
    scope={process.env.NEXT_PUBLIC_AUTH0_SCOPE}
    >
    <Provider store={store}>
      <Navigation
        subtitle="Tenant Portal"
        menuItems={[
          {
            name: 'Home',
            icon: <Home />,
            route: TENANT_PORTAL_BASE_ROUTE
          }, {
            name: 'Invoices',
            icon: <ReceiptIcon />,
            route: TENANT_PORTAL_BASE_ROUTE + "/invoices"
          }
        ]}
        loginRedirect={`${TENANT_PORTAL_BASE_ROUTE}/login`}
        profilePath={`${TENANT_PORTAL_BASE_ROUTE}/profile`}
      >
        <AuthToken>
          {page}
          <LoadingOverlay />
        </AuthToken>
      </Navigation>
      </Provider>
  </Auth0Provider>
}
