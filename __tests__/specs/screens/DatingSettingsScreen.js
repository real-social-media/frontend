import React from 'react'
import { Button } from 'react-native'
import DatingSettingsScreen from 'screens/DatingSettingsScreen'
import { renderWithStore, act, fireEvent } from 'tests/utils'
import * as RNPermissions from 'react-native-permissions'
import * as authSelector from 'store/ducks/auth/selectors'
import { useNavigation } from '@react-navigation/native'
import * as usersActions from 'store/ducks/users/actions'
import * as RNPaper from 'react-native-paper'
import { testNavigate } from 'tests/utils/helpers'
import UploadAvatar from 'components/UploadAvatar'

const openUploadAvatarMenu = jest.fn()
jest.mock('components/UploadAvatar', () => jest.fn())
UploadAvatar.mockImplementation(({ children }) => children({ openUploadAvatarMenu }))

jest
  .spyOn(RNPaper.Switch, 'render')
  .mockImplementation(({ onValueChange, accessibilityLabel, value }) => (
    <Button onPress={onValueChange} accessibilityLabel={accessibilityLabel} title={accessibilityLabel} value={value} />
  ))

const user = {
  userId: 'id123',
  displayName: 'displayName',
  dateOfBirth: '1990-04-21',
  disableStatus: 'ENABLED',
  bio: 'Bio',
  signedUpAt: '2020-04-21',
  photo: {
    url480p: 'avatar.jpg',
  },
}

const setup = () => renderWithStore(<DatingSettingsScreen />)

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useFocusEffect: jest.fn(),
  useIsFocused: jest.fn().mockReturnValue(true),
}))

const navigation = { navigate: jest.fn(), goBack: jest.fn() }
useNavigation.mockReturnValue(navigation)

jest.spyOn(RNPermissions, 'request').mockResolvedValue(true)
jest.spyOn(RNPermissions, 'check').mockResolvedValue(RNPermissions.RESULTS.GRANTED)
jest.spyOn(authSelector, 'authUser').mockReturnValue(user)

describe('DatingSettingsScreen', () => {
  afterEach(() => {
    navigation.navigate.mockClear()
    navigation.goBack.mockClear()
    openUploadAvatarMenu.mockClear()
  })

  describe('Header', () => {
    it('Change Profile Picture', () => {
      const { getByAccessibilityLabel } = setup()

      fireEvent.press(getByAccessibilityLabel('CircleAvatar'))

      expect(openUploadAvatarMenu).toHaveBeenCalled()
    })

    it('User info', () => {
      const { getByText } = setup()

      expect(getByText(user.bio)).toBeTruthy()
      expect(getByText(`${user.displayName} 31`)).toBeTruthy()
    })
  })

  describe('Navigation', () => {
    it('Preview Profile', () => {
      const { getByText } = setup()

      fireEvent.press(getByText('Preview Profile'))

      testNavigate(navigation, 'DatingProfile')
    })

    it('Edit Profile', () => {
      const { getByText } = setup()

      fireEvent.press(getByText('Edit Profile'))

      testNavigate(navigation, 'DatingAbout')
    })

    it('Match Settings', () => {
      const { getByText } = setup()

      fireEvent.press(getByText('Match Settings'))

      testNavigate(navigation, 'DatingMatch')
    })

    it('Join Diamond', () => {
      const { getByText } = setup()

      fireEvent.press(getByText('Join Diamond'))

      testNavigate(navigation, 'Membership')
    })

    it('Manage Diamond', () => {
      const diamondUser = { ...user, subscriptionLevel: 'DIAMOND' }
      authSelector.authUser.mockReturnValue(diamondUser)
      const { getByText } = setup()

      fireEvent.press(getByText('Manage Diamond'))

      testNavigate(navigation, 'Membership')
      authSelector.authUser.mockReturnValue(user)
    })

    it('Change Profile Picture', () => {
      const { getByText } = setup()

      fireEvent.press(getByText('Change Profile Picture'))

      expect(openUploadAvatarMenu).toHaveBeenCalled()
    })
  })

  describe('Toggle Dating', () => {
    it('toggleDatingStatusRequest', async () => {
      const usersSetUserDatingStatusRequest = jest.spyOn(usersActions, 'usersSetUserDatingStatusRequest')
      const { getByAccessibilityLabel } = setup()

      await act(async () => {
        fireEvent.press(getByAccessibilityLabel('disableDating'))
      })

      expect(usersSetUserDatingStatusRequest).toHaveBeenCalledWith({ status: 'DISABLED' })

      await act(async () => {
        usersSetUserDatingStatusRequest.mockClear()
        fireEvent.press(getByAccessibilityLabel('disableDating'))
      })

      expect(usersSetUserDatingStatusRequest).toHaveBeenCalledWith({ status: 'ENABLED' })

      usersSetUserDatingStatusRequest.mockRestore()
    })
  })
})
