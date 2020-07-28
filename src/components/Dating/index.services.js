import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  // useNavigation,
  // useRoute
 } from '@react-navigation/native'
// import * as navigationActions from 'navigation/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as datingSelector from 'store/ducks/dating/selectors'
import * as datingActions from 'store/ducks/dating/actions'

const DatingService = ({ children }) => {
  const dispatch = useDispatch()
  // const route = useRoute()
  const user = useSelector(authSelector.authUserSelector)
  const partners = useSelector(datingSelector.datingGetPartnersSelector)
  const partnersInfo = useSelector(datingSelector.datingGetPartnersInfoSelector)
  const themeFetch = useSelector(state => state.theme.themeFetch)


  const datingGetPartners= (payload) =>
      {
      return dispatch(datingActions.datingGetPartners(payload))
      }


  useEffect(() => {
    datingGetPartners()
  }, [])

  return children({
    user,
    themeFetch,
    partners,
    partnersInfo,
    datingGetPartners
  })
}

export default DatingService
