import { Auth0Provider } from "@auth0/auth0-react";

export const getLayout = page => {
  return <Auth0Provider
    domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
    redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECT}
    audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
    scope={process.env.NEXT_PUBLIC_AUTH0_SCOPE}
    >
      {page}
  </Auth0Provider>
}
