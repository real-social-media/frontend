import React from 'react'
import AuthPasswordScreen from 'screens/AuthPasswordScreen'
import { renderWithStore, fireEvent, act } from 'tests/utils'
import * as signupActions from 'store/ducks/signup/actions'
import { testField } from 'tests/utils/helpers'
import * as Validation from 'services/Validation'
import { useNavigation } from '@react-navigation/native'

const password = '12345678'
const navigation = { navigate: jest.fn() }

jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn(), useRoute: jest.fn() }))
useNavigation.mockReturnValue(navigation)

const setup = () => renderWithStore(<AuthPasswordScreen />)

describe('AuthPasswordScreen', () => {
  it('header', () => {
    const { getByText } = setup()

    expect(getByText('Secure Your Account')).toBeTruthy()
    expect(getByText('Password must be at least 8 characters')).toBeTruthy()
  })

  it('form', () => {
    const { getByLabelText } = setup()

    testField(getByLabelText('password'), {
      name: 'password',
      value: undefined,
      ...Validation.getInputTypeProps('password'),
    })
  })

  it('submit form with valid values', async () => {
    const signupPasswordRequest = jest.spyOn(signupActions, 'signupPasswordRequest')
    const { getByText, getByLabelText } = setup()

    await act(async () => fireEvent.changeText(getByLabelText('password'), password))
    await act(async () => fireEvent.press(getByText('Next')))
    expect(signupPasswordRequest).toHaveBeenCalledWith({ password })

    signupPasswordRequest.mockRestore()
  })

  it('loading state', async () => {
    const { store, getByText } = setup()

    await act(async () => {
      store.dispatch(signupActions.signupPasswordRequest({}))
    })

    expect(getByText('Next')).toBeDisabled()
  })

  it('clear reducer on unmount', () => {
    jest.spyOn(signupActions, 'signupPasswordIdle')

    const { unmount } = setup()

    unmount()
    expect(signupActions.signupPasswordIdle).toHaveBeenCalled()

    signupActions.signupPasswordIdle.mockRestore()
  })
})
