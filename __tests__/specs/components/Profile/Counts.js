import React from 'react'
import { renderWithProviders, within } from 'tests/utils'
import * as PrivacyService from 'services/Privacy'
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
  let userFollowerVisibility = jest.spyOn(PrivacyService, 'userFollowerVisibility').mockReturnValue(true)

  it('hidden followers', () => {
    userFollowerVisibility.mockReturnValueOnce(false)

    const { getByTestId } = setup({ usersGetProfile })
    const $followers = within(getByTestId(testIDs.counts.followers))

    expect($followers.getByText('•')).toBeTruthy()
    expect($followers.getByText('Followers')).toBeTruthy()
  })

  it('visible followers', () => {
    userFollowerVisibility.mockReturnValueOnce(true)

    const { getByTestId } = setup({ usersGetProfile })
    const $followers = within(getByTestId(testIDs.counts.followers))

    expect($followers).toBeTruthy()
    expect($followers.getByText(`${usersGetProfile.data.followersCount}`)).toBeTruthy()
    expect($followers.getByText('Followers')).toBeTruthy()
  })
})
