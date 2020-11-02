export default {
  prefixes: ['real.app://', 'https://real.app/'],
  config: {
    AuthEmailConfirm: 'confirm/email/:userId/:confirmationCode',
    AuthForgotConfirm: 'confirm/forgot/:userId/:confirmationCode',
    Auth: {
      screens: {
        AuthUsername: 'signup/:userId',
      },
    },
    Chat: {
      screens: {
        ChatDirect: 'chat/:chatId',
        Chat: 'chat',
      },
    },
    Root: {
      screens: {
        Home: {
          screens: {
            Profile: {
              screens: {
                ProfilePhoto: 'user/:userId/settings/photo',
                InviteFriends: 'user/:userId/settings/contacts',
              },
            },
          },
        },
        Comments: 'user/:userId/post/:postId/comments',
        PostMedia: 'user/:userId/post/:postId',
        Profile: 'user/:userId',
      },
    },
  },
}