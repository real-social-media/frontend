import React from 'react'
import { renderWithProviders } from 'tests/utils'
import ActionSheet from 'components/ActionSheet'
import SettingsComponent from 'components/Settings'
import { prop } from 'ramda'
import { isAvatarEmpty, confirm } from 'components/Settings/helpers'

jest.mock('components/ActionSheet', () => jest.fn().mockReturnValue(null))
jest.mock('components/Settings/helpers', () => ({ isAvatarEmpty: jest.fn(), confirm: jest.fn() }))
jest.mock('templates/Avatar', () => () => null)
jest.mock('templates/SettingsAvatar', () => () => null)

const navigation = { navigate: jest.fn() }
const setup = (props) => renderWithProviders(<SettingsComponent navigation={navigation} {...props} />)

describe('Settings component', () => {
  describe('Profile photo actions menu', () => {
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
        'Delete Profile Photo',
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
        title: 'Profile Photo Upload',
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
        title: 'Profile Photo Upload',
      })

      onConfirm()
      expect(handleLibrarySnap).toHaveBeenCalled()
    })

    it('Choose From Existing', () => {
      setup()

      const { options } = ActionSheet.mock.calls[0][0]
      const { name, onPress } = options[2]

      expect(name).toBe('Choose From Existing')

      onPress()
      expect(navigation.navigate).toHaveBeenCalledWith('ProfilePhotoGrid')
    })

    it('Delete Profile Photo should not be visible when avatar empty', () => {
      isAvatarEmpty.mockReturnValueOnce(true)
      setup()

      const { options } = ActionSheet.mock.calls[0][0]
      const { name, isVisible } = options[3]

      expect(name).toBe('Delete Profile Photo')
      expect(isVisible).toBeFalsy()
    })

    it('Delete Profile Photo', () => {
      isAvatarEmpty.mockReturnValueOnce(false)
      const usersDeleteAvatarRequest = jest.fn()
      setup({ usersDeleteAvatarRequest })

      const { options } = ActionSheet.mock.calls[0][0]
      const { name, onPress, isVisible, isDestructive } = options[3]

      expect(name).toBe('Delete Profile Photo')
      expect(isVisible).toBeTruthy()
      expect(isDestructive).toBeTruthy()

      onPress()
      expect(confirm).toHaveBeenCalled()

      const { onConfirm, ...props } = confirm.mock.calls[0][0]
      expect(props).toEqual({
        desc: 'Are you sure you want to delete the profile photo?',
        title: 'Delete Profile Photo',
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
})
