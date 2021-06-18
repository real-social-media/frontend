import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import Config from 'react-native-config'
import * as constants from 'store/ducks/snackbars/constants'

export const initialState = {
  debugMode: Config.ENVIRONMENT === 'development',
}

/**
 *
 */
const toggleDebugMode = (state) =>
  update(state, {
    debugMode: { $set: !state.debugMode },
  })

export default handleActions(
  {
    [constants.TOGGLE_DEBUG_MODE]: toggleDebugMode,
  },
  initialState,
)
