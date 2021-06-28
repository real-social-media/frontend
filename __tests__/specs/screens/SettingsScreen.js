import React from 'react'
import { Alert } from 'react-native'
import SettingsScreen from 'screens/SettingsScreen'
import { renderWithStore, fireEvent, act } from 'tests/utils'
import { useNavigation } from '@react-navigation/native'
import * as authSelector from 'store/ducks/auth/selectors'
import codePush from 'react-native-code-push'
import DeviceInfo from 'react-native-device-info'
import * as usersActions from 'store/ducks/users/actions'
import * as ReactRedux from 'react-redux'

const user = {
  userId: 'id123',
  gender: 'FEMALE',
  fullName: 'fullName',
  dateOfBirth: '1990-04-21',
  height: 170,
  bio: 'bio',
}

jest.spyOn(authSelector, 'authUserSelector').mockReturnValue(user)
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useFocusEffect: jest.fn(),
  useIsFocused: jest.fn().mockReturnValue(true),
}))
jest.mock('react-native-code-push', () => ({ getUpdateMetadata: jest.fn() }))
jest.mock('react-native-device-info', () => ({ getReadableVersion: jest.fn() }))
jest.mock('components/ActionSheet', () => jest.fn().mockReturnValue(null))
jest.mock('components/Alert', () => ({ confirm: jest.fn() }))
jest.mock('templates/Avatar', () => () => null)
jest.mock('templates/SettingsAvatar', () => () => null)
jest.mock('services/OTA', () => ({ useOTAVersion: jest.fn().mockReturnValue({ appVersion: '17' }) }))

const navigation = { navigate: jest.fn() }
useNavigation.mockReturnValue(navigation)

const OTAVersion = '123'
codePush.getUpdateMetadata.mockResolvedValue({ label: OTAVersion })

const appVersion = '987'
DeviceInfo.getReadableVersion.mockReturnValue(appVersion)

const setup = () => renderWithStore(<SettingsScreen />)

describe('SettingsScreen', () => {
  describe('Delete Profile', () => {
    beforeAll(() => {
      jest.spyOn(Alert, 'alert')
    })

    afterAll(() => {
      Alert.alert.mockRestore()
    })

    afterEach(() => {
      Alert.alert.mockClear()
    })

    it('layout', () => {
      const { getByText } = setup()

      expect(getByText('Delete Your Profile')).toBeTruthy()
      expect(getByText('Be aware that this action is non-reversible!')).toBeTruthy()
    })

    it('confirm delete profile', async () => {
      const { getByText } = setup()

      await act(async () => {
        fireEvent.press(getByText('Delete Your Profile'))
      })

      expect(Alert.alert).toHaveBeenCalled()

      const [title, message, buttons, options] = Alert.alert.mock.calls[0]

      expect(title).toBe('Profile Delete')
      expect(message).toBe('Your profile will be deleted permanently!')
      expect(options).toEqual({ cancelable: true })

      expect(buttons[0].text).toBe('Delete now')
      expect(buttons[1]).toEqual({ style: 'cancel', text: 'Cancel' })
    })

    it('delete request', async () => {
      const dispatch = jest.fn()
      jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(dispatch)

      const { getByText } = setup()

      await act(async () => {
        fireEvent.press(getByText('Delete Your Profile'))
      })

      await act(async () => {
        const deleteBtn = Alert.alert.mock.calls[0][2][0]
        deleteBtn.onPress()
      })

      expect(dispatch).toHaveBeenCalledWith({ type: 'USERS_DELETE_REQUEST' })

      ReactRedux.useDispatch.mockRestore()
    })

    it('loading state', async () => {
      const { store, getByText } = setup()

      await act(async () => {
        store.dispatch(usersActions.usersDeleteRequest())
      })

      expect(getByText('Delete Your Profile')).toBeDisabled()
    })
  })
})
