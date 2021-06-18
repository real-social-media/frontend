import { combineReducers } from 'redux'
import { testReducer } from 'tests/utils/helpers'
import Config from 'react-native-config'
import snackbars from 'store/ducks/snackbars/reducer'
import * as actions from 'store/ducks/snackbars/actions'
import * as selectors from 'store/ducks/snackbars/selectors'

jest.mock('react-native-config', () => ({ ENVIRONMENT: 'development' }))

const reducer = combineReducers({ snackbars })

describe('Snackbars reducer', () => {
  afterEach(() => {
    Config.ENVIRONMENT = 'development'
  })

  it('enabled by default for development', () => {
    testReducer(reducer).expect(selectors.debugMode, true)
  })

  it('toggle debug mode', () => {
    testReducer(reducer)
      .expect(selectors.debugMode, true)

      .put(actions.toggleDebugMode())
      .expect(selectors.debugMode, false)

      .put(actions.toggleDebugMode())
      .expect(selectors.debugMode, true)
  })
})
