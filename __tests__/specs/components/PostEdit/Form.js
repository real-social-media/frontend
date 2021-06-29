import React from 'react'
import PostEditForm from 'components/PostEdit/Form'
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
const postsEdit = {
  status: 'success',
}

const postsSingleGet = {
  data: {
    payment: 1.1,
    text: 'text',
    preview: 'preview',
    uri: 'uri',
    takenInReal: 'takenInReal',
    imageFormat: 'imageFormat',
    originalFormat: 'originalFormat',
    originalMetadata: 'originalMetadata',
    crop: 'crop',
  },
}

const requiredProps = { handleSubmit, postsSingleGet, postsEdit, formLifetime, formAlbums }

const setup = () => renderWithProviders(<PostEditForm {...requiredProps} />)

describe('PostEdit Form', () => {
  it('payment field', () => {
    const { getByLabelText, queryByAccessibilityLabel } = setup()

    fireEvent.press(queryByAccessibilityLabel('Toggle Payment per view'))

    testField(getByLabelText('payment'), {
      name: 'payment',
      value: String(postsSingleGet.data.payment),
      ...Validation.getInputTypeProps('payment'),
    })
  })
})
