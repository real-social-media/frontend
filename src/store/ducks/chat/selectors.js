import { createSelectorCreator, defaultMemoize } from 'reselect'
import path from 'ramda/src/path'
import equals from 'ramda/src/equals'
import assocPath from 'ramda/src/assocPath'
import * as normalizer from 'normalizer/schemas'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals
)

const entities = () => path(['entities'])

/**
 *
 */
const chatGetChat = () => path(['chat', 'chatGetChat'])
export const chatGetChatSelector = (chatId) => createDeepEqualSelector(
  [chatGetChat(), entities()],
  (chatGetChat, entities) => {
    const denormalized = normalizer.denormalizeChatGet(chatId, entities)
    return assocPath(['data'], denormalized)(chatGetChat)
  }
)

/**
 *
 */
const chatGetChats = () => path(['chat', 'chatGetChats'])
export const chatGetChatsSelector = () => createDeepEqualSelector(
  [chatGetChats(), chatGetChat(), entities()],
  (chatGetChats, chatGetChat, entities) => {
    const denormalized = normalizer.denormalizeChatsGet(chatGetChats.data, entities)
    return assocPath(['data'], denormalized)(chatGetChats)
  }
)


/**
 *
 */
const chatCreateDirect = () => path(['chat', 'chatCreateDirect'])
export const chatCreateDirectSelector = (chatId) => createDeepEqualSelector(
  [chatCreateDirect(), entities()],
  (chatCreateDirect, entities) => {
    const denormalized = normalizer.denormalizeChatGet(chatId, entities)
    return assocPath(['data'], denormalized)(chatCreateDirect)
  }
)
