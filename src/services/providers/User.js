import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import * as navigationActions from 'navigation/actions'

const UserService = ({ children, }) => {
  const navigation = useNavigation()
  const themeFetch = useSelector(state => state.theme.themeFetch)
  const themeSelector = (themeCode, themeFetch) =>
    (themeFetch.data.find(theme => theme.key === themeCode) || {}).theme

  const handleProfilePress = (user) => {
    const theme = themeSelector(user.themeCode, themeFetch)
    return navigationActions.navigateProfile(navigation, { user, theme })
  }

  return children({
    handleProfilePress,
  })
}

export default UserService
