import Navigation from 'components/Navigation'
import { Auth0Provider } from "@auth0/auth0-react";
import AuthToken from 'components/AuthToken'
import GroupsIcon from '@mui/icons-material/Groups';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import { MANAGEMENT_PORTAL_BASE_ROUTE, TENANTS_ROUTE } from 'util/constants'
import store from 'hooks/store'
import { Provider } from 'react-redux'
import LoadingOverlay from 'components/LoadingOverlay'

export const getLayout = page => {

  return <Auth0Provider
    domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
    redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECT}
    audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
    scope={process.env.NEXT_PUBLIC_AUTH0_SCOPE}
    >
    <Provider store={store}>
      <Navigation
        subtitle="Management Portal"
        menuItems={[
          {
            name: 'Properties',
            icon: <MapsHomeWorkIcon />,
            route: MANAGEMENT_PORTAL_BASE_ROUTE
          }, {
            name: 'Tenants',
            icon: <GroupsIcon />,
            route: TENANTS_ROUTE
          }
        ]}
        loginRedirect="/login"
        profilePath="/profile"
      >
        <AuthToken>
          {page}
          <LoadingOverlay />
        </AuthToken>
      </Navigation>
    </Provider>
  </Auth0Provider>
}
