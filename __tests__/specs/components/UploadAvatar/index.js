import React from 'react'
import { renderWithProviders } from 'tests/utils'
import ActionSheet from 'components/ActionSheet'
import UploadAvatar from 'components/UploadAvatar/component'
import { prop } from 'ramda'
import { confirm } from 'components/Alert'

jest.mock('components/ActionSheet', () => jest.fn().mockReturnValue(null))
jest.mock('components/Alert', () => ({ confirm: jest.fn() }))

const navigation = { navigate: jest.fn() }
const setup = (props) => renderWithProviders(<UploadAvatar navigation={navigation} {...props} />)

describe('UploadAvatar component', () => {
  afterEach(() => {
    ActionSheet.mockClear()
    confirm.mockClear()
    navigation.navigate.mockClear()
  })

  it('menu options', () => {
    setup()

    expect(ActionSheet).toHaveBeenCalled()
    const { options } = ActionSheet.mock.calls[0][0]

    expect(options.map(prop('name'))).toEqual([
      'Take a Photo',
      'Choose From Gallery',
      'Choose From Existing',
      'Delete Profile Picture',
      'Cancel',
    ])
  })

  it('Take a Photo', () => {
    const handleCameraSnap = jest.fn()
    setup({ handleCameraSnap })

    const { options } = ActionSheet.mock.calls[0][0]
    const { name, onPress } = options[0]

    expect(name).toBe('Take a Photo')

    onPress()
    expect(confirm).toHaveBeenCalled()

    const { onConfirm, ...props } = confirm.mock.calls[0][0]
    expect(props).toEqual({
      desc: 'Your photo will be uploaded as post',
      title: 'Profile Picture Upload',
    })

    onConfirm()
    expect(handleCameraSnap).toHaveBeenCalled()
  })

  it('Choose From Gallery', () => {
    const handleLibrarySnap = jest.fn()
    setup({ handleLibrarySnap })

    const { options } = ActionSheet.mock.calls[0][0]
    const { name, onPress } = options[1]

    expect(name).toBe('Choose From Gallery')

    onPress()
    expect(confirm).toHaveBeenCalled()

    const { onConfirm, ...props } = confirm.mock.calls[0][0]
    expect(props).toEqual({
      desc: 'Your photo will be uploaded as post',
      title: 'Profile Picture Upload',
    })

    onConfirm()
    expect(handleLibrarySnap).toHaveBeenCalled()
  })

  it('Choose From Existing', () => {
    const navigateProfilePhotoGrid = jest.fn()
    setup({ navigateProfilePhotoGrid })

    const { options } = ActionSheet.mock.calls[0][0]
    const { name, onPress } = options[2]

    expect(name).toBe('Choose From Existing')

    onPress()
    expect(navigateProfilePhotoGrid).toHaveBeenCalled()
  })

  it('Delete Profile Picture should not be visible when avatar empty', () => {
    setup({ isAvatarEmpty: true })

    const { options } = ActionSheet.mock.calls[0][0]
    const { name, isVisible } = options[3]

    expect(name).toBe('Delete Profile Picture')
    expect(isVisible).toBeFalsy()
  })

  it('Delete Profile Picture', () => {
    const usersDeleteAvatarRequest = jest.fn()
    setup({ usersDeleteAvatarRequest, isAvatarEmpty: false })

    const { options } = ActionSheet.mock.calls[0][0]
    const { name, onPress, isVisible, isDestructive } = options[3]

    expect(name).toBe('Delete Profile Picture')
    expect(isVisible).toBeTruthy()
    expect(isDestructive).toBeTruthy()

    onPress()
    expect(confirm).toHaveBeenCalled()

    const { onConfirm, ...props } = confirm.mock.calls[0][0]
    expect(props).toEqual({
      desc: 'Are you sure you want to delete the profile photo?',
      title: 'Delete Profile Picture',
    })

    onConfirm()
    expect(usersDeleteAvatarRequest).toHaveBeenCalled()
  })

  it('Cancel', () => {
    setup()

    const { options } = ActionSheet.mock.calls[0][0]
    const { name, isCancel } = options[4]

    expect(name).toBe('Cancel')
    expect(isCancel).toBeTruthy()
  })
})
