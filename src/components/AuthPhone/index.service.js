import * as navigationActions from 'navigation/actions'
import { useNavigation } from '@react-navigation/native'

const AuthPhoneComponentService = ({ children }) => {
  const navigation = useNavigation()

  const handleFormSubmit = () => {
    navigationActions.navigateAuthPhoneConfirm(navigation)()
  }

  const formSubmitLoading = false

  const formInitialValues = {
  }

  return children({
    handleFormSubmit,
    formSubmitLoading,
    formInitialValues,
  })
}

export default AuthPhoneComponentService
