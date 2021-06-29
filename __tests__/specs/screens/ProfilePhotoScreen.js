import React from 'react'
import { useDispatch } from 'react-redux'
import { renderWithProviders, fireEvent } from 'tests/utils'
import ProfilePhotoScreen from 'screens/ProfilePhotoScreen'
import * as cameraActions from 'store/ducks/camera/actions'
import { confirm } from 'components/Alert'
import useLibrary from 'services/providers/Camera/useLibrary'
import { useNavigation } from '@react-navigation/native'
import * as authSelector from 'store/ducks/auth/selectors'
import { AuthProvider } from 'services/providers/Auth'
import { testNavigate } from 'tests/utils/helpers'

jest
  .spyOn(authSelector, 'authUser')
  .mockReturnValue({ userStatus: 'ACTIVE', photo: { url: 'placeholder-photos/' } })

jest.mock('components/ProfilePhotoUpload/Photo', () => jest.fn().mockReturnValue(null))
jest.mock('react-redux', () => ({ useDispatch: jest.fn(), useSelector: (cb) => cb() }))
jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn() }))
jest.mock('services/providers/Camera/useLibrary', () => jest.fn())
jest.mock('components/Alert', () => ({ confirm: jest.fn() }))

const navigation = { replace: jest.fn(), navigate: jest.fn(), goBack: jest.fn() }
const dispatch = jest.fn()
const handleLibrarySnap = jest.fn()

useLibrary.mockReturnValue({ handleLibrarySnap })
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
    useLibrary.mockClear()
    handleLibrarySnap.mockClear()
    confirm.mockClear()
  })

  it('Skip Photo Upload', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Skip Photo Upload'))
    expect(navigation.goBack).toHaveBeenCalled()
  })

  it('Take a Photo', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Take a Photo'))
    expect(confirm).toHaveBeenCalled()

    confirm.mock.calls[0][0].onConfirm()
    testNavigate(navigation, 'Camera', {
      backRoute: 'ProfileSelf',
      nextRoute: 'ProfilePhotoUpload',
      multiple: false,
    })
  })

  it('Redirect anonymous user', () => {
    authSelector.authUser.mockReturnValue({ userStatus: 'ANONYMOUS', photo: { url: 'placeholder-photos/' } })
    const { getByText } = setup()

    fireEvent.press(getByText('Take a Photo'))
    expect(confirm).toHaveBeenCalled()

    confirm.mock.calls[0][0].onConfirm()
    testNavigate(navigation, 'App.Root.ProfileUpgrade')
    authSelector.authUser.mockReturnValue({ userStatus: 'ACTIVE', photo: { url: 'placeholder-photos/' } })
  })

  it('Choose From Gallery', () => {
    const payload = [{ preview: 'preview' }]
    const { getByText } = setup()

    expect(useLibrary).toHaveBeenCalled()
    useLibrary.mock.calls[0][0].handleProcessedPhoto(payload)
    expect(dispatch).toHaveBeenCalledWith(cameraActions.cameraCaptureRequest(payload))
    testNavigate(navigation, 'App.Root.Home.Profile.ProfilePhotoUpload', {
      backRoute: 'ProfileSelf',
    })

    fireEvent.press(getByText('Choose From Gallery'))
    expect(confirm).toHaveBeenCalled()

    confirm.mock.calls[0][0].onConfirm()
    expect(handleLibrarySnap).toHaveBeenCalled()
  })
})
