import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { renderWithStore, fireEvent } from 'tests/utils'
import * as usersActions from 'store/ducks/users/actions'
import UsersList from 'components/UsersList'

const userId = 1
jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn() }))
const navigation = { navigate: jest.fn() }
useNavigation.mockReturnValue(navigation)

jest.mock('templates/Avatar', () => jest.fn().mockReturnValue(null))

const setup = (props) => renderWithStore(<UsersList {...props} />)

describe('UsersList', () => {
  it('empty', () => {
    const { queryAllByAccessibilityLabel } = setup()

    expect(queryAllByAccessibilityLabel('User Row')).toHaveLength(0)
  })

  describe('Follow', () => {
    const user = { userId, followedStatus: 'NOT_FOLLOWING' }
    const props = { usersSearch: { data: [user] } }

    it('row exists', () => {
      const { queryByText, queryAllByAccessibilityLabel } = setup(props)

      expect(queryAllByAccessibilityLabel('User Row')).toHaveLength(1)
      expect(queryByText('Follow')).toBeTruthy()
    })

    it('callback on press', () => {
      const usersFollowRequest = jest.spyOn(usersActions, 'usersFollowRequest').mockReturnValue({ type: 'MOCK' })
      const { queryByText } = setup(props)

      fireEvent.press(queryByText('Follow'))
      expect(usersFollowRequest).toHaveBeenCalledWith({ userId })

      usersFollowRequest.mockRestore()
    })

    it('disabled on loading state', () => {
      const { queryByText } = setup(props)

      fireEvent.press(queryByText('Follow'))

      expect(queryByText('Follow')).toBeDisabled()
    })
  })

  describe('Unfollow', () => {
    const user = { userId, followedStatus: 'FOLLOWING' }
    const props = { usersSearch: { data: [user] } }

    it('row exists', () => {
      const { queryByText, queryAllByAccessibilityLabel } = setup(props)

      expect(queryAllByAccessibilityLabel('User Row')).toHaveLength(1)
      expect(queryByText('Unfollow')).toBeTruthy()
    })

    it('callback on press', () => {
      const usersUnfollowRequest = jest.spyOn(usersActions, 'usersUnfollowRequest').mockReturnValue({ type: 'MOCK' })
      const { queryByText } = setup(props)

      fireEvent.press(queryByText('Unfollow'))
      expect(usersUnfollowRequest).toHaveBeenCalledWith({ userId })

      usersUnfollowRequest.mockRestore()
    })

    it('disabled on loading state', () => {
      const { queryByText } = setup(props)

      fireEvent.press(queryByText('Unfollow'))

      expect(queryByText('Unfollow')).toBeDisabled()
    })
  })

  describe('Pending', () => {
    const user = { userId, followedStatus: 'REQUESTED' }
    const props = { usersSearch: { data: [user] } }

    it('row exists', () => {
      const { queryByText, queryAllByAccessibilityLabel } = setup(props)

      expect(queryAllByAccessibilityLabel('User Row')).toHaveLength(1)
      expect(queryByText('Pending')).toBeTruthy()
    })

    it('callback on press', () => {
      const usersUnfollowRequest = jest.spyOn(usersActions, 'usersUnfollowRequest').mockReturnValue({ type: 'MOCK' })
      const { queryByText } = setup(props)

      fireEvent.press(queryByText('Pending'))
      expect(usersUnfollowRequest).toHaveBeenCalledWith({ userId })

      usersUnfollowRequest.mockRestore()
    })

    it('disabled on loading state', () => {
      const { queryByText } = setup(props)

      fireEvent.press(queryByText('Pending'))

      expect(queryByText('Pending')).toBeDisabled()
    })
  })

  describe('Follower request', () => {
    const user = { userId, followerStatus: 'REQUESTED', followedStatus: 'NOT_FOLLOWING' }
    const props = { usersSearch: { data: [user] } }

    describe('Accept', () => {
      it('row exists', () => {
        const { queryByText, queryAllByAccessibilityLabel } = setup(props)

        expect(queryAllByAccessibilityLabel('User Row')).toHaveLength(1)
        expect(queryByText('Accept')).toBeTruthy()
      })

      it('callback on press', () => {
        const usersAcceptFollowerUserRequest = jest.spyOn(usersActions, 'usersAcceptFollowerUserRequest').mockReturnValue({ type: 'MOCK' })
        const { queryByText } = setup(props)

        fireEvent.press(queryByText('Accept'))
        expect(usersAcceptFollowerUserRequest).toHaveBeenCalledWith({ userId })

        usersAcceptFollowerUserRequest.mockRestore()
      })

      it('disabled on loading state', () => {
        const { queryByText } = setup(props)

        fireEvent.press(queryByText('Accept'))

        expect(queryByText('Accept')).toBeDisabled()
      })
    })

    describe('Decline', () => {
      it('row exists', () => {
        const { queryByText, queryAllByAccessibilityLabel } = setup(props)

        expect(queryAllByAccessibilityLabel('User Row')).toHaveLength(1)
        expect(queryByText('Decline')).toBeTruthy()
      })

      it('callback on press', () => {
        const usersDeclineFollowerUserRequest = jest.spyOn(usersActions, 'usersDeclineFollowerUserRequest').mockReturnValue({ type: 'MOCK' })
        const { queryByText } = setup(props)

        fireEvent.press(queryByText('Decline'))
        expect(usersDeclineFollowerUserRequest).toHaveBeenCalledWith({ userId })

        usersDeclineFollowerUserRequest.mockRestore()
      })

      it('disabled on loading state', () => {
        const { queryByText } = setup(props)

        fireEvent.press(queryByText('Decline'))

        expect(queryByText('Decline')).toBeDisabled()
      })
    })
  })
})
