import { useEffect, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { showLoadingOverlay, hideLoadingOverlay } from 'store/reducers/loading'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const useAuth = () => {
  const [hasToken, setHasToken] = useState(false)
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch()

  const tokenized = useMemo(() => {
    return hasToken
  }, [hasToken])

  useEffect(() => {
    const getToken = async () => {
      dispatch(showLoadingOverlay())
      const accessToken = await getAccessTokenSilently();
      dispatch(hideLoadingOverlay())

      axios.interceptors.request.use((request) => {
        dispatch(showLoadingOverlay())
        request.headers['Authorization'] = `Bearer ${accessToken}`
        return request
      })

      axios.interceptors.response.use((response) => {
        dispatch(hideLoadingOverlay())
        return response
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
