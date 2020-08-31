import update, { extend } from 'immutability-helper'
import pathOr from 'ramda/src/pathOr'
import without from 'ramda/src/without'
import assocPath from 'ramda/src/assocPath'
import compose from 'ramda/src/compose'

/**
 *
 */
const chatUserModifier = (chat) => {
  const mappedUsers = pathOr([], ['users', 'items'])(chat).map((user) => user.userId)
  return assocPath(['users', 'items'], mappedUsers)(chat)
}

const chatMessageUserModifier = (chat) => {
  const mappedUsers = pathOr(
    [],
    ['messages', 'items'],
  )(chat).map((message) => {
    const mappedUser = pathOr(null, ['author', 'userId'])(message)
    return assocPath(['author'], mappedUser)(message)
  })
  return assocPath(['messages', 'items'], mappedUsers)(chat)
}

/**
 *
 */
extend('$chatResourceSetSuccess', ({ payload }, original) => {
  const nextData = pathOr([], ['data'])(payload).map(chatUserModifier)
  return update(original, { $set: nextData })
})

extend('$chatResourceSetSuccess', ({ payload }, original) => {
  return update(original, { $set: pathOr([], ['data'])(payload).map((chat) => chat.chatId) })
})

/**
 * Resource pool set
 */
extend('$chatResourcePoolSet', ({ payload, initialState }, original) => {
  const nextChat = update(initialState, {
    data: { $set: compose(chatMessageUserModifier, chatUserModifier)(payload.data) },
    status: { $set: 'success' },
  })

  return update(original, {
    [payload.data.chatId]: { $set: nextChat },
  })
})

/**
 * Resource pool merge
 */
extend('$chatResourcePoolMerge', ({ payload, initialState }, original) => {
  return update(original, {
    $merge: pathOr(
      [],
      ['data'],
    )(payload).reduce((acc, chat) => {
      acc[chat.chatId] = update(initialState, {
        data: { $set: compose(chatMessageUserModifier, chatUserModifier)(chat) },
        status: { $set: 'success' },
      })
      return acc
    }, {}),
  })
})

/**
 *
 */
extend('$chatResourcePushSuccess', ({ payload }, original) => {
  return update(original, { $push: pathOr([], ['data'])(payload).map((chat) => chat.chatId) })
})

extend('$chatResourceRemoveSuccess', ({ payload }, original) => {
  return update(original, {
    $set: without([payload.data.chatId], original),
  })
})
