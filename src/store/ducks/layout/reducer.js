import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/layout/constants'

const initialState = {
  layoutPostsListItem: {
    data: {},
  },
  layoutPostMediaItem: {
    data: {},
  },
  layoutPostsListScroll: {
    data: {},
  },
  layoutPostMediaScroll: {
    data: {},
  },
}

/**
 *
 */
const layoutPostsListItemSuccess = (state, action) =>
  update(state, {
    layoutPostsListItem: {
      data: {
        [action.payload.measure.py]: { $set: action.payload },
      },
    },
  })

/**
 *
 */
const layoutPostsListItemIdle = (state) =>
  update(state, {
    layoutPostsListItem: { $set: initialState.layoutPostsListItem },
  })

/**
 *
 */
const layoutPostsListScrollSuccess = (state, action) =>
  update(state, {
    layoutPostsListScroll: {
      data: { $set: action.payload },
    },
  })

/**
 *
 */
const layoutPostsListScrollIdle = (state) =>
  update(state, {
    layoutPostsListScroll: { $set: initialState.layoutPostsListScroll },
  })

/**
 *
 */
const layoutPostMediaItemSuccess = (state, action) =>
  update(state, {
    layoutPostMediaItem: {
      data: {
        [action.payload.measure.py]: { $set: action.payload },
      },
    },
  })

/**
 *
 */
const layoutPostMediaItemIdle = (state) =>
  update(state, {
    layoutPostMediaItem: { $set: initialState.layoutPostMediaItem },
  })

/**
 *
 */
const layoutPostMediaScrollSuccess = (state, action) =>
  update(state, {
    layoutPostMediaScroll: {
      data: { $set: action.payload },
    },
  })

/**
 *
 */
const layoutPostMediaScrollIdle = (state) =>
  update(state, {
    layoutPostMediaScroll: { $set: initialState.layoutPostMediaScroll },
  })

export default handleActions(
  {
    [constants.LAYOUT_POSTS_LIST_ITEM_SUCCESS]: layoutPostsListItemSuccess,
    [constants.LAYOUT_POSTS_LIST_ITEM_IDLE]: layoutPostsListItemIdle,
    [constants.LAYOUT_POSTS_LIST_SCROLL_SUCCESS]: layoutPostsListScrollSuccess,
    [constants.LAYOUT_POSTS_LIST_SCROLL_IDLE]: layoutPostsListScrollIdle,
    [constants.LAYOUT_POST_MEDIA_ITEM_SUCCESS]: layoutPostMediaItemSuccess,
    [constants.LAYOUT_POST_MEDIA_ITEM_IDLE]: layoutPostMediaItemIdle,
    [constants.LAYOUT_POST_MEDIA_SCROLL_SUCCESS]: layoutPostMediaScrollSuccess,
    [constants.LAYOUT_POST_MEDIA_SCROLL_IDLE]: layoutPostMediaScrollIdle,
  },
  initialState,
)
