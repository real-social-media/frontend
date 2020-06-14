import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/entities/constants'

const initialState = {
  albums: {
  },
  posts: {
  },
  comments: {
  },
  users: {
  },
  images: {
  },
  chats: {
  },
}

const entitiesAlbumsMerge = (state, action) => update(state, {
  albums: {
    $merge: action.payload.data,
  },
})

const entitiesPostsMerge = (state, action) => update(state, {
  posts: {
    $merge: action.payload.data,
  },
})

const entitiesCommentsMerge = (state, action) => update(state, {
  comments: {
    $merge: action.payload.data,
  },
})

const entitiesUsersMerge = (state, action) => update(state, {
  users: {
    $merge: action.payload.data,
  },
})

const entitiesImagesMerge = (state, action) => update(state, {
  images: {
    $merge: action.payload.data,
  },
})

const entitiesChatsMerge = (state, action) => update(state, {
  chats: {
    $merge: action.payload.data,
  },
})

export default handleActions({
  [constants.ENTITIES_ALBUMS_MERGE]: entitiesAlbumsMerge,
  [constants.ENTITIES_POSTS_MERGE]: entitiesPostsMerge,
  [constants.ENTITIES_COMMENTS_MERGE]: entitiesCommentsMerge,
  [constants.ENTITIES_USERS_MERGE]: entitiesUsersMerge,
  [constants.ENTITIES_IMAGES_MERGE]: entitiesImagesMerge,
  [constants.ENTITIES_CHATS_MERGE]: entitiesChatsMerge,
}, initialState)
