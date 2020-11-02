import { combineReducers } from 'redux'
import users from 'store/ducks/users/reducer'
import * as actions from 'store/ducks/users/actions'
import * as selectors from 'store/ducks/users/selectors'

const reducer = combineReducers({ users })

describe('Users reducer', () => {
  describe('usersChangeAvatar', () => {
    it('initial state', () => {
      const state = reducer(undefined, { type: 'MOCK' })

      expect(selectors.usersChangeAvatar(state)).toEqual({ status: 'idle' })
    })

    it('loading', () => {
      const state = reducer(undefined, actions.usersChangeAvatarRequest())

      expect(selectors.usersChangeAvatar(state)).toEqual({ status: 'loading' })
    })

    it('success', () => {
      const state = reducer(undefined, actions.usersChangeAvatarSuccess())

      expect(selectors.usersChangeAvatar(state)).toEqual({ status: 'success' })
    })

    it('failure', () => {
      const state = reducer(undefined, actions.usersChangeAvatarFailure())

      expect(selectors.usersChangeAvatar(state)).toEqual({ status: 'failure' })
    })
  })

  describe('usersImagePostsGet', () => {
    const selector = selectors.usersImagePostsGetSelector()
    it('initial state', () => {
      const state = reducer(undefined, { type: 'MOCK' })

      expect(selector(state)).toEqual({
        data: [],
        status: 'idle',
        error: {},
        payload: {},
      })
    })

    it('loading', () => {
      const payload = { userId: 1 }
      const state = reducer(undefined, actions.usersImagePostsGetRequest(payload))

      expect(selector(state)).toEqual({
        data: [],
        status: 'loading',
        error: {},
        payload,
      })
    })

    it('success', () => {
      const data = [{ id: 1 }]
      const state = reducer(undefined, actions.usersImagePostsGetSuccess({ data }))

      expect(selector(state)).toEqual({
        data,
        status: 'success',
        error: {},
        payload: {},
      })
    })

    it('failure', () => {
      const error = { message: 'Error' }
      const state = reducer(undefined, actions.usersImagePostsGetFailure(error))

      expect(selector(state)).toEqual({
        data: [],
        status: 'failure',
        error: error.message,
        payload: {},
      })
    })
  })
})
