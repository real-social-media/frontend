import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { openSettings } from 'react-native-permissions'
import * as actions from 'store/ducks/contacts/actions'
import * as selectors from 'store/ducks/contacts/selectors'
import useAppState from 'services/AppState'

const InviteFriendsService = ({ children }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const contactsGet = useSelector(selectors.contactsGet)
  const contactsInvite = useSelector(selectors.contactsInvite)

  const contactsCheckBonusRequest = () => dispatch(actions.contactsCheckBonusRequest())
  const contactsGetRequest = () => dispatch(actions.contactsGetRequest())
  const contactsInviteRequest = (contact) => dispatch(actions.contactsInviteRequest(contact))
  const contactsFollowRequest = ({ contactId, user }) => dispatch(actions.contactsFollowRequest({ contactId, user }))

  const checkPermissionUpdates = () => {    
    if (contactsGet.status === 'failure') {
      contactsGetRequest()
    }
  }

  useEffect(checkPermissionUpdates, [])
  useAppState({ onForeground: checkPermissionUpdates })

  return children({
    navigation,
    contactsGetRequest,
    contactsGet,
    openSettings,
    contactsInviteRequest,
    contactsFollowRequest,
    contactsCheckBonusRequest,
    contactsInvite,
  })
}

export default InviteFriendsService
