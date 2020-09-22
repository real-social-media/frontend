import React from 'react'
import { renderWithProviders, fireEvent } from 'tests/utils'
import Verification, { VERIFICATION_TYPE } from 'components/Verification'
import testIDs from 'components/Verification/test-ids'

const setup = (props) => renderWithProviders(<Verification {...props} />)

describe('Verification Screen', () => {
  it('should represent a header', () => {
    const { getByText } = setup()

    getByText('Post Verification Criteria')
    getByText('Add an Unmodified Profile Picture. Our AI detects photoshop and filters')
  })

  it('should represent verification rules', () => {
    const { getByText } = setup()

    getByText('No Cropping Outside REAL')
    getByText('You can crop it inside the REAL app')

    getByText('No Rotation Outside REAL')
    getByText('You can rotate it inside the REAL app')

    getByText('Origin Check')
    getByText('The Photo must have been taken on this phone')

    getByText('In-app Camera')
    getByText('Photos taken using the camera inside the REAL app will always pass verification')

    getByText('Device must be an iPhone7 or newer')
    getByText('Photo must have been taken using the iOS camera app')

    getByText(
      'Unverified posts can’t be trending/discovered, used as profile pictures, or used in dating. They can only be seen by your followers',
    )
  })

  it('should close popup on backdrop tab', () => {
    const handleClose = jest.fn()
    const { getByTestId } = setup({ handleClose })

    expect(handleClose).not.toHaveBeenCalled()

    fireEvent.press(getByTestId(testIDs.backdrop))
    expect(handleClose).toHaveBeenCalled()
  })

  describe('actionType: BACK', () => {
    const actionType = VERIFICATION_TYPE.BACK
    const handleBackAction = jest.fn()
    const props = { actionType, handleBackAction }

    beforeEach(() => handleBackAction.mockReset())

    it('should render only Go Back button', () => {
      const { getByText, queryAllByRole } = setup(props)

      expect(getByText('Go Back')).toBeTruthy()
      expect(queryAllByRole('button')).toHaveLength(1)
    })

    it('the button should have callback on tap', () => {
      const { getByText } = setup(props)

      expect(handleBackAction).not.toHaveBeenCalled()

      fireEvent.press(getByText('Go Back'))
      expect(handleBackAction).toHaveBeenCalled()
    })
  })

  describe('actionType: HIDE', () => {
    const actionType = VERIFICATION_TYPE.HIDE
    const handleBackAction = jest.fn()
    const handleHideAction = jest.fn()
    const props = { actionType, handleBackAction, handleHideAction }

    beforeEach(() => {
      handleBackAction.mockReset()
      handleHideAction.mockReset()
    })

    it('should render action buttons', () => {
      const { getByText, queryAllByRole } = setup(props)

      expect(getByText('Go Back')).toBeTruthy()
      expect(getByText('Hide and Proceed')).toBeTruthy()
      expect(queryAllByRole('button')).toHaveLength(2)
    })

    it('Go Back button should have callback on tap', () => {
      const { getByText } = setup(props)

      expect(handleBackAction).not.toHaveBeenCalled()

      fireEvent.press(getByText('Go Back'))
      expect(handleBackAction).toHaveBeenCalled()
    })

    it('Hide and Proceed button should have callback on tap', () => {
      const { getByText } = setup(props)

      expect(handleHideAction).not.toHaveBeenCalled()

      fireEvent.press(getByText('Hide and Proceed'))
      expect(handleHideAction).toHaveBeenCalled()
    })
  })

  describe('actionType: HOME', () => {
    const actionType = VERIFICATION_TYPE.HOME
    const handleBackAction = jest.fn()
    const props = { actionType, handleBackAction }

    beforeEach(() => handleBackAction.mockReset())

    it('should render only hide button', () => {
      const { getByText, queryAllByRole } = setup(props)

      expect(getByText('Hide and Proceed')).toBeTruthy()
      expect(queryAllByRole('button')).toHaveLength(1)
    })

    it('Hide and Proceed button should have callback on tap', () => {
      const { getByText } = setup(props)

      expect(handleBackAction).not.toHaveBeenCalled()

      fireEvent.press(getByText('Hide and Proceed'))
      expect(handleBackAction).toHaveBeenCalled()
    })
  })

  describe('actionType: CONTINUE', () => {
    const actionType = VERIFICATION_TYPE.CONTINUE
    const handleContinueAction = jest.fn()
    const props = { actionType, handleContinueAction }

    beforeEach(() => handleContinueAction.mockReset())

    it('should render only continue button', () => {
      const { getByText, queryAllByRole } = setup(props)

      expect(getByText('Continue')).toBeTruthy()
      expect(queryAllByRole('button')).toHaveLength(1)
    })

    it('Continue button should have callback on tap', () => {
      const { getByText } = setup(props)

      expect(handleContinueAction).not.toHaveBeenCalled()

      fireEvent.press(getByText('Continue'))
      expect(handleContinueAction).toHaveBeenCalled()
    })
  })
})
