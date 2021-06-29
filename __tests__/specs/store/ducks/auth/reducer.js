import { combineReducers } from 'redux'
import * as normalizer from 'normalizer/schemas'
import auth from 'store/ducks/auth/reducer'
import entities from 'store/ducks/entities/reducer'
import * as actions from 'store/ducks/auth/actions'
import * as entitiesActions from 'store/ducks/entities/actions'
import * as selectors from 'store/ducks/auth/selectors'
import { applyActions, testReducer } from 'tests/utils/helpers'

const reducer = combineReducers({ auth, entities })
const error = new Error('Error Message')

describe('Auth reducer', () => {
  describe('authSigninCognito', () => {
    it('initial state', () => {
      const state = reducer(undefined, { type: 'MOCK' })

      expect(selectors.authSigninCognito(state)).toEqual({
        status: 'idle',
        payload: {},
      })
    })

    it('loading', () => {
      const state = applyActions(
        [
          actions.authSigninCognitoRequest({ a: 1, b: 2 }),
          actions.authSigninCognitoRequest({ c: 3 }),
          actions.authSigninCognitoRequest({ a: 4, b: 5 }),
        ],
        reducer,
      )

      expect(selectors.authSigninCognito(state)).toEqual({
        status: 'loading',
        payload: { a: 4, b: 5, c: 3 },
      })
    })

    it('clear an error on request', () => {
      const state = applyActions(
        [actions.authSigninCognitoFailure(error), actions.authSigninCognitoRequest({ c: 3 })],
        reducer,
      )

      expect(selectors.authSigninCognito(state)).toEqual({
        status: 'loading',
        payload: { c: 3 },
      })
    })

    it('success', () => {
      const state = reducer(undefined, actions.authSigninCognitoSuccess())

      expect(selectors.authSigninCognito(state)).toEqual({
        status: 'success',
        payload: {},
      })
    })

    it('failure', () => {
      const error = new Error('Error Message')
      const state = reducer(undefined, actions.authSigninCognitoFailure(error))

      expect(selectors.authSigninCognito(state)).toEqual({
        status: 'failure',
        payload: {},
      })
    })

    it('idle', () => {
      const state = applyActions(
        [
          actions.authSigninCognitoSuccess({ message: 'Message' }),
          actions.authSigninCognitoFailure(error),
          actions.authSigninCognitoIdle(),
        ],
        reducer,
      )

      expect(selectors.authSigninCognito(state)).toEqual({
        status: 'idle',
        payload: {},
      })
    })
  })

  describe('authForgot', () => {
    it('initial state', () => {
      const state = reducer(undefined, { type: 'MOCK' })

      expect(selectors.authForgot(state)).toEqual({
        status: 'idle',
        payload: {},
      })
    })

    it('loading', () => {
      const state = applyActions(
        [
          actions.authForgotRequest({ a: 1, b: 2 }),
          actions.authForgotRequest({ c: 3 }),
          actions.authForgotRequest({ a: 4, b: 5 }),
        ],
        reducer,
      )

      expect(selectors.authForgot(state)).toEqual({
        status: 'loading',
        payload: { a: 4, b: 5, c: 3 },
      })
    })

    it('success', () => {
      const state = reducer(undefined, actions.authForgotSuccess())

      expect(selectors.authForgot(state)).toEqual({
        status: 'success',
        payload: {},
      })
    })

    it('failure', () => {
      const error = new Error('Error Message')
      const state = reducer(undefined, actions.authForgotFailure(error))

      expect(selectors.authForgot(state)).toEqual({
        status: 'failure',
        payload: {},
      })
    })

    it('idle', () => {
      const state = applyActions(
        [actions.authForgotSuccess({ message: 'Message' }), actions.authForgotFailure(error), actions.authForgotIdle()],
        reducer,
      )

      expect(selectors.authForgot(state)).toEqual({
        status: 'idle',
        payload: {},
      })
    })
  })

  describe('authGetUser', () => {
    const user = { userId: '1', a: 1, b: 2 }
    const normalized = normalizer.normalizeUserGet(user)

    it('initial state', () => {
      testReducer(reducer)
        .expect(selectors.authGetUser, { data: {}, status: 'idle' })
        .expect(selectors.authUserId, false)
        .expect(selectors.authUserSelector, { data: {}, status: 'idle' })
        .expect(selectors.authUser, {})
    })

    it('loading', () => {
      testReducer(reducer)
        .put(actions.authGetUserRequest())
        .expect(selectors.authGetUser, { data: {}, status: 'loading' })
        .expect(selectors.authUserId, false)
        .expect(selectors.authUserSelector, { data: {}, status: 'loading' })
        .expect(selectors.authUser, {})
    })

    it('success', () => {
      testReducer(reducer)
        .put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users }))
        .put(actions.authGetUserSuccess({ data: normalized.result }))
        .expect(selectors.authGetUser, { data: user.userId, status: 'success' })
        .expect(selectors.authUserId, user.userId)
        .expect(selectors.authUserSelector, { data: user, status: 'success' })
        .expect(selectors.authUser, user)
    })

    it('failure', () => {
      const error = new Error('Native Error')

      testReducer(reducer)
        .put(actions.authGetUserFailure(error))
        .expect(selectors.authGetUser, { data: {}, status: 'failure' })
        .expect(selectors.authUserId, false)
        .expect(selectors.authUserSelector, { data: {}, status: 'failure' })
        .expect(selectors.authUser, {})
    })

    it('idle', () => {
      testReducer(reducer)
        .put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users }))
        .put(actions.authGetUserSuccess({ data: normalized.result }))
        .put(actions.authGetUserIdle())
        .expect(selectors.authGetUser, { data: {}, status: 'idle' })
        .expect(selectors.authUserId, false)
        .expect(selectors.authUserSelector, { data: {}, status: 'idle' })
        .expect(selectors.authUser, {})
    })
  })
})
