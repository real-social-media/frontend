import React from 'react'
import PostCreateForm from 'components/PostCreate/Form'
import { useNavigation } from '@react-navigation/native'
import { renderWithProviders, fireEvent } from 'tests/utils'
import { testField } from 'tests/utils/helpers'
import * as Validation from 'services/Validation'

jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn() }))

const navigation = { navigate: jest.fn(), setOptions: jest.fn() }
useNavigation.mockReturnValue(navigation)

/**
 * Mock Functions
 */
const handleSubmit = jest.fn()
const formLifetime = () => null
const formAlbums = () => null

/**
 * Mock Data
 */
const user = {
  likesDisabled: false,
  commentsDisabled: false,
  sharingDisabled: false,
  verificationHidden: false,
}

const cameraCapture = {
  text: 'text',
  preview: 'preview',
  uri: 'uri',
  takenInReal: 'takenInReal',
  imageFormat: 'imageFormat',
  originalFormat: 'originalFormat',
  originalMetadata: 'originalMetadata',
  crop: 'crop',
}

const requiredProps = { handleSubmit, user, cameraCapture, formLifetime, formAlbums }

const setup = () => renderWithProviders(<PostCreateForm {...requiredProps} />)

describe('PostCreate Form', () => {
  it('payment field', () => {
    const { getByLabelText, queryByAccessibilityLabel } = setup()

    fireEvent.press(queryByAccessibilityLabel('Toggle Payment per view'))

    testField(getByLabelText('payment'), {
      name: 'payment',
      value: undefined,
      ...Validation.getInputTypeProps('payment'),
    })
  })
})
