import React from 'react'
import MembershipComponent from 'components/Membership'
import { renderWithProviders, fireEvent } from 'tests/utils'

/**
 * Mock Data
 */
const subscriptionGet = {
  success: {
    status: 'success',
    data: {
      localizedPrice: '$0.99',
    },
  },
}

const requiredProps = {
  purchasesRequest: { status: 'idle' },
  retryPurchase: { status: 'idle' },
  subscriptionGet: { status: 'idle' },
}

const setup = (props) => renderWithProviders(<MembershipComponent {...requiredProps} {...props} />)

describe('Membership component', () => {
  it('header', () => {
    const { getByText } = setup()

    getByText('REAL Diamond')
    getByText('Membership Perks')
  })

  it('membership Perks', () => {
    const { getByText } = setup()

    getByText('Creator Payouts (coming soon)')
    getByText('We pay you for each view received on posts')

    getByText('Profile Themes')
    getByText('Change the look and feel of your profile')

    getByText('Diamond Badge')
    getByText('A shiny badge next to your username')

    getByText('Profile Trending Boost')
    getByText('Your posts are more likely to become trending')

    getByText('Dating Match Boost')
    getByText('People are more likely to discover you in dating')

    getByText('Live Chat Support (coming soon)')
    getByText('Chat with us 24/7, we are at your service')
  })

  describe('subscribe button', () => {
    it('subscribe button', () => {
      const requestSubscription = jest.fn()
      const { getByText } = setup({ requestSubscription, subscriptionGet: subscriptionGet.success })
      const $button = getByText('Subscribe for $0.99 month')

      expect($button).toBeEnabled()
      fireEvent.press($button)
      expect(requestSubscription).toHaveBeenCalled()
    })

    it('subscribe submitting state', () => {
      const requestSubscription = jest.fn()
      const { getByText } = setup({
        requestSubscription,
        purchasesRequest: { status: 'loading' },
        subscriptionGet: subscriptionGet.success,
      })

      const $button = getByText('Subscribe for $0.99 month')

      expect($button).toBeDisabled()
    })

    it('price loading', () => {
      const requestSubscription = jest.fn()
      const { getByText } = setup({ requestSubscription, subscriptionGet: { status: 'loading' } })
      const $button = getByText('Loading price')

      expect($button).toBeDisabled()
    })

    it('price loading failure', () => {
      const requestSubscription = jest.fn()
      const { getByText } = setup({ requestSubscription, subscriptionGet: { status: 'failure' } })

      getByText('Loading price failed')
      getByText('Pull down to refresh')
    })
  })

  it('unsubscribe button', () => {
    const manageSubscriptions = jest.fn()
    const { getByText } = setup({ manageSubscriptions, isSubscribed: true })
    const $button = getByText('Unsubscribe')

    fireEvent.press($button)
    expect(manageSubscriptions).toHaveBeenCalled()
  })

  it('purchasesRequest failure', () => {
    const retryPurchaseRequest = jest.fn()
    const { getByText, queryByText } = setup({
      retryPurchaseRequest,
      purchasesRequest: { status: 'failure' },
      subscriptionGet: subscriptionGet.success,
    })
    const $button = getByText('Retry Subscription')

    expect(queryByText('Unsubscribe')).toBeFalsy()
    expect(queryByText('Subscribe for $0.99 month')).toBeFalsy()

    fireEvent.press($button)
    expect(retryPurchaseRequest).toHaveBeenCalled()
  })

  it('retryPurchase failure', () => {
    const retryPurchaseRequest = jest.fn()
    const { getByText, queryByText } = setup({
      retryPurchaseRequest,
      retryPurchase: { status: 'failure' },
      subscriptionGet: subscriptionGet.success,
    })
    const $button = getByText('Retry Subscription')

    expect(queryByText('Unsubscribe')).toBeFalsy()
    expect(queryByText('Subscribe for $0.99 month')).toBeFalsy()

    fireEvent.press($button)
    expect(retryPurchaseRequest).toHaveBeenCalled()
  })

  it('get free diamond button', () => {
    const navigateInviteFriends = jest.fn()
    const { getByText } = setup({ isSubscribed: false, navigateInviteFriends })

    fireEvent.press(getByText('Get Free Diamond For Life'))
    expect(navigateInviteFriends).toHaveBeenCalled()
  })

  it('hide get free diamond button for diamond user', () => {
    const { queryByText } = setup({ isSubscribed: true })

    expect(queryByText('Get Free Diamond For Life')).toBeFalsy()
  })
})
