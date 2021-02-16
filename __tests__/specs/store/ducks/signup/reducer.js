import { combineReducers } from 'redux'
import signup from 'store/ducks/signup/reducer'
import * as actions from 'store/ducks/signup/actions'
import * as selectors from 'store/ducks/signup/selectors'
import { applyActions } from 'tests/utils/helpers'

const reducer = combineReducers({ signup })

describe('Signup reducer', () => {
  describe('signupCreate', () => {
    it('initial state', () => {
      const state = reducer(undefined, { type: 'MOCK' })

      expect(selectors.signupCreate(state)).toEqual({
        status: 'idle',
        payload: {},
      })
    })

    it('loading', () => {
      const state = applyActions(
        [
          actions.signupCreateRequest({ a: 1, b: 2 }),
          actions.signupCreateRequest({ c: 3 }),
          actions.signupCreateRequest({ a: 4, b: 5 }),
        ],
        reducer,
      )

      expect(selectors.signupCreate(state)).toEqual({
        status: 'loading',
        payload: { a: 4, b: 5, c: 3 },
      })
    })

    it('success', () => {
      const state = reducer(undefined, actions.signupCreateSuccess())

      expect(selectors.signupCreate(state)).toEqual({
        status: 'success',
        payload: {},
      })
    })

    it('failure', () => {
      const error = new Error('Error Message')
      const state = reducer(undefined, actions.signupCreateFailure(error))

      expect(selectors.signupCreate(state)).toEqual({
        status: 'failure',
        payload: {},
      })
    })

    it('idle', () => {
      const state = applyActions(
        [
          actions.signupCreateSuccess({ message: 'Message' }),
          actions.signupCreateFailure({ message: 'Error' }),
          actions.signupCreateIdle(),
        ],
        reducer,
      )

      expect(selectors.signupCreate(state)).toEqual({
        status: 'idle',
        payload: {},
      })
    })
  })

  describe('signupPassword', () => {
    const payload = { a: 1, b: 2 }
    const data = { c: 3 }

    it('initial state', () => {
      const state = reducer(undefined, { type: 'MOCK' })

      expect(selectors.signupPassword(state)).toEqual({
        data: [],
        status: 'idle',
        payload: {},
      })
    })

    it('loading', () => {
      const state = reducer(undefined, actions.signupPasswordRequest(payload))

      expect(selectors.signupPassword(state)).toEqual({
        data: [],
        status: 'loading',
        payload,
      })
    })

    it('success', () => {
      const state = reducer(undefined, actions.signupPasswordSuccess({ payload, data }))

      expect(selectors.signupPassword(state)).toEqual({
        data,
        status: 'success',
        payload,
      })
    })

    it('failure', () => {
      const error = new Error('Error Message')
      const state = reducer(undefined, actions.signupPasswordFailure(error))

      expect(selectors.signupPassword(state)).toEqual({
        data: [],
        status: 'failure',
        payload: {},
      })
    })

    it('idle', () => {
      const state = applyActions(
        [
          actions.signupPasswordSuccess({ payload, data }),
          actions.signupPasswordFailure({ message: 'Error' }),
          actions.signupPasswordIdle(),
        ],
        reducer,
      )

      expect(selectors.signupPassword(state)).toEqual({
        data: [],
        status: 'idle',
        payload: {},
      })
    })
  })
})
