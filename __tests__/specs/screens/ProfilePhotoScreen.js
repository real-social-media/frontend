import React from 'react'
import { useDispatch } from 'react-redux'
import { renderWithProviders, fireEvent } from 'tests/utils'
import ProfilePhotoScreen from 'screens/ProfilePhotoScreen'
import * as cameraActions from 'store/ducks/camera/actions'
import { confirm } from 'components/Settings/helpers'
import useCamera from 'services/providers/Camera'
import { useNavigation } from '@react-navigation/native'

jest.mock('components/ProfilePhotoUpload/Photo', () => jest.fn().mockReturnValue(null))
jest.mock('react-redux', () => ({ useDispatch: jest.fn() }))
jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn() }))
jest.mock('services/providers/Camera', () => jest.fn())
jest.mock('components/Settings/helpers', () => ({ confirm: jest.fn() }))

const navigation = { replace: jest.fn(), navigate: jest.fn() }
const dispatch = jest.fn()
const handleLibrarySnap = jest.fn()

useCamera.mockReturnValue({ handleLibrarySnap })
useNavigation.mockReturnValue(navigation)
useDispatch.mockReturnValue(dispatch)

const setup = () => renderWithProviders(<ProfilePhotoScreen />)

describe('Profile Photo screen', () => {
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
    expect(navigation.replace).toBeCalledWith('Settings')
  })

  it('Take a Photo', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Take a Photo'))
    expect(confirm).toHaveBeenCalled()

    confirm.mock.calls[0][0].onConfirm()
    expect(navigation.navigate).toBeCalledWith('Camera', { nextRoute: 'ProfilePhotoUpload' })
  })

  it('Choose From Gallery', () => {
    const payload = [{ preview: 'preview' }]
    const { getByText } = setup()

    expect(useCamera).toBeCalled()
    useCamera.mock.calls[0][0].handleProcessedPhoto(payload)
    expect(dispatch).toBeCalledWith(cameraActions.cameraCaptureRequest(payload))
    expect(navigation.navigate).toBeCalledWith('ProfilePhotoUpload', { type: 'IMAGE', photos: [payload[0].preview] })

    expect()

    fireEvent.press(getByText('Choose From Gallery'))
    expect(confirm).toHaveBeenCalled()

    confirm.mock.calls[0][0].onConfirm()
    expect(handleLibrarySnap).toBeCalledWith(false)
  })
})
