import LoadingOverlayPersistant from './LoadingOverlayPersistant'
import { useSelector } from 'react-redux'

const LoadingOverlay = ({ override = false }) => {
  const loading = useSelector(state => state.loading.value)
  const show = (override) ? true : loading

  return (show)
    ? <LoadingOverlayPersistant />
    : <></>
}

export default LoadingOverlay
