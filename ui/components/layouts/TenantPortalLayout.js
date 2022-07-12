import Navigation from 'components/Navigation'
import { Auth0Provider } from "@auth0/auth0-react";
import Home from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { TENANT_PORTAL_BASE_ROUTE } from 'util/constants'

export const getLayout = page => {
  return <Auth0Provider
    domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
    redirectUri={`http://localhost:3000${TENANT_PORTAL_BASE_ROUTE}`}
    audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
    scope={process.env.NEXT_PUBLIC_AUTH0_SCOPE}
    >
    <Navigation
      subtitle="Tenant Portal"
      menuItems={[
        {
          name: 'Home',
          icon: <Home />,
          route: TENANT_PORTAL_BASE_ROUTE
        }, {
          name: 'Settings',
          icon: <SettingsIcon />,
          route: `${TENANT_PORTAL_BASE_ROUTE}/settings`
        }
      ]}
      loginRedirect={`${TENANT_PORTAL_BASE_ROUTE}/login`}
      profilePath={`${TENANT_PORTAL_BASE_ROUTE}/profile`}
    >
      {page}
    </Navigation>
  </Auth0Provider>
}
