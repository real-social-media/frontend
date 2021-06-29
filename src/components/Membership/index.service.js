import { Linking } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import * as navigationActions from 'navigation/actions'
import * as purchasesActions from 'store/ducks/purchases/actions'
import * as purchasesConstants from 'store/ducks/purchases/constants'
import * as purchasesSelectors from 'store/ducks/purchases/selectors'
import * as authSelector from 'store/ducks/auth/selectors'
import { useEffectWhenFocused } from 'services/hooks'
import * as UserService from 'services/User'

const MembershipService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector(authSelector.authUser)
  const purchasesRequest = useSelector(purchasesSelectors.purchasesRequest)
  const retryPurchase = useSelector(purchasesSelectors.retryPurchase)
  const subscriptionGet = useSelector(purchasesSelectors.subscriptionGet)

  const subscription = { productId: purchasesConstants.PRIMARY_SUBSCRIPTION }
  const isSubscribed = UserService.isUserSubscribed(user)

  const requestSubscription = navigationActions.mockForWeb(
    () => dispatch(purchasesActions.purchaseRequest(subscription)),
    navigation,
  )
  const retryPurchaseRequest = navigationActions.mockForWeb(
    () => dispatch(purchasesActions.retryPurchaseRequest(subscription)),
    navigation,
  )

  const subscriptionGetRequest = () => dispatch(purchasesActions.subscriptionGetRequest(subscription))
  const manageSubscriptions = () => Linking.openURL('https://apps.apple.com/account/subscriptions')
  const handleContactUs = () => Linking.openURL('mailto:support@real.app')
  const navigateInviteFriends = navigationActions.navigateInviteFriends(navigation)
  const navigatePayouts = navigationActions.navigatePayouts(navigation)
  const navigateTheme = () => navigationActions.navigateTheme(navigation)

  useEffectWhenFocused(() => {
    subscriptionGetRequest()
  }, [])

  return children({
    isSubscribed,
    purchasesRequest,
    retryPurchase,
    requestSubscription,
    manageSubscriptions,
    handleContactUs,
    retryPurchaseRequest,
    navigateInviteFriends,
    navigatePayouts,
    navigateTheme,
    subscriptionGet,
    subscriptionGetRequest,
  })
}

export default MembershipService
