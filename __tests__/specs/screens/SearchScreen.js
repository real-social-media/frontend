/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "testFilter"] }] */
import React from 'react'
import { useDispatch } from 'react-redux'
import { renderWithProviders, fireEvent } from 'tests/utils'
import * as postsSelector from 'store/ducks/posts/selectors'
import * as usersActions from 'store/ducks/users/actions'
import * as postsActions from 'store/ducks/posts/actions'
import SearchScreen from 'screens/SearchScreen'

jest.mock('react-redux', () => ({ useDispatch: jest.fn(), useSelector: (i) => i }))
jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn(), useScrollToTop: jest.fn() }))
jest.mock('store/ducks/posts/selectors', () => ({ postsGetTrendingPostsSelector: jest.fn() }))

const setup = () => renderWithProviders(<SearchScreen />)

describe('Search screen', () => {
  const dispatch = jest.fn()

  beforeAll(() => {
    postsSelector.postsGetTrendingPostsSelector.mockReturnValue({ data: [] })
    useDispatch.mockReturnValue(dispatch)
  })

  afterEach(() => {
    dispatch.mockClear()
  })

  it('initial fetch', () => {
    setup()

    const fetchAllTrendingPosts = { viewedStatus: undefined, isVerified: undefined }
    expect(dispatch).toHaveBeenCalledWith(postsActions.postsGetTrendingPostsRequest(fetchAllTrendingPosts))
    expect(dispatch).toHaveBeenCalledWith(usersActions.usersGetTrendingUsersRequest({ limit: 30 }))
  })

  describe('Filters', () => {
    const testFilter = ({ getByText, name, payload }) => {
      dispatch.mockClear()
      fireEvent.press(getByText(name))
      expect(dispatch).toHaveBeenCalledWith(postsActions.postsGetTrendingPostsRequest(payload))
      fireEvent.press(getByText(name))
      expect(dispatch).toHaveBeenCalledTimes(1)
    }

    it('toggle Verified/Unverified', () => {
      const { getByText } = setup()
      testFilter({ getByText, name: 'Verified', payload: { isVerified: true, viewedStatus: undefined } })
      testFilter({ getByText, name: 'Unverified', payload: { isVerified: false, viewedStatus: undefined } })
      testFilter({ getByText, name: 'All', payload: { isVerified: undefined, viewedStatus: undefined } })
    })

    it('toggle Viewed/Unviewed', () => {
      const { getByText } = setup()
      testFilter({ getByText, name: 'Viewed', payload: { isVerified: undefined, viewedStatus: 'VIEWED' } })
      testFilter({ getByText, name: 'Unviewed', payload: { isVerified: undefined, viewedStatus: 'NOT_VIEWED' } })
      testFilter({ getByText, name: 'All', payload: { isVerified: undefined, viewedStatus: undefined } })
    })

    it('mix Verified/Viewed', () => {
      const { getByText } = setup()

      testFilter({ getByText, name: 'Viewed', payload: { isVerified: undefined, viewedStatus: 'VIEWED' } })
      testFilter({ getByText, name: 'Verified', payload: { isVerified: true, viewedStatus: 'VIEWED' } })
      testFilter({ getByText, name: 'Unviewed', payload: { isVerified: true, viewedStatus: 'NOT_VIEWED' } })
      testFilter({ getByText, name: 'Unverified', payload: { isVerified: false, viewedStatus: 'NOT_VIEWED' } })
    })
  })
})
