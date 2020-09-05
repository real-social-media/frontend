import React from 'react'
import { renderWithProviders } from 'tests/utils'
import AlbumCreateForm from 'components/AlbumCreate/Form'

const albumsCreateRequest = jest.fn()
const setup = (props) => renderWithProviders(<AlbumCreateForm albumsCreateRequest={albumsCreateRequest} {...props} />)

describe('AlbumCreateForm', () => {
  beforeEach(() => albumsCreateRequest.mockReset())

  it('submit button should be enabled by default', () => {
    const { getByText } = setup()
    const submitBtn = getByText('Create Album')

    expect(submitBtn).toBeEnabled()
  })

  it('disable submit button on submitting state', () => {
    const { getByText } = setup({ isSubmitting: true })
    const submitBtn = getByText('Create Album')

    expect(submitBtn).toBeDisabled()
  })
})
