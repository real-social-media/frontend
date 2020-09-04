import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

import AsyncStorage from '@react-native-community/async-storage'

import auth from 'store/ducks/auth/reducer'
import signup from 'store/ducks/signup/reducer'
import camera from 'store/ducks/camera/reducer'
import theme from 'store/ducks/theme/reducer'
import posts from 'store/ducks/posts/reducer'
import albums from 'store/ducks/albums/reducer'
import chat from 'store/ducks/chat/reducer'
import users from 'store/ducks/users/reducer'
import layout from 'store/ducks/layout/reducer'
import translation from 'store/ducks/translation/reducer'
import ui from 'store/ducks/ui/reducer'
import cache from 'store/ducks/cache/reducer'
import entities from 'store/ducks/entities/reducer'
import subscriptions from 'store/ducks/subscriptions/reducer'

import 'store/ducks/posts/updates'
import 'store/ducks/users/updates'
import 'store/ducks/chat/updates'

const postsPersistConfig = {
  key: '/v2/posts',
  storage: AsyncStorage,
  whitelist: [
    // 'postsFeedGet',
    // 'postsGet',
    // 'postsGetCache',
    // 'postsGetTrendingPosts',
    // 'postsPool',
    
    // 'postsCreateQueue',
    // 'postsRecreateQueue',
  ],
}

const usersPersistConfig = {
  key: '/v2/users',
  storage: AsyncStorage,
  whitelist: [
    // 'usersPool',
  ],
}

const authPersistConfig = {
  key: '/v2/auth',
  storage: AsyncStorage,
  whitelist: [
    // 'user',
  ],
}

const signupPersistConfig = {
  key: '/v2/signup',
  storage: AsyncStorage,
  whitelist: [
    // 'signupCognitoIdentity',
  ],
}

const chatPersistConfig = {
  key: '/v2/chat',
  storage: AsyncStorage,
  whitelist: [
    // 'chatGetChats',
  ],
}

export default combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  signup: persistReducer(signupPersistConfig, signup),
  theme,
  camera,
  albums,
  chat: persistReducer(chatPersistConfig, chat),
  posts: persistReducer(postsPersistConfig, posts),
  users: persistReducer(usersPersistConfig, users),
  layout,
  translation,
  ui,
  cache,
  entities,
  subscriptions,
})
