import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { renderWithProviders, fireEvent, within } from 'tests/utils'
import PrivacyScreen from 'screens/PrivacyScreen'
import * as usersActions from 'store/ducks/users/actions'
import { authUserSelector } from 'store/ducks/auth/selectors'
import testIDs from 'components/Privacy/test-ids'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))

const user = {
  privacyStatus: 'PUBLIC',
  followCountsHidden: false,
  likesDisabled: false,
  commentsDisabled: false,
  sharingDisabled: false,
  viewCountsHidden: false,
}

const setup = () => renderWithProviders(<PrivacyScreen />)

const pressOnSwith = (testID) => {
  const { getByTestId } = setup()
  const $option = within(getByTestId(testID))
  const $switch = $option.getByA11yRole('switch')

  fireEvent.press($switch)
}

describe('Privacy screen', () => {
  const dispatch = jest.fn()

  const testToggle = (prop) => {
    const testID = testIDs.form[prop]

    expect(user[prop]).toBe(false)
    pressOnSwith(testID)
    expect(dispatch).toHaveBeenCalledWith(usersActions.usersEditProfileRequest({ [prop]: true }))
    dispatch.mockClear()

    useSelector.mockReturnValueOnce({ ...user, [prop]: true })
    pressOnSwith(testID)
    expect(dispatch).toHaveBeenCalledWith(usersActions.usersEditProfileRequest({ [prop]: false }))
  }

  beforeAll(() => {
    useDispatch.mockReturnValue(dispatch)
    useSelector.mockReturnValue(user)
  })

  afterEach(() => {
    dispatch.mockClear()
    useSelector.mockClear()
  })

  it('should select authorized user', () => {
    setup()

    expect(useSelector).toHaveBeenCalledWith(authUserSelector)
    expect(useSelector()).toEqual(user)
  })

  describe('toggle settings', () => {
    it('togglePrivacyStatus', () => {
      expect(user.privacyStatus).toBe('PUBLIC')
      pressOnSwith(testIDs.form.privacyStatus)
      expect(dispatch).toHaveBeenCalledWith(usersActions.usersEditProfileRequest({ privacyStatus: 'PRIVATE' }))
      dispatch.mockClear()

      useSelector.mockReturnValueOnce({ ...user, privacyStatus: 'PRIVATE' })
      pressOnSwith(testIDs.form.privacyStatus)
      expect(dispatch).toHaveBeenCalledWith(usersActions.usersEditProfileRequest({ privacyStatus: 'PUBLIC' }))
    })

    it('toggleFollowCountsHidden', () => testToggle('followCountsHidden'))
    it('toggleViewCountsHidden', () => testToggle('viewCountsHidden'))
    it('toggleLikesDisabled', () => testToggle('likesDisabled'))
    it('toggleCommentsDisabled', () => testToggle('commentsDisabled'))
    it('toggleSharingDisabled', () => testToggle('sharingDisabled'))
  })
})
