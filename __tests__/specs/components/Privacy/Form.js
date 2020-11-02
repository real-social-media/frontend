import React from 'react'
import { renderWithProviders, within, fireEvent } from 'tests/utils'
import PrivacyForm from 'components/Privacy/Form'
import testIDs from 'components/Privacy/test-ids'

const user = {
  privacyStatus: 'PUBLIC',
  followCountsHidden: false,
  likesDisabled: false,
  commentsDisabled: false,
  sharingDisabled: false,
}

const requiredProps = {
  togglePrivacyStatus: () => {},
  toggleFollowCountsHidden: () => {},
  toggleLikesDisabled: () => {},
  toggleCommentsDisabled: () => {},
  toggleSharingDisabled: () => {},
}

const setup = (user, props = {}) => renderWithProviders(<PrivacyForm {...requiredProps} user={user} {...props} />)

const getEls = ({ getByTestId }, testID) => {
  const $option = within(getByTestId(testID))
  const $switch = $option.getByA11yRole('switch')

  return { $option, $switch }
}

describe('PrivacyForm', () => {
  describe('Approve followers', () => {
    const testID = testIDs.form.privacyStatus

    it('title and desc', () => {
      const { $option } = getEls(setup(user), testID)

      expect($option.getByText('Private Account')).toBeTruthy()
      expect($option.getByText('Approve followers')).toBeTruthy()
    })

    it('enable', () => {
      const wrapper = setup({ ...user, privacyStatus: 'PRIVATE' })
      const { $switch } = getEls(wrapper, testID)

      expect($switch.props.value).toBe(true)
    })

    it('disable', () => {
      const wrapper = setup({ ...user, privacyStatus: 'PUBLIC' })
      const { $switch } = getEls(wrapper, testID)

      expect($switch.props.value).toBe(false)
    })

    it('callback on change', () => {
      const togglePrivacyStatus = jest.fn()
      const wrapper = setup(user, { togglePrivacyStatus })
      const { $switch } = getEls(wrapper, testID)

      fireEvent.press($switch)

      expect(togglePrivacyStatus).toHaveBeenCalled()
    })
  })

  describe('Followers can see your other followers', () => {
    const testID = testIDs.form.followCountsHidden

    it('title and desc', () => {
      const { $option } = getEls(setup(user), testID)

      expect($option.getByText('Total Followers')).toBeTruthy()
      expect($option.getByText('Followers can see your other followers')).toBeTruthy()
    })

    it('enable', () => {
      const wrapper = setup({ ...user, followCountsHidden: false })
      const { $switch } = getEls(wrapper, testID)

      expect($switch.props.value).toBe(true)
    })

    it('disable', () => {
      const wrapper = setup({ ...user, followCountsHidden: true })
      const { $switch } = getEls(wrapper, testID)

      expect($switch.props.value).toBe(false)
    })

    it('callback on change', () => {
      const toggleFollowCountsHidden = jest.fn()
      const wrapper = setup(user, { toggleFollowCountsHidden })
      const { $switch } = getEls(wrapper, testID)

      fireEvent.press($switch)

      expect(toggleFollowCountsHidden).toHaveBeenCalled()
    })
  })

  describe('Followers can like your posts', () => {
    const testID = testIDs.form.likesDisabled

    it('title and desc', () => {
      const { $option } = getEls(setup(user), testID)

      expect($option.getByText('Likes')).toBeTruthy()
      expect($option.getByText('Followers can like your posts')).toBeTruthy()
    })

    it('enable', () => {
      const wrapper = setup({ ...user, likesDisabled: false })
      const { $switch } = getEls(wrapper, testID)

      expect($switch.props.value).toBe(true)
    })

    it('disable', () => {
      const wrapper = setup({ ...user, likesDisabled: true })
      const { $switch } = getEls(wrapper, testID)

      expect($switch.props.value).toBe(false)
    })

    it('callback on change', () => {
      const toggleLikesDisabled = jest.fn()
      const wrapper = setup(user, { toggleLikesDisabled })
      const { $switch } = getEls(wrapper, testID)

      fireEvent.press($switch)

      expect(toggleLikesDisabled).toHaveBeenCalled()
    })
  })

  describe('Followers can comment on posts', () => {
    const testID = testIDs.form.commentsDisabled

    it('title and desc', () => {
      const { $option } = getEls(setup(user), testID)

      expect($option.getByText('Comments')).toBeTruthy()
      expect($option.getByText('Followers can comment on posts')).toBeTruthy()
    })

    it('enable', () => {
      const wrapper = setup({ ...user, commentsDisabled: false })
      const { $switch } = getEls(wrapper, testID)

      expect($switch.props.value).toBe(true)
    })

    it('disable', () => {
      const wrapper = setup({ ...user, commentsDisabled: true })
      const { $switch } = getEls(wrapper, testID)

      expect($switch.props.value).toBe(false)
    })

    it('callback on change', () => {
      const toggleCommentsDisabled = jest.fn()
      const wrapper = setup(user, { toggleCommentsDisabled })
      const { $switch } = getEls(wrapper, testID)

      fireEvent.press($switch)

      expect(toggleCommentsDisabled).toHaveBeenCalled()
    })
  })

  describe('Followers can share posts', () => {
    const testID = testIDs.form.sharingDisabled

    it('title and desc', () => {
      const { $option } = getEls(setup(user), testID)

      expect($option.getByText('Share')).toBeTruthy()
      expect($option.getByText('Followers can share posts')).toBeTruthy()
    })

    it('enable', () => {
      const wrapper = setup({ ...user, sharingDisabled: false })
      const { $switch } = getEls(wrapper, testID)

      expect($switch.props.value).toBe(true)
    })

    it('disable', () => {
      const wrapper = setup({ ...user, sharingDisabled: true })
      const { $switch } = getEls(wrapper, testID)

      expect($switch.props.value).toBe(false)
    })

    it('callback on change', () => {
      const toggleSharingDisabled = jest.fn()
      const wrapper = setup(user, { toggleSharingDisabled })
      const { $switch } = getEls(wrapper, testID)

      fireEvent.press($switch)

      expect(toggleSharingDisabled).toHaveBeenCalled()
    })
  })
})
