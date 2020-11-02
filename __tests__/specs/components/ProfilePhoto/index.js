import React from 'react'
import { renderWithProviders, fireEvent } from 'tests/utils'
import ProfilePhoto from 'components/ProfilePhoto'
import PhotoComponent from 'components/ProfilePhotoUpload/Photo'
import { confirm } from 'components/Alert'

jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn() }))
jest.mock('components/ProfilePhotoUpload/Photo', () => jest.fn().mockReturnValue(null))
jest.mock('components/Alert', () => ({ confirm: jest.fn() }))

const handleLibrarySnap = jest.fn()
const handleCameraSnap = jest.fn()
const handleSkipUpload = jest.fn()

const requiredProps = {
  handleLibrarySnap,
  handleCameraSnap,
  handleSkipUpload,
}

const setup = () => renderWithProviders(<ProfilePhoto {...requiredProps} />)

describe('Profile Picture screen', () => {
  afterEach(() => {
    handleLibrarySnap.mockClear()
    handleCameraSnap.mockClear()
    handleSkipUpload.mockClear()
    confirm.mockClear()
  })

  it('represent header', () => {
    const { getByText } = setup()

    getByText('Add an Unmodified Profile Picture')
    getByText('Our AI detects photoshop & filters')

    expect(PhotoComponent).toHaveBeenCalled()
  })

  it('Skip Photo Upload', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Skip Photo Upload'))
    expect(handleSkipUpload).toHaveBeenCalled()
  })

  it('Take a Photo', () => {
    const { getByText  } = setup()

    fireEvent.press(getByText('Take a Photo'))
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
    const { getByText } = setup()

    fireEvent.press(getByText('Choose From Gallery'))
    expect(confirm).toHaveBeenCalled()

    const { onConfirm, ...props } = confirm.mock.calls[0][0]
    expect(props).toEqual({
      desc: 'Your photo will be uploaded as post',
      title: 'Profile Picture Upload',
    })

    onConfirm()
    expect(handleLibrarySnap).toHaveBeenCalled()
  })
})
