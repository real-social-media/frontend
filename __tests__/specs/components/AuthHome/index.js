import React from 'react'
import { renderWithProviders, fireEvent } from 'tests/utils'
import AuthHomeComponent from 'components/AuthHome'
import testIDs from 'components/AuthHome/test-ids'

jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn() }))

const requiredProps = {
  authSigninGoogle: { status: 'idle' },
  authSigninGoogleRequest: jest.fn(),
  authSigninApple: { status: 'idle' },
  authSigninAppleRequest: jest.fn(),
  authSigninAnonymous: { status: 'idle' },
  authSigninAnonymousRequest: jest.fn(),
}

const setup = (props) => renderWithProviders(<AuthHomeComponent {...requiredProps} {...props} />)

describe('Auth home component', () => {
  describe('header left', () => {
    it('continue as anonymous user on close button click', () => {
      const authSigninAnonymousRequest = jest.fn()
      const { getByTestId } = setup({ authSigninAnonymousRequest })

      fireEvent.press(getByTestId(testIDs.closeBtn))

      expect(authSigninAnonymousRequest).toHaveBeenCalled()
    })

    it('disable close button on loading state', () => {
      const authSigninAnonymousRequest = jest.fn()
      const authSigninAnonymous = { status: 'loading' }
      const { getByTestId } = setup({ authSigninAnonymousRequest, authSigninAnonymous })

      fireEvent.press(getByTestId(testIDs.closeBtn))

      expect(authSigninAnonymousRequest).not.toHaveBeenCalled()
    })
  })

  describe('header right', () => {
    it('continue as anonymous user on skip button click', () => {
      const authSigninAnonymousRequest = jest.fn()
      const { getByTestId } = setup({ authSigninAnonymousRequest })

      fireEvent.press(getByTestId(testIDs.skipBtn))

      expect(authSigninAnonymousRequest).toHaveBeenCalled()
    })

    it('disable close button on loading state', () => {
      const authSigninAnonymousRequest = jest.fn()
      const authSigninAnonymous = { status: 'loading' }
      const { getByTestId } = setup({ authSigninAnonymousRequest, authSigninAnonymous })

      fireEvent.press(getByTestId(testIDs.skipBtn))

      expect(authSigninAnonymousRequest).not.toHaveBeenCalled()
    })
  })
})
