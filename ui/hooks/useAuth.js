import { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const useAuth = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently();
      axios.interceptors.request.use((request) => {
        request.headers['Authorization'] = `Bearer ${accessToken}`
        return request
      })
    }

    if (!isLoading && isAuthenticated) {
      getToken()
    }
  }, [isLoading, isAuthenticated])

  return {
    user, isAuthenticated, isLoading
  }
}

export default useAuth;
