import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/entities/constants'

const innerMerge = (state, action) => {
  const entries = Object.entries(action.payload.data)

  return entries.reduce((acc, [key, value]) => {
    acc[key] = ({ ...acc[key] || {}, ...value })
    return acc
  }, state)
}

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
  messages: {
  },
}

const entitiesUsersMerge = (state, action) => update(state, {
  users: {
    $merge: innerMerge(state.users, action),
  },
})

const entitiesAlbumsMerge = (state, action) => update(state, {
  albums: {
    $merge: innerMerge(state.albums, action),
  },
})

const entitiesPostsMerge = (state, action) => update(state, {
  posts: {
    $merge: innerMerge(state.posts, action),
  },
})

const entitiesCommentsMerge = (state, action) => update(state, {
  comments: {
    $merge: innerMerge(state.comments, action),
  },
})

const entitiesImagesMerge = (state, action) => update(state, {
  images: {
    $merge: innerMerge(state.images, action),
  },
})

const entitiesChatsMerge = (state, action) => update(state, {
  chats: {
    $merge: innerMerge(state.chats, action),
  },
})

const entitiesMessagesMerge = (state, action) => update(state, {
  messages: {
    $merge: innerMerge(state.messages, action),
  },
})

export default handleActions({
  [constants.ENTITIES_ALBUMS_MERGE]: entitiesAlbumsMerge,
  [constants.ENTITIES_POSTS_MERGE]: entitiesPostsMerge,
  [constants.ENTITIES_COMMENTS_MERGE]: entitiesCommentsMerge,
  [constants.ENTITIES_USERS_MERGE]: entitiesUsersMerge,
  [constants.ENTITIES_IMAGES_MERGE]: entitiesImagesMerge,
  [constants.ENTITIES_CHATS_MERGE]: entitiesChatsMerge,
  [constants.ENTITIES_MESSAGES_MERGE]: entitiesMessagesMerge,
}, initialState)
