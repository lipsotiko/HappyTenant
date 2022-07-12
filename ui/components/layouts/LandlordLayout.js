import Navigation from 'components/Navigation'
import { Auth0Provider } from "@auth0/auth0-react";
import GroupsIcon from '@mui/icons-material/Groups';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import SettingsIcon from '@mui/icons-material/Settings';
import { MANAGEMENT_PORTAL_BASE_ROUTE, TENANTS_ROUTE } from 'util/constants'

export const getLayout = page => {
  return <Auth0Provider
    domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
    redirectUri={'http://localhost:3000'}
    audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
    scope={process.env.NEXT_PUBLIC_AUTH0_SCOPE}
    >
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
        }, {
          name: 'Settings',
          icon: <SettingsIcon />,
          route: '/settings'
        }
      ]}
      loginRedirect="/login"
      profilePath="/profile"
    >
      {page}
    </Navigation>
  </Auth0Provider>
}