import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const AlbumService = ({ children }) => {
  const authUser = useSelector(state => state.auth.user)
  const themeFetch = useSelector(state => state.theme.themeFetch)

  return children({
    authUser,
    themeFetch,
  })
}

export default AlbumService
