import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/albums/constants'

/**
 * 
 */
export const albumsGetIdle = createAction(constants.ALBUMS_GET_IDLE)
export const albumsGetRequest = createAction(constants.ALBUMS_GET_REQUEST)
export const albumsGetSuccess = createAction(constants.ALBUMS_GET_SUCCESS)
export const albumsGetFailure = createAction(constants.ALBUMS_GET_FAILURE)

/**
 * 
 */
export const albumsSingleGetIdle = createAction(constants.ALBUMS_SINGLE_GET_IDLE)
export const albumsSingleGetRequest = createAction(constants.ALBUMS_SINGLE_GET_REQUEST)
export const albumsSingleGetSuccess = createAction(constants.ALBUMS_SINGLE_GET_SUCCESS)
export const albumsSingleGetFailure = createAction(constants.ALBUMS_SINGLE_GET_FAILURE)

/**
 * 
 */
export const albumsCreateIdle = createAction(constants.ALBUMS_CREATE_IDLE)
export const albumsCreateRequest = createAction(constants.ALBUMS_CREATE_REQUEST)
export const albumsCreateSuccess = createAction(constants.ALBUMS_CREATE_SUCCESS)
export const albumsCreateFailure = createAction(constants.ALBUMS_CREATE_FAILURE)

/**
 * 
 */
export const albumsPostsGetIdle = createAction(constants.ALBUMS_POSTS_GET_IDLE)
export const albumsPostsGetRequest = createAction(constants.ALBUMS_POSTS_GET_REQUEST)
export const albumsPostsGetSuccess = createAction(constants.ALBUMS_POSTS_GET_SUCCESS)
export const albumsPostsGetFailure = createAction(constants.ALBUMS_POSTS_GET_FAILURE)

/**
 * 
 */
export const albumsPostsGetMoreIdle = createAction(constants.ALBUMS_POSTS_GET_MORE_IDLE)
export const albumsPostsGetMoreRequest = createAction(constants.ALBUMS_POSTS_GET_MORE_REQUEST)
export const albumsPostsGetMoreSuccess = createAction(constants.ALBUMS_POSTS_GET_MORE_SUCCESS)
export const albumsPostsGetMoreFailure = createAction(constants.ALBUMS_POSTS_GET_MORE_FAILURE)

/**
 * 
 */
export const albumsEditIdle = createAction(constants.ALBUMS_EDIT_IDLE)
export const albumsEditRequest = createAction(constants.ALBUMS_EDIT_REQUEST)
export const albumsEditSuccess = createAction(constants.ALBUMS_EDIT_SUCCESS)
export const albumsEditFailure = createAction(constants.ALBUMS_EDIT_FAILURE)

/**
 * 
 */
export const albumsDeleteIdle = createAction(constants.ALBUMS_DELETE_IDLE)
export const albumsDeleteRequest = createAction(constants.ALBUMS_DELETE_REQUEST)
export const albumsDeleteSuccess = createAction(constants.ALBUMS_DELETE_SUCCESS)
export const albumsDeleteFailure = createAction(constants.ALBUMS_DELETE_FAILURE)
