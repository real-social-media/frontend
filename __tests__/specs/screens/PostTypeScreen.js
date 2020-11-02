import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { renderWithProviders, fireEvent, sleep } from 'tests/utils'
import PostTypeScreen from 'screens/PostTypeScreen'
import { VERIFICATION_TYPE } from 'components/Verification'
import useCamera from 'services/providers/Camera'
import * as cameraActions from 'store/ducks/camera/actions'
import AsyncStorage from '@react-native-community/async-storage'
import testIDs from 'components/PostType/test-ids'
import * as authSelector from 'store/ducks/auth/selectors'
import { AuthProvider } from 'services/providers/Auth'
import { testNavigate } from 'tests/utils/helpers'

jest.spyOn(authSelector, 'authUserSelector').mockReturnValue({ userStatus: 'ACTIVE' })

jest.mock('react-redux', () => ({ useDispatch: jest.fn(), useSelector: (cb) => cb() }))
jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn() }))
jest.mock('services/providers/Camera')

const dispatch = jest.fn()
useDispatch.mockReturnValue(dispatch)

const setup = () =>
  renderWithProviders(
    <AuthProvider>
      <PostTypeScreen />
    </AuthProvider>,
  )

describe('PostType screen', () => {
  beforeEach(() => {
    useCamera.mockReset()
    dispatch.mockClear()
  })

  it('redirect to camera screen on Photo button tab', () => {
    const navigation = { popToTop: jest.fn(), navigate: jest.fn() }

    useNavigation.mockReturnValueOnce(navigation)

    const { getByText } = setup()

    fireEvent.press(getByText('Photo'))
    expect(navigation.popToTop).toHaveBeenCalled()
    expect(navigation.navigate).toHaveBeenCalledWith('Camera', {})
  })

  it('Redirect anonymous user', () => {
    authSelector.authUserSelector.mockReturnValueOnce({ userStatus: 'ANONYMOUS' })
    const navigation = { popToTop: jest.fn(), navigate: jest.fn() }

    useNavigation.mockReturnValueOnce(navigation)

    const { getByText } = setup()

    fireEvent.press(getByText('Photo'))
    testNavigate(navigation, 'App.Root.ProfileUpgrade')
  })

  it('redirect to text post create form on Text button tab', () => {
    const navigation = { popToTop: jest.fn(), navigate: jest.fn() }

    useNavigation.mockReturnValueOnce(navigation)

    const { getByText } = setup()

    fireEvent.press(getByText('Text'))
    expect(navigation.popToTop).toHaveBeenCalled()
    testNavigate(navigation, 'PostCreate', { type: 'TEXT_ONLY' })
  })

  it('redirect to verification screen only first time when user create a post from gallery', async () => {
    const navigation = { popToTop: jest.fn(), navigate: jest.fn() }
    const handleLibrarySnap = jest.fn()

    AsyncStorage.getItem.mockResolvedValueOnce(undefined)

    useNavigation.mockReturnValueOnce(navigation)
    useCamera.mockReturnValueOnce({ handleLibrarySnap })

    const { getByText } = setup()

    fireEvent.press(getByText('Gallery'))

    await sleep()

    expect(navigation.popToTop).toHaveBeenCalled()
    expect(navigation.navigate).toHaveBeenCalled()

    const calledWith = navigation.navigate.mock.calls[0]
    const { handleNext, actionType } = calledWith[1]

    expect(calledWith[0]).toBe('Verification')
    expect(actionType).toBe(VERIFICATION_TYPE.CONTINUE)

    handleNext()
    expect(handleLibrarySnap).toHaveBeenCalledWith(true)
  })

  it('redirect directly to create post from gallery screen', async () => {
    const navigation = { popToTop: jest.fn(), navigate: jest.fn() }
    const handleLibrarySnap = jest.fn()

    AsyncStorage.getItem.mockResolvedValueOnce('skip')

    useNavigation.mockReturnValueOnce(navigation)
    useCamera.mockReturnValueOnce({ handleLibrarySnap })

    const { getByText } = setup()

    fireEvent.press(getByText('Gallery'))

    await sleep()

    expect(navigation.popToTop).toHaveBeenCalled()
    expect(navigation.navigate).not.toHaveBeenCalled()
    expect(handleLibrarySnap).toHaveBeenCalledWith(true)
  })

  it('should close popup on close button tap', () => {
    const navigation = { popToTop: jest.fn() }

    useNavigation.mockReturnValueOnce(navigation)

    const { getByText } = setup()

    fireEvent.press(getByText('x close'))
    expect(navigation.popToTop).toHaveBeenCalled()
  })

  it('should close popup on outside click', () => {
    const navigation = { popToTop: jest.fn() }

    useNavigation.mockReturnValueOnce(navigation)

    const { getByTestId } = setup()

    fireEvent.press(getByTestId(testIDs.backdrop))
    expect(navigation.popToTop).toHaveBeenCalled()
  })

  it('should provide handleProcessedPhoto for useCamera hook', () => {
    const navigation = { navigate: jest.fn() }

    useNavigation.mockReturnValueOnce(navigation)

    setup()

    expect(useCamera).toHaveBeenCalled()

    const { handleProcessedPhoto } = useCamera.mock.calls[0][0]
    const payload = [{ preview: 'preview' }]

    handleProcessedPhoto(payload)
    expect(dispatch).toHaveBeenCalledWith(cameraActions.cameraCaptureRequest(payload))
    testNavigate(navigation, 'PostCreate', { photos: ['preview'], type: 'IMAGE' })
  })
})
