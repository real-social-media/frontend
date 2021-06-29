import { all, call } from 'redux-saga/effects'
import { createPath } from 'navigation/helpers'

export const applyActions = (actions, reducer) => {
  let state

  actions.forEach((action) => {
    state = reducer(state, action)
  })

  return state
}

export const sleep = () => new Promise((r) => setTimeout(r, 0))
export const provideDelay = (value) => {
  return { call: ({ fn }, next) => (fn.name === 'delayP' ? value : next()) }
}

export function testAsRootSaga(saga) {
  return function* pseudoRootSaga() {
    yield all(saga())
  }
}

export function sagaWithError(saga, ...sagaArgs) {
  return {
    assertThrow: (expectedError) => {
      return function* () {
        try {
          yield call(saga, ...sagaArgs)
          throw new Error('Test failed')
        } catch (e) {
          expect(e).toEqual(expectedError)
        }
      }
    },
  }
}

export const testNavigate = (navigation, pathString, params) => {
  const path = createPath(pathString.split('.'), params)
  expect(navigation.navigate).toHaveBeenCalledWith(path.screen, path.params)
}

export const testPushAction = (navigation, pathString, params) => {
  const path = createPath(pathString.split('.'), params)
  expect(navigation.push).toHaveBeenCalledWith(path.screen, path.params)
}

export const testField = (field, props) => {
  expect(field).toBeTruthy()

  Object.keys(props).forEach((key) => {
    expect(field.props[key]).toEqual(props[key])
  })
}

export function testReducer(reducer, initialState) {
  if (!(this instanceof testReducer)) {
    return new testReducer(reducer, initialState)
  }

  this.state = reducer(initialState, { type: 'MOCK_ACTION' })

  this.put = function (action) {
    this.state = reducer(this.state, action)
    return this
  }

  this.expect = function (selector, value) {
    expect(selector(this.state)).toEqual(value)
    return this
  }
}

export const makeAuthorizedState = (user, state = {}) => ({
  auth: { authGetUser: { data: user.userId } },
  entities: { users: { [user.userId]: user } },
  ...state,
})

export const mockDate = (date) => {
  const value = Date.parse(date)
  const mockFn = jest.spyOn(global.Date, 'now').mockImplementation(() => value)

  return { value, mockFn }
}
