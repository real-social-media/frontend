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
  version: 2,
  key: 'posts',
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
  version: 2,
  key: 'users',
  storage: AsyncStorage,
  whitelist: [
    // 'usersPool',
  ],
}

const authPersistConfig = {
  version: 2,
  key: 'auth',
  storage: AsyncStorage,
  whitelist: [
    // 'user',
  ],
}

const signupPersistConfig = {
  version: 2,
  key: 'signup',
  storage: AsyncStorage,
  whitelist: [
    // 'signupCognitoIdentity',
  ],
}

const chatPersistConfig = {
  version: 2,
  key: 'chat',
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
