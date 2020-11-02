import path from 'ramda/src/path'
import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import * as usersActions from 'store/ducks/users/actions'
import * as LinkingService from 'services/Linking'

const FeedCardsService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const cards = useSelector(path(['users', 'usersGetCards', 'data']))

  const { usersDeleteCardRequest, handleCardPress } = useMemo(
    () => ({
      usersDeleteCardRequest: ({ cardId }) => {
        dispatch(usersActions.usersGetCardsOptimistic({ cardId }))
        dispatch(usersActions.usersDeleteCardRequest({ cardId }))
      },
      handleCardPress: ({ action, cardId }) => {
        usersDeleteCardRequest({ cardId })
        LinkingService.deeplinkNavigation(navigation)(action)
      },
    }),
    [],
  )

  return children({
    cards,
    handleCardPress,
    usersDeleteCardRequest,
  })
}

export default FeedCardsService
