import { useSelector } from 'react-redux'


const AuthPhotoComponentService = ({ children }) => {
  const usersEditProfile = useSelector(state => state.users.usersEditProfile)
  
  const formErrorMessage = usersEditProfile.error.text

  return children({
    formErrorMessage,    
  })
}

export default AuthPhotoComponentService
