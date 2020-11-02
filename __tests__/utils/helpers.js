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