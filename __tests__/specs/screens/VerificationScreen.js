import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import { renderWithProviders, fireEvent } from 'tests/utils'
import VerificationScreen from 'screens/VerificationScreen'
import { VERIFICATION_TYPE } from 'components/Verification'
import * as usersActions from 'store/ducks/users/actions'
import * as authActions from 'store/ducks/auth/actions'
import { savePhotoValidation } from 'services/Auth'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}))

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}))

jest.mock('services/Auth', () => ({
  savePhotoValidation: jest.fn(),
}))

const setup = () => renderWithProviders(<VerificationScreen />)

describe('Verification screen', () => {
  describe('actionType: CONTINUE', () => {
    const actionType = VERIFICATION_TYPE.CONTINUE

    it('should handle callback from route params and close popup', () => {
      const handleNext = jest.fn()
      const navigation = { goBack: jest.fn() }

      useRoute.mockReturnValueOnce({ params: { actionType, handleNext } })
      useNavigation.mockReturnValueOnce(navigation)

      const { getByText } = setup()

      fireEvent.press(getByText('Continue'))

      expect(handleNext).toHaveBeenCalled()
      expect(navigation.goBack).toHaveBeenCalled()
    })
  })

  describe('actionType: HOME', () => {
    const actionType = VERIFICATION_TYPE.HOME

    it('should handle callback and close popup', () => {
      const navigation = { goBack: jest.fn() }
      const dispatch = jest.fn()

      useRoute.mockReturnValueOnce({ params: { actionType } })
      useNavigation.mockReturnValueOnce(navigation)
      useDispatch.mockReturnValueOnce(dispatch)

      const { getByText } = setup()

      fireEvent.press(getByText('Hide and Proceed'))

      expect(dispatch).toHaveBeenCalledWith(usersActions.usersEditProfileIdle({}))
      expect(navigation.goBack).toHaveBeenCalled()
    })
  })

  describe('actionType: BACK', () => {
    const actionType = VERIFICATION_TYPE.BACK

    it('should handle callback and close popup', () => {
      const navigation = { goBack: jest.fn() }
      const dispatch = jest.fn()

      useRoute.mockReturnValueOnce({ params: { actionType } })
      useNavigation.mockReturnValueOnce(navigation)
      useDispatch.mockReturnValueOnce(dispatch)

      const { getByText } = setup()

      fireEvent.press(getByText('Go Back'))

      expect(dispatch).toHaveBeenCalledWith(usersActions.usersEditProfileIdle({}))
      expect(navigation.goBack).toHaveBeenCalled()
    })
  })

  describe('actionType: HIDE', () => {
    const actionType = VERIFICATION_TYPE.HIDE

    it('should handle callback on Go Back button tap and close popup', () => {
      const navigation = { goBack: jest.fn() }
      const dispatch = jest.fn()

      useRoute.mockReturnValueOnce({ params: { actionType } })
      useNavigation.mockReturnValueOnce(navigation)
      useDispatch.mockReturnValueOnce(dispatch)

      const { getByText } = setup()

      fireEvent.press(getByText('Go Back'))

      expect(dispatch).toHaveBeenCalledWith(usersActions.usersEditProfileIdle({}))
      expect(navigation.goBack).toHaveBeenCalled()
    })

    it('should handle callback on Hide and Proceed button tap and close popup', () => {
      const dispatch = jest.fn()

      useRoute.mockReturnValueOnce({ params: { actionType } })
      useDispatch.mockReturnValueOnce(dispatch)

      const { getByText } = setup()

      fireEvent.press(getByText('Hide and Proceed'))

      expect(dispatch).toHaveBeenCalledWith(usersActions.usersEditProfileIdle({}))
      expect(dispatch).toHaveBeenCalledWith(authActions.authCheckIdle({ nextRoute: 'Root' }))

      expect(savePhotoValidation).toHaveBeenCalled()
    })
  })

  describe('header options based on route params', () => {
    it('not update header options by default', () => {
      const navigation = { setOptions: jest.fn() }

      useRoute.mockReturnValueOnce({ params: { actionType: VERIFICATION_TYPE.HIDE } })
      useNavigation.mockReturnValueOnce(navigation)

      setup()

      expect(navigation.setOptions).not.toHaveBeenCalled()
    })

    it('set headerShown', () => {
      const navigation = { setOptions: jest.fn() }

      useRoute.mockReturnValueOnce({ params: { actionType: VERIFICATION_TYPE.HIDE, showHeader: true } })
      useNavigation.mockReturnValueOnce(navigation)

      setup()

      expect(navigation.setOptions).toHaveBeenCalledWith({ headerShown: true })
    })
  })
})
