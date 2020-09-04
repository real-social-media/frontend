import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/layout/constants'

/**
 * 
 */
export const layoutPostsListItemSuccess = createAction(constants.LAYOUT_POSTS_LIST_ITEM_SUCCESS)
export const layoutPostsListItemIdle = createAction(constants.LAYOUT_POSTS_LIST_ITEM_IDLE)
export const layoutPostsListScrollSuccess = createAction(constants.LAYOUT_POSTS_LIST_SCROLL_SUCCESS)
export const layoutPostsListScrollIdle = createAction(constants.LAYOUT_POSTS_LIST_SCROLL_IDLE)

/**
 * 
 */
export const layoutPostMediaScrollSuccess = createAction(constants.LAYOUT_POST_MEDIA_SCROLL_SUCCESS)
export const layoutPostMediaScrollIdle = createAction(constants.LAYOUT_POST_MEDIA_SCROLL_IDLE)
export const layoutPostMediaItemSuccess = createAction(constants.LAYOUT_POST_MEDIA_ITEM_SUCCESS)
export const layoutPostMediaItemIdle = createAction(constants.LAYOUT_POST_MEDIA_ITEM_IDLE)
