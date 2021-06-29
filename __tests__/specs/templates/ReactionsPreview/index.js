import React from 'react'
import { renderWithProviders } from 'tests/utils'
import PrivacyService from 'services/Privacy'
import ReactionsPreviewTemplate from 'templates/ReactionsPreview'
import testIDs from 'templates/ReactionsPreview/test-ids'

jest.mock('templates/Avatar', () => () => null)
jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn() }))
jest.mock('services/Privacy', () => ({
  postLikedVisibility: jest.fn().mockReturnValue(true),
}))

const user = { userId: '2' }
const postedBy = { userId: '1' }
const post = { postId: 1, postedBy, originalPost: { postedBy }, expiresAt: '2020-09-10T05:26:58.746Z' }
const requiredProps = { post, user }

const setup = (props) => renderWithProviders(<ReactionsPreviewTemplate {...requiredProps} {...props} />)

describe('Reactions Preview Template', () => {
  afterEach(() => {
    PrivacyService.postLikedVisibility.mockClear()
  })

  it('visibility service with called with right params', () => {
    setup()

    expect(PrivacyService.postLikedVisibility).toHaveBeenCalledWith(post, user)
  })

  it('visible', () => {
    const { queryByTestId } = setup()

    expect(queryByTestId(testIDs.root)).toBeTruthy()
  })

  it('hidden', () => {
    PrivacyService.postLikedVisibility.mockReturnValueOnce(false)
    const { queryByTestId } = setup()

    expect(queryByTestId(testIDs.root)).toBeFalsy()
  })
})
