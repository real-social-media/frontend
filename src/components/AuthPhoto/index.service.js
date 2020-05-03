import { useSelector } from 'react-redux'

const AuthPhotoComponentService = ({ children }) => {
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

export default AuthPhotoComponentService
