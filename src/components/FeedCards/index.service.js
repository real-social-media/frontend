import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import * as usersActions from 'store/ducks/users/actions'
import * as Linking from 'services/Linking'

const FeedCardsService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const usersGetCards = useSelector(state => state.users.usersGetCards)

  const usersDeleteCardRequest = (payload) =>
    dispatch(usersActions.usersDeleteCardRequest(payload))

  const handleCardPress = ({ action, cardId }) => {
    dispatch(usersActions.usersDeleteCardRequest({ cardId }))
    Linking.deeplinkNavigation(navigation)(action)
  }
 
  return children({
		usersGetCards,
		handleCardPress,
		usersDeleteCardRequest,
  })
}

export default FeedCardsService
