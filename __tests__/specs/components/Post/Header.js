import React from 'react'
import { renderWithProviders } from 'tests/utils'
import RNActionSheet from 'react-native-actionsheet'
import HeaderComponent from 'components/Post/Header'
import testIDs from 'components/Post/test-ids'

jest.mock('templates/Avatar', () => () => null)
jest.mock('react-native-actionsheet', () => jest.fn().mockReturnValue(null))

const postId = 1
const postedBy = { userId: 1 }
const post = { postId, postedBy }
const handlePostShare = jest.fn()
const postsFlagRequest = jest.fn()
const postsArchiveRequest = jest.fn()
const postsDeleteRequest = jest.fn()
const postsRestoreArchivedRequest = jest.fn()
const navigation = { navigate: jest.fn() }
const requiredProps = {
  post,
  handlePostShare,
  postsFlagRequest,
  postsArchiveRequest,
  postsDeleteRequest,
  postsRestoreArchivedRequest,
  navigation,
}

const setup = (props) => renderWithProviders(<HeaderComponent {...requiredProps} {...props} />)

describe('Post Header component', () => {
  describe('Dropdown menu', () => {
    afterEach(() => {
      RNActionSheet.mockClear()
      handlePostShare.mockClear()
      postsFlagRequest.mockClear()
      postsArchiveRequest.mockClear()
      postsDeleteRequest.mockClear()
      postsRestoreArchivedRequest.mockClear()
      navigation.navigate.mockClear()
    })

    it('user is not an owner of a post', () => {
      const user = { userId: 2 }
      const { getByTestId } = setup({ handlePostShare, postsFlagRequest, user })

      expect(getByTestId(testIDs.header.openDropDownMenu)).toBeTruthy()

      expect(RNActionSheet).toHaveBeenCalled()
      const { options, cancelButtonIndex, onPress } = RNActionSheet.mock.calls[0][0]

      expect(options).toEqual(['Share', 'Report', 'Cancel'])
      expect(cancelButtonIndex).toBe(2)

      onPress(0)
      expect(handlePostShare).toHaveBeenCalled()

      onPress(1)
      expect(postsFlagRequest).toHaveBeenCalledWith({ postId })
    })

    it('user is an owner of a post', () => {
      const user = { userId: post.postedBy.userId }
      const { getByTestId } = setup({ handlePostShare, postsFlagRequest, user })

      expect(getByTestId(testIDs.header.openDropDownMenu)).toBeTruthy()

      expect(RNActionSheet).toHaveBeenCalled()
      const { options, cancelButtonIndex, destructiveButtonIndex, onPress } = RNActionSheet.mock.calls[0][0]

      expect(options).toEqual(['Share', 'Edit', 'Archive', 'Delete', 'Cancel'])
      expect(cancelButtonIndex).toBe(4)
      expect(destructiveButtonIndex).toBe(3)

      onPress(0)
      expect(handlePostShare).toHaveBeenCalled()

      onPress(1)
      expect(navigation.navigate).toHaveBeenCalledWith('PostEdit', { post })

      onPress(2)
      expect(postsArchiveRequest).toHaveBeenCalledWith({
        postId: post.postId,
        userId: post.postedBy.userId,
      })

      onPress(3)
      expect(postsDeleteRequest).toHaveBeenCalledWith({
        postId: post.postId,
        userId: post.postedBy.userId,
      })
    })

    it('user is an owner of a post and post archived', () => {
      const user = { userId: post.postedBy.userId }
      const archived = { ...post, postStatus: 'ARCHIVED' }
      const { getByTestId } = setup({ handlePostShare, postsFlagRequest, user, post: archived })

      expect(getByTestId(testIDs.header.openDropDownMenu)).toBeTruthy()

      expect(RNActionSheet).toHaveBeenCalled()
      const { options, cancelButtonIndex, onPress } = RNActionSheet.mock.calls[0][0]

      expect(options).toEqual(['Restore from Archived', 'Cancel'])
      expect(cancelButtonIndex).toBe(1)

      onPress(0)
      expect(postsRestoreArchivedRequest).toHaveBeenCalledWith({ postId: archived.postId })
    })
  })
})
