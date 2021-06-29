import React from 'react'
import { render, fireEvent } from 'tests/utils'
import UserRowAction from 'templates/UserRowAction'

const onFollowPress = jest.fn()
const onReplyPress = jest.fn()
const onRequestedPress = jest.fn()
const onUnfollowPress = jest.fn()
const onDeclinePress = jest.fn()

const requiredProps = { onFollowPress, onReplyPress, onRequestedPress, onUnfollowPress, onDeclinePress }
const setup = (props) => render(<UserRowAction {...requiredProps} {...props} />)

describe('UserRowAction', () => {
  afterEach(() => {
    onFollowPress.mockClear()
    onReplyPress.mockClear()
    onRequestedPress.mockClear()
    onUnfollowPress.mockClear()
    onDeclinePress.mockClear()
  })

  describe('Follow', () => {
    const props = { followActive: true }

    it('button exists', () => {
      const { queryByText } = setup(props)

      expect(queryByText('Follow')).toBeTruthy()
      expect(queryByText('Unfollow')).toBeFalsy()
      expect(queryByText('Pending')).toBeFalsy()
      expect(queryByText('Accept')).toBeFalsy()
      expect(queryByText('Decline')).toBeFalsy()
    })

    it('callback on press', () => {
      const { queryByText } = setup(props)

      expect(onFollowPress).not.toHaveBeenCalled()
      fireEvent.press(queryByText('Follow'))

      expect(onFollowPress).toHaveBeenCalled()
    })

    it('disabled on loading state', () => {
      const { queryByText } = setup({ ...props, followLoading: true })
      const $button = queryByText('Follow')

      expect($button).toBeDisabled()
    })
  })

  describe('Unfollow', () => {
    const props = { unfollowActive: true }

    it('button exists', () => {
      const { queryByText } = setup(props)

      expect(queryByText('Follow')).toBeFalsy()
      expect(queryByText('Unfollow')).toBeTruthy()
      expect(queryByText('Pending')).toBeFalsy()
      expect(queryByText('Accept')).toBeFalsy()
      expect(queryByText('Decline')).toBeFalsy()
    })

    it('callback on press', () => {
      const { queryByText } = setup(props)

      expect(onUnfollowPress).not.toHaveBeenCalled()
      fireEvent.press(queryByText('Unfollow'))

      expect(onUnfollowPress).toHaveBeenCalled()
    })

    it('disabled on loading state', () => {
      const { queryByText } = setup({ ...props, unfollowLoading: true })
      const $button = queryByText('Unfollow')

      expect($button).toBeDisabled()
    })
  })

  describe('Pending', () => {
    const props = { requestActive: true }

    it('button exists', () => {
      const { queryByText } = setup(props)

      expect(queryByText('Follow')).toBeFalsy()
      expect(queryByText('Unfollow')).toBeFalsy()
      expect(queryByText('Pending')).toBeTruthy()
      expect(queryByText('Accept')).toBeFalsy()
      expect(queryByText('Decline')).toBeFalsy()
    })

    it('callback on press', () => {
      const { queryByText } = setup(props)

      expect(onRequestedPress).not.toHaveBeenCalled()
      fireEvent.press(queryByText('Pending'))

      expect(onRequestedPress).toHaveBeenCalled()
    })

    it('disabled on loading state', () => {
      const { queryByText } = setup({ ...props, requestLoading: true })
      const $button = queryByText('Pending')

      expect($button).toBeDisabled()
    })
  })

  describe('Follower request', () => {
    const props = { replyActive: true }

    it('buttons exists', () => {
      const { queryByText } = setup(props)

      expect(queryByText('Follow')).toBeFalsy()
      expect(queryByText('Unfollow')).toBeFalsy()
      expect(queryByText('Pending')).toBeFalsy()
      expect(queryByText('Accept')).toBeTruthy()
      expect(queryByText('Decline')).toBeTruthy()
    })

    describe('Accept', () => {
      it('callback on press', () => {
        const { queryByText } = setup(props)

        expect(onReplyPress).not.toHaveBeenCalled()
        fireEvent.press(queryByText('Accept'))

        expect(onReplyPress).toHaveBeenCalled()
      })

      it('disabled on loading state', () => {
        const { queryByText } = setup({ ...props, replyLoading: true })

        expect(queryByText('Accept')).toBeDisabled()
        expect(queryByText('Decline')).toBeDisabled()
      })
    })

    describe('Decline', () => {
      it('callback on press', () => {
        const { queryByText } = setup(props)

        expect(onDeclinePress).not.toHaveBeenCalled()
        fireEvent.press(queryByText('Decline'))

        expect(onDeclinePress).toHaveBeenCalled()
      })

      it('disabled on loading state', () => {
        const { queryByText } = setup({ ...props, declineLoading: true })

        expect(queryByText('Accept')).toBeDisabled()
        expect(queryByText('Decline')).toBeDisabled()
      })
    })
  })
})
