import { Linking } from 'react-native'
import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import * as usersActions from 'store/ducks/users/actions'
import * as navigationActions from 'navigation/actions'
import * as LinkingService from 'services/Linking'
import * as Logger from 'services/Logger'

const FeedCardsService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const usersGetCards = useSelector((state) => state.users.usersGetCards)

  const usersDeleteCardRequest = (payload) => dispatch(usersActions.usersDeleteCardRequest(payload))

  const handleCardPress = ({ action, cardId }) => {
    dispatch(usersActions.usersGetCardsOptimistic({ cardId }))
    dispatch(usersActions.usersDeleteCardRequest({ cardId }))
    LinkingService.deeplinkNavigation(navigation, navigationActions, Linking)(action)
  }

  const isCardSupported = (card) => {
    try {
      return LinkingService.deeplinkPath(card.action)
    } catch (error) {
      Logger.withScope((scope) => {
        scope.setExtra('action', card.action)
        scope.setExtra('code', error.code)
        scope.setExtra('message', error.message)
        Logger.captureMessage('FEED_CARDS_UNSUPPORTED_CARD')
      })
      return false
    }
  }

  const filteredCardsData = useMemo(() => usersGetCards.data.filter(isCardSupported), [usersGetCards.data])

  return children({
    usersGetCards,
    filteredCardsData,
    handleCardPress,
    usersDeleteCardRequest,
  })
}

export default FeedCardsService
