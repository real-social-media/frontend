import React from 'react'
import { useDispatch } from 'react-redux'
import { renderWithProviders, fireEvent } from 'tests/utils'
import ProfilePhotoScreen from 'screens/ProfilePhotoScreen'
import * as cameraActions from 'store/ducks/camera/actions'
import { confirm } from 'components/Alert'
import useCamera from 'services/providers/Camera'
import { useNavigation } from '@react-navigation/native'
import * as authSelector from 'store/ducks/auth/selectors'
import { AuthProvider } from 'services/providers/Auth'
import { testNavigate } from 'tests/utils/helpers'

jest.spyOn(authSelector, 'authUserSelector').mockReturnValue({ userStatus: 'ACTIVE' })

jest.mock('components/ProfilePhotoUpload/Photo', () => jest.fn().mockReturnValue(null))
jest.mock('react-redux', () => ({ useDispatch: jest.fn(), useSelector: (cb) => cb() }))
jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn() }))
jest.mock('services/providers/Camera', () => jest.fn())
jest.mock('components/Alert', () => ({ confirm: jest.fn() }))

const navigation = { replace: jest.fn(), navigate: jest.fn() }
const dispatch = jest.fn()
const handleLibrarySnap = jest.fn()

useCamera.mockReturnValue({ handleLibrarySnap })
useNavigation.mockReturnValue(navigation)
useDispatch.mockReturnValue(dispatch)

const setup = () =>
  renderWithProviders(
    <AuthProvider>
      <ProfilePhotoScreen />
    </AuthProvider>,
  )

describe('Profile Picture screen', () => {
  afterEach(() => {
    dispatch.mockClear()
    navigation.replace.mockClear()
    navigation.navigate.mockClear()
    useCamera.mockClear()
    handleLibrarySnap.mockClear()
    confirm.mockClear()
  })

  it('Skip Photo Upload', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Skip Photo Upload'))
    expect(navigation.replace).toHaveBeenCalledWith('Settings')
  })

  it('Take a Photo', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Take a Photo'))
    expect(confirm).toHaveBeenCalled()

    confirm.mock.calls[0][0].onConfirm()
    expect(navigation.navigate).toHaveBeenCalledWith('Camera', { nextRoute: 'ProfilePhotoUpload' })
  })

  it('Redirect anonymous user', () => {
    authSelector.authUserSelector.mockReturnValueOnce({ userStatus: 'ANONYMOUS' })
    const { getByText } = setup()

    fireEvent.press(getByText('Take a Photo'))
    expect(confirm).toHaveBeenCalled()

    confirm.mock.calls[0][0].onConfirm()
    testNavigate(navigation, 'App.Root.ProfileUpgrade')
  })

  it('Choose From Gallery', () => {
    const payload = [{ preview: 'preview' }]
    const { getByText } = setup()

    expect(useCamera).toHaveBeenCalled()
    useCamera.mock.calls[0][0].handleProcessedPhoto(payload)
    expect(dispatch).toHaveBeenCalledWith(cameraActions.cameraCaptureRequest(payload))
    testNavigate(navigation, 'App.Root.Home.Profile.ProfilePhotoUpload', {
      type: 'IMAGE',
      photos: [payload[0].preview],
    })

    fireEvent.press(getByText('Choose From Gallery'))
    expect(confirm).toHaveBeenCalled()

    confirm.mock.calls[0][0].onConfirm()
    expect(handleLibrarySnap).toHaveBeenCalled()
  })
})
