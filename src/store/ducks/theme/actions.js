import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/theme/constants'

/**
 *
 */
export const themeFetchIdle = createAction(constants.THEME_FETCH_IDLE)
export const themeFetchRequest = createAction(constants.THEME_FETCH_REQUEST)
export const themeFetchSuccess = createAction(constants.THEME_FETCH_SUCCESS)
export const themeFetchFailure = createAction(constants.THEME_FETCH_FAILURE)

/**
 *
 */
export const themePreviewIdle = createAction(constants.THEME_PREVIEW_IDLE)
export const themePreviewRequest = createAction(constants.THEME_PREVIEW_REQUEST)
export const themePreviewSuccess = createAction(constants.THEME_PREVIEW_SUCCESS)
export const themePreviewFailure = createAction(constants.THEME_PREVIEW_FAILURE)
