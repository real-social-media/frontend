import React from 'react'
import MembershipComponent from 'components/Membership'
import { renderWithProviders, fireEvent } from 'tests/utils'

const error = 'Error'
const requiredProps = { purchasesRequest: { error: '' }, retryPurchase: { error: '' } }
const setup = (props) => renderWithProviders(<MembershipComponent {...requiredProps} {...props} />)

describe('Membership component', () => {
  it('header', () => {
    const { getByText } = setup()

    getByText('REAL Diamond')
    getByText('Membership Perks')
  })

  it('membership Perks', () => {
    const { getByText } = setup()

    getByText('Profile Trending Boost')
    getByText('Boost your profile in trending photos')

    getByText('Dating Match Boost')
    getByText('Send your profile to the top of potential matchess')

    getByText('Profile Themes')
    getByText('Change the appearance of your profile')

    getByText('Live Chat Support')
    getByText('We\'re here to help!')

    getByText('Diamond Badge')
    getByText('A shiny badge next to your username')
  })

  it('subscribe button', () => {
    const requestSubscription = jest.fn()
    const { getByText, queryByText } = setup({ requestSubscription })
    const $button = getByText('Subscribe for $9.99 month')

    expect(queryByText('Become a member today')).toBeTruthy()

    expect($button).toBeEnabled()
    fireEvent.press($button)
    expect(requestSubscription).toHaveBeenCalled()
  })

  it('subscribe submitting state', () => {
    const requestSubscription = jest.fn()
    const { getByText } = setup({ requestSubscription, purchasesRequest: { status: 'loading' } })
    const $button = getByText('Subscribe for $9.99 month')

    expect($button).toBeDisabled()
  })

  it('unsubscribe button', () => {
    const manageSubscriptions = jest.fn()
    const { getByText, queryByText } = setup({ manageSubscriptions, isSubscribed: true })
    const $button = getByText('Unsubscribe')

    expect(queryByText('Become a member today')).not.toBeTruthy()

    fireEvent.press($button)
    expect(manageSubscriptions).toHaveBeenCalled()
  })

  it('purchasesRequest error', () => {
    const retryPurchaseRequest = jest.fn()
    const { getByText, queryByText } = setup({ retryPurchaseRequest, purchasesRequest: { error } })
    const $button = getByText('Retry Subscription')

    getByText(error)

    expect(queryByText('Unsubscribe')).toBeFalsy()
    expect(queryByText('Subscribe for $9.99 month')).toBeFalsy()

    fireEvent.press($button)
    expect(retryPurchaseRequest).toHaveBeenCalled()
  })

  it('retryPurchase error', () => {
    const retryPurchaseRequest = jest.fn()
    const { getByText, queryByText } = setup({ retryPurchaseRequest, retryPurchase: { error } })
    const $button = getByText('Retry Subscription')

    getByText(error)

    expect(queryByText('Unsubscribe')).toBeFalsy()
    expect(queryByText('Subscribe for $9.99 month')).toBeFalsy()

    fireEvent.press($button)
    expect(retryPurchaseRequest).toHaveBeenCalled()
  })

  it('retryPurchase submitting state', () => {
    const retryPurchaseRequest = jest.fn()
    const { getByText } = setup({ retryPurchaseRequest, retryPurchase: { status: 'loading', error } })
    const $button = getByText('Retry Subscription')

    expect($button).toBeDisabled()
  })
})
