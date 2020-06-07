import { useSelector, useDispatch } from 'react-redux'

const FeedCardsService = ({ children }) => {
  const dispatch = useDispatch()
  const usersGetCards = useSelector(state => state.users.usersGetCards)
 
  return children({
		usersGetCards,
  })
}

export default FeedCardsService
