import { useEffect, useState, useMemo } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const useAuth = () => {
  const [hasToken, setHasToken] = useState(false)
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const tokenized = useMemo(() => {
    return hasToken
  }, [hasToken])

  useEffect(() => {
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently();
      axios.interceptors.request.use((request) => {
        request.headers['Authorization'] = `Bearer ${accessToken}`
        return request
      })
      setHasToken(true)
    }

    if (!isLoading && isAuthenticated) {
      getToken()
    }
  }, [isLoading, isAuthenticated])

  return {
    user, tokenized
  }
}

export default useAuth;
