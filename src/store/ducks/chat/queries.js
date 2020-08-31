import * as chatSingle from 'store/ducks/chat/queries/single'
import * as chatList from 'store/ducks/chat/queries/list'
import * as message from 'store/ducks/chat/queries/message'

export const chats = `
  query chats($limit: Int, $nextToken: String) {
    self {
      chats(limit: $limit, nextToken: $nextToken) {
        items {
          ...listChatFragment
        }
        nextToken
      }
    }
  }
  ${chatList.listChatFragment}
`

export const chat = `
  query chat($chatId: ID!) {
    chat(chatId: $chatId) {
      ...singleChatFragment
    }
  }
  ${chatSingle.singleChatFragment}
`

export const onChatMessageNotification = `
  subscription onChatMessageNotification ($userId: ID!) {
    onChatMessageNotification (userId: $userId) {
      userId
      type
      message {
        messageId
        chat {
          chatId
        }
        authorUserId
        author {
          userId
        }
        text
        textTaggedUsers {
          tag
          user {
            userId
          }
        }
        createdAt
        lastEditedAt
      }
    }
  }
`

export const createDirectChat = `
  mutation createDirectChat(
    $chatId: ID!,
    $userId: ID!,
    $messageId: ID!,
    $messageText: String!,
  ) {
    createDirectChat(
      chatId: $chatId,
      userId: $userId,
      messageId: $messageId,
      messageText: $messageText,
    ) {
      ...singleChatFragment
    }
  }
  ${chatSingle.singleChatFragment}
`

export const addChatMessage = `
  mutation addChatMessage(
    $chatId: ID!,
    $messageId: ID!,
    $text: String!,
  ) {
    addChatMessage(
      chatId: $chatId,
      messageId: $messageId,
      text: $text,
    ) {
      ...chatMessageFragment
    }
  }
  ${message.chatMessageFragment}
`

export const reportChatViews = `
  mutation reportChatViews(
    $chatIds: [ID!]!,
  ) {
    reportChatViews(
      chatIds: $chatIds,
    )
  }
`

export const flagChatMessage = `
  mutation flagChatMessage(
    $messageId: ID!,
  ) {
    flagChatMessage(
      messageId: $messageId,
    ) {
      ...chatMessageFragment
    }
  }
  ${message.chatMessageFragment}
`

export const deleteChatMessage = `
  mutation deleteChatMessage(
    $messageId: ID!,
  ) {
    deleteChatMessage(
      messageId: $messageId,
    ) {
      ...chatMessageFragment
    }
  }
  ${message.chatMessageFragment}
`
