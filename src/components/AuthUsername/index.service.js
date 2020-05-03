import { useSelector } from 'react-redux'

const AuthUsernameComponentService = ({ children }) => {
  const authSignin = useSelector(state => state.auth.authSignin)
  
  const authSigninRequest = () => {
  }
  
  const authSigninIdle = () => {
  }

  return children({
    authSignin,
    authSigninRequest,
    authSigninIdle,
  })
}

export default AuthUsernameComponentService
