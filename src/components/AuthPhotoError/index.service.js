import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { pageHeaderLeft } from 'navigation/options'
import * as usersActions from 'store/ducks/users/actions'
import * as navigationActions from 'navigation/actions'

const AuthPhotoErrorComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  /**
   * Navigation state reset on back button press
   */
	const handleGoBack = useCallback(() => {
    dispatch(usersActions.usersEditProfileIdle({}))
    navigationActions.navigateAuthPhoto(navigation)()
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => pageHeaderLeft({ ...props, onPress: handleGoBack }),
    })
  }, [])

  return children({
  	handleGoBack,
  })
}

export default AuthPhotoErrorComponentService
