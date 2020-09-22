import React from 'react'
import { renderWithProviders, within } from 'tests/utils'
import PrivacyService from 'services/Privacy'
import CountsComponent from 'components/Profile/Counts'
import testIDs from 'components/Profile/test-ids'

jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn() }))

const setup = (props) => renderWithProviders(<CountsComponent {...props} />)

const usersGetProfile = {
  data: {
    followersCount: 100,
    followedsCount: 110,
    postCount: 120,
  },
}

describe('Post Counts component', () => {
  describe('postCount', () => {
    it('visible', () => {
      const { getByTestId } = setup({ usersGetProfile })
      const $postCount = within(getByTestId(testIDs.counts.postCount))

      expect($postCount).toBeTruthy()
      expect($postCount.getByText(`${usersGetProfile.data.postCount}`)).toBeTruthy()
      expect($postCount.getByText('Posts')).toBeTruthy()
    })
  })

  describe('followersCount', () => {
    let userFollowerVisibility = jest.spyOn(PrivacyService, 'userFollowerVisibility')

    afterEach(() => userFollowerVisibility.mockClear())

    it('should called service with user data', () => {
      setup({ usersGetProfile })

      expect(userFollowerVisibility).toHaveBeenCalledWith(usersGetProfile.data)
    })

    it('hidden', () => {
      userFollowerVisibility.mockReturnValueOnce(false)

      const { getByTestId } = setup({ usersGetProfile })
      const $followers = within(getByTestId(testIDs.counts.followers))

      expect($followers.getByText('•')).toBeTruthy()
      expect($followers.getByText('Followers')).toBeTruthy()
    })

    it('visible', () => {
      userFollowerVisibility.mockReturnValueOnce(true)

      const { getByTestId } = setup({ usersGetProfile })
      const $followers = within(getByTestId(testIDs.counts.followers))

      expect($followers).toBeTruthy()
      expect($followers.getByText(`${usersGetProfile.data.followersCount}`)).toBeTruthy()
      expect($followers.getByText('Followers')).toBeTruthy()
    })
  })

  describe('followedsCount', () => {
    let userFollowingVisibility = jest.spyOn(PrivacyService, 'userFollowingVisibility')

    afterEach(() => userFollowingVisibility.mockClear())

    it('should called service with user data', () => {
      setup({ usersGetProfile })

      expect(userFollowingVisibility).toHaveBeenCalledWith(usersGetProfile.data)
    })

    it('hidden', () => {
      userFollowingVisibility.mockReturnValueOnce(false)

      const { getByTestId } = setup({ usersGetProfile })
      const $followeds = within(getByTestId(testIDs.counts.followeds))

      expect($followeds.getByText('•')).toBeTruthy()
      expect($followeds.getByText('Following')).toBeTruthy()
    })

    it('visible', () => {
      userFollowingVisibility.mockReturnValueOnce(true)

      const { getByTestId } = setup({ usersGetProfile })
      const $followeds = within(getByTestId(testIDs.counts.followeds))

      expect($followeds).toBeTruthy()
      expect($followeds.getByText(`${usersGetProfile.data.followedsCount}`)).toBeTruthy()
      expect($followeds.getByText('Following')).toBeTruthy()
    })
  })

  it('should update counts', () => {
    jest.spyOn(PrivacyService, 'userFollowerVisibility').mockReturnValue(true)
    jest.spyOn(PrivacyService, 'userFollowingVisibility').mockReturnValue(true)

    const updatedUsersGetProfile = {
      data: {
        followersCount: 200,
        followedsCount: 210,
        postCount: 220,
      },
    }

    const { update, getByTestId } = setup({ usersGetProfile })

    update(<CountsComponent usersGetProfile={updatedUsersGetProfile} />)

    const $postCount = within(getByTestId(testIDs.counts.postCount))
    const $followersCount = within(getByTestId(testIDs.counts.followers))
    const $followedsCount = within(getByTestId(testIDs.counts.followeds))

    expect($postCount.getByText(`${updatedUsersGetProfile.data.postCount}`)).toBeTruthy()
    expect($followersCount.getByText(`${updatedUsersGetProfile.data.followersCount}`)).toBeTruthy()
    expect($followedsCount.getByText(`${updatedUsersGetProfile.data.followedsCount}`)).toBeTruthy()
  })
})
