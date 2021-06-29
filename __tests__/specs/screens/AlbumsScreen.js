import React from 'react'
import AlbumsScreen from 'screens/AlbumsScreen'
import { renderWithStore } from 'tests/utils'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as ReactRedux from 'react-redux'
import * as albumsActions from 'store/ducks/albums/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as albumsSelector from 'store/ducks/albums/selectors'
import * as albumsReducer from 'store/ducks/albums/reducer'

const user = {
  userId: 'id123',
}

jest.spyOn(authSelector, 'authUserSelector').mockReturnValue(user)
jest.spyOn(authSelector, 'authUserId').mockReturnValue(user.userId)

jest.spyOn(albumsSelector, 'albumsGetSelector')

jest.spyOn(ReactRedux, 'useDispatch')

const dispatch = jest.fn()
ReactRedux.useDispatch.mockReturnValue(dispatch)

albumsSelector.albumsGetSelector.mockImplementation(() =>
  jest.fn().mockReturnValue(albumsReducer.initialState.albumsGet),
)

jest.mock('components/Cache', () => jest.fn().mockReturnValue(null))

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useScrollToTop: jest.fn(),
  useRoute: jest.fn(),
  useIsFocused: jest.fn().mockReturnValue(true),
}))

const navigation = { navigate: jest.fn(), setOptions: jest.fn() }
useNavigation.mockReturnValue(navigation)

const setup = () => renderWithStore(<AlbumsScreen />)

describe('AlbumsScreen', () => {
  describe('initial loading', () => {
    afterEach(() => {
      dispatch.mockClear()
      authSelector.authUserSelector.mockReturnValue(user)
      useRoute.mockReturnValue({ params: {} })
    })

    it('request data for authorized user', () => {
      setup()

      expect(dispatch).toHaveBeenCalledWith(albumsActions.albumsGetRequest(user))
    })

    it('request data for user from route params', () => {
      const params = { userId: '23' }
      useRoute.mockReturnValue({ params })
      setup()

      expect(dispatch).toHaveBeenCalledWith(albumsActions.albumsGetRequest(params))
    })

    it('not load data for not authorized user', () => {
      authSelector.authUserId.mockReturnValue(null)
      authSelector.authUserSelector.mockReturnValue(null)

      setup()

      expect(dispatch).not.toHaveBeenCalled()
    })
  })
})
