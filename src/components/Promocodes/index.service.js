import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import * as actions from 'store/ducks/promocodes/actions'
import * as selectors from 'store/ducks/promocodes/selectors'
import * as Validation from 'services/Validation'
import * as authSelector from 'store/ducks/auth/selectors'
import * as UserService from 'services/User'

const PromocodesService = ({ children }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const promoCodesRedeem = useSelector(selectors.promoCodesRedeem)
  const user = useSelector(authSelector.authUser)
  const isSubscribed = UserService.isUserSubscribed(user)

  const handleFormTransform = (values) => ({
    code: Validation.getPromocode(values),
  })

  const handleFormSubmit = (values, formApi) => {
    const nextValues = handleFormTransform(values)
    formApi.setValues(nextValues)

    dispatch(actions.promoCodesRedeemRequest(nextValues))
  }

  const formSubmitLoading = promoCodesRedeem.status === 'loading'
  const formInitialValues = { code: '' }

  return children({
    isSubscribed,
    navigation,
    handleFormSubmit,
    formSubmitLoading,
    formInitialValues,
  })
}

export default PromocodesService
