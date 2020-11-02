import React from 'react'
import { Linking } from 'react-native'
import { useDispatch } from 'react-redux'
import { renderWithProviders, fireEvent } from 'tests/utils'
import * as purchasesActions from 'store/ducks/purchases/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as purchasesSelectors from 'store/ducks/purchases/selectors'
import MembershipScreen from 'screens/MembershipScreen'

jest.spyOn(Linking, 'openURL')
jest.mock('react-redux', () => ({ useDispatch: jest.fn(), useSelector: (fn) => fn() }))
jest.mock('store/ducks/auth/selectors', () => ({ authUserSelector: jest.fn() }))
jest.mock('store/ducks/purchases/selectors', () => ({ purchasesRequest: jest.fn(), retryPurchase: jest.fn() }))

const basicUser = { subscriptionLevel: 'BASIC' }
const premiumUser = { subscriptionLevel: 'DIAMOND' }

authSelector.authUserSelector.mockReturnValue(basicUser)
purchasesSelectors.purchasesRequest.mockReturnValue({ status: 'idle', error: '' })
purchasesSelectors.retryPurchase.mockReturnValue({ status: 'idle', error: '' })

const dispatch = jest.fn()
useDispatch.mockReturnValue(dispatch)

const setup = () => renderWithProviders(<MembershipScreen />)

describe('Membership Screen', () => {
  afterEach(() => {
    dispatch.mockClear()
    Linking.openURL.mockClear()
  })

  it('user with basic subscription try to subscribe', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Subscribe for $9.99 month'))

    expect(dispatch).toHaveBeenCalledWith(purchasesActions.purchaseRequest({ productId: 'app.real.mobile.diamond1M' }))
  })

  it('user with premium subscription try to unsubscribe', () => {
    authSelector.authUserSelector.mockReturnValueOnce(premiumUser)
    const { getByText } = setup()

    fireEvent.press(getByText('Unsubscribe'))

    expect(Linking.openURL).toHaveBeenCalledWith('https://apps.apple.com/account/subscriptions')
  })

  describe('submitting state', () => {
    it('subscribe submitting state', () => {
      purchasesSelectors.purchasesRequest.mockReturnValueOnce({ status: 'loading' })
      const { getByText } = setup()

      expect(getByText('Subscribe for $9.99 month')).toBeDisabled()
    })

    it('retry submitting state', () => {
      purchasesSelectors.purchasesRequest.mockReturnValueOnce({ status: 'failure', error: 'error' })
      purchasesSelectors.retryPurchase.mockReturnValueOnce({ status: 'loading' })
      const { getByText } = setup()

      expect(getByText('Retry Subscription')).toBeDisabled()
    })
  })

  describe('error state', () => {
    it('subscribe failure', () => {
      purchasesSelectors.purchasesRequest.mockReturnValue({ status: 'failure', error: 'Error' })

      const { getByText, queryByText } = setup()

      expect(queryByText('Subscribe for $9.99 month')).toBeFalsy()
      fireEvent.press(getByText('Retry Subscription'))

      expect(dispatch).toHaveBeenCalledWith(purchasesActions.retryPurchaseRequest({ productId: 'app.real.mobile.diamond1M' }))
    })

    it('retry failure', () => {
      purchasesSelectors.retryPurchase.mockReturnValue({ status: 'failure', error: 'Error' })

      const { getByText, queryByText } = setup()

      expect(queryByText('Subscribe for $9.99 month')).toBeFalsy()
      fireEvent.press(getByText('Retry Subscription'))

      expect(dispatch).toHaveBeenCalledWith(purchasesActions.retryPurchaseRequest({ productId: 'app.real.mobile.diamond1M' }))
    })

    it('contact us', () => {
      purchasesSelectors.purchasesRequest.mockReturnValue({ status: 'failure', error: 'Error' })

      const { getByText } = setup()

      fireEvent.press(getByText('Or contact us'))

      expect(Linking.openURL).toHaveBeenCalledWith('mailto:support@real.app')
    })
  })
})
