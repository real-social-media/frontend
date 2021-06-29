import React from 'react'
import ProfileEditScreen from 'screens/ProfileEditScreen'
import { renderWithStore, fireEvent, act } from 'tests/utils'
import { testField } from 'tests/utils/helpers'
import * as authSelector from 'store/ducks/auth/selectors'

jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn().mockReturnValue(true),
}))

jest.mock('@aws-amplify/api', () => ({
  graphql: jest.fn().mockResolvedValue({ data: { usernameStatus: 'AVAILABLE' } }),
  graphqlOperation: jest.fn().mockResolvedValue(true),
}))

const user = {
  email: 'valid@mail.com',
  username: 'username',
  fullName: 'fullName',
  bio: 'bio',
  phoneNumber: '12312312',
}

jest.spyOn(authSelector, 'authUser').mockReturnValue(user)

const setup = () => renderWithStore(<ProfileEditScreen />)

describe('ProfileEditScreen', () => {
  describe('Form', () => {
    it('have all necessary fields', () => {
      const { getByLabelText } = setup()

      testField(getByLabelText('email'), { name: 'email' })
      testField(getByLabelText('username'), { name: 'username' })
      testField(getByLabelText('fullName'), { name: 'fullName' })
      testField(getByLabelText('bio'), { name: 'bio' })
      testField(getByLabelText('phone'), { name: 'phoneNumber' })
    })

    it('submit button enable by default', () => {
      const { getByText } = setup()

      expect(getByText('Update')).toBeEnabled()
    })

    it('initial values', () => {
      const { getByLabelText } = setup()

      testField(getByLabelText('email'), { value: user.email })
      testField(getByLabelText('username'), { value: user.username })
      testField(getByLabelText('fullName'), { value: user.fullName })
      testField(getByLabelText('bio'), { value: user.bio })
      testField(getByLabelText('phone'), { value: user.phoneNumber })
    })

    it('submitting state', async () => {
      const { getByText } = setup()

      await act(async () => {
        fireEvent.press(getByText('Update'))
      })

      expect(getByText('Update')).toBeDisabled()
    })
  })
})
