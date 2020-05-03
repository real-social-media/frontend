import * as navigationActions from 'navigation/actions'
import { useNavigation } from '@react-navigation/native'

const AuthEmailComponentService = ({ children }) => {
  const navigation = useNavigation()

  const handleFormSubmit = () => {
    navigationActions.navigateAuthEmailConfirm(navigation)()
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

export default AuthEmailComponentService
