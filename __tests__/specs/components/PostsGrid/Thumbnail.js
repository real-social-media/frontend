import React from 'react'
import { render } from 'tests/utils'
import PostsGridThumbnailComponent from 'components/PostsGrid/Thumbnail'
import testIDs from 'components/PostsGrid/test-ids'

jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn() }))

const post = { postId: 1 }
const requiredProps = { post }
const setup = (props) => render(<PostsGridThumbnailComponent {...requiredProps} {...props} />)

describe('PostsGrid Thumbnail', () => {
  it('toggle unread comments bell when commentsUnviewedCount changed', () => {
    const { queryByTestId, update } = setup({ post: { ...post, commentsUnviewedCount: 1 } })
    expect(queryByTestId(testIDs.thumbnail.activeIcon)).toBeTruthy()

    update(<PostsGridThumbnailComponent {...requiredProps} post={{ ...post, commentsUnviewedCount: 0 }} />)
    expect(queryByTestId(testIDs.thumbnail.activeIcon)).toBeFalsy()
  })
})
