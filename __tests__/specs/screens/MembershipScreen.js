import React from 'react'
import { Linking } from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { renderWithStore, fireEvent, act } from 'tests/utils'
import { testNavigate } from 'tests/utils/helpers'
import * as authActions from 'store/ducks/auth/actions'
import * as purchasesActions from 'store/ducks/purchases/actions'
import MembershipScreen from 'screens/MembershipScreen'

/**
 * Mock Data
 */
const basicUser = { subscriptionLevel: 'BASIC' }
const premiumUser = { subscriptionLevel: 'DIAMOND' }
const subscription = { productId: 'app.real.mobile.diamond1M' }

/**
 * Mock Functions
 */
jest.spyOn(Linking, 'openURL')
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useIsFocused: jest.fn(),
}))

const navigation = { navigate: jest.fn() }
useNavigation.mockReturnValue(navigation)

const setup = () =>
  renderWithStore(<MembershipScreen />, [
    authActions.authGetUserSuccess({ data: basicUser }),
    purchasesActions.subscriptionGetSuccess({ localizedPrice: '$0.99' }),
  ])

describe('Membership Screen', () => {
  afterEach(() => {
    Linking.openURL.mockClear()
  })

  it('request subscription on mount', () => {
    const subscriptionGetRequest = jest
      .spyOn(purchasesActions, 'subscriptionGetRequest')
      .mockReturnValue({ type: 'MOCK' })

    useIsFocused.mockResolvedValueOnce(true)

    setup()

    expect(subscriptionGetRequest).toHaveBeenCalledWith(subscription)
    subscriptionGetRequest.mockRestore()
  })

  it('user with basic subscription try to subscribe', () => {
    const purchaseRequest = jest.spyOn(purchasesActions, 'purchaseRequest').mockReturnValue({ type: 'MOCK' })
    const { getByText } = setup()

    fireEvent.press(getByText('Subscribe for $0.99 month'))

    expect(purchaseRequest).toHaveBeenCalledWith(subscription)
    purchaseRequest.mockRestore()
  })

  it('get free diamond button', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Get Free Diamond For Life'))
    testNavigate(navigation, 'InviteFriends')
  })

  it('user with premium subscription try to unsubscribe', async () => {
    const { getByText, store } = setup()

    await act(async () => {
      store.dispatch(authActions.authGetUserSuccess({ data: premiumUser }))
    })

    fireEvent.press(getByText('Unsubscribe'))

    expect(Linking.openURL).toHaveBeenCalledWith('https://apps.apple.com/account/subscriptions')
  })

  describe('submitting state', () => {
    it('subscribe submitting state', async () => {
      const { getByText, store } = setup()

      await act(async () => {
        store.dispatch(purchasesActions.purchaseRequest(subscription))
      })

      expect(getByText('Subscribe for $0.99 month')).toBeDisabled()
    })
  })

  describe('error state', () => {
    it('subscribe failure', async () => {
      const retryPurchaseRequest = jest
        .spyOn(purchasesActions, 'retryPurchaseRequest')
        .mockReturnValue({ type: 'MOCK' })

      const { getByText, queryByText, store } = setup()

      await act(async () => {
        store.dispatch(purchasesActions.purchaseFailure(new Error('Error')))
      })

      expect(queryByText('Subscribe for $0.99 month')).toBeFalsy()
      fireEvent.press(getByText('Retry Subscription'))

      expect(retryPurchaseRequest).toHaveBeenCalledWith(subscription)
      retryPurchaseRequest.mockRestore()
    })

    it('retry failure', async () => {
      const retryPurchaseRequest = jest
        .spyOn(purchasesActions, 'retryPurchaseRequest')
        .mockReturnValue({ type: 'MOCK' })

      const { getByText, queryByText, store } = setup()

      await act(async () => {
        store.dispatch(purchasesActions.purchaseFailure(new Error('Error')))
      })

      expect(queryByText('Subscribe for $0.99 month')).toBeFalsy()
      fireEvent.press(getByText('Retry Subscription'))

      expect(retryPurchaseRequest).toHaveBeenCalledWith(subscription)
      retryPurchaseRequest.mockRestore()
    })

    it('contact us', async () => {
      const { getByText, store } = setup()

      await act(async () => {
        store.dispatch(purchasesActions.purchaseFailure(new Error('Error')))
      })

      fireEvent.press(getByText('Or contact us'))

      expect(Linking.openURL).toHaveBeenCalledWith('mailto:support@real.app')
    })
  })
})
