import useAuth from 'hooks/useAuth'

const AuthToken = ({children}) => {
  const { tokenized } = useAuth()
  if (tokenized) {
    return <>{ children }</>
  }
  return <></>
}

export default AuthToken
