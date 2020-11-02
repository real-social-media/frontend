import UrlPattern from 'url-pattern'
import { Linking } from 'react-native'
import * as navigationActions from 'navigation/actions'

class NotSupportedInAppCardError extends Error {
  constructor(...args) {
    super(...args)
    this.code = 'NOT_SUPPORTED_IN_APP_CARD_ERROR'
  }
}

const options = { segmentValueCharset: ':a-zA-Z0-9_-' }

const ACTIONS = {
  POST: 'post',
  PROFILE_PHOTO: 'profilePhoto',
  INVITE_FRIENDS: 'inviteFriends',
  SIGNUP: 'signup',
  CHATS: 'chats',
  COMMENTS: 'comments',
  VIEWS: 'views',
  LIKES: 'likes',
}

const PATTERNS = {
  [ACTIONS.POST]: new UrlPattern('*/user/(:userId)/post/(:postId)((/):action)(/)((/):actionId)(/)', options),
  [ACTIONS.PROFILE_PHOTO]: new UrlPattern('*/user/:userId/settings/photo(/)', options),
  [ACTIONS.INVITE_FRIENDS]: new UrlPattern('*/user/:userId/settings/contacts(/)', options),
  [ACTIONS.SIGNUP]: new UrlPattern('*/signup/:userId(/)', options),
  [ACTIONS.CHATS]: new UrlPattern('*/chat(/)', options),
}

export const deeplinkPath = (action) => {
  for (const key of Object.keys(PATTERNS)) {
    const pattern = PATTERNS[key]
    const match = pattern.match(action)

    if (match !== null) {
      return { action: key, ...match }
    }
  }

  throw new NotSupportedInAppCardError('The in-app card is not supported')
}

export const deeplinkNavigation = (navigation) => (action) => {
  try {
    const params = deeplinkPath(action)

    switch (params.action) {
      case ACTIONS.CHATS:
        navigationActions.navigateChat(navigation)()
        break
      case ACTIONS.COMMENTS:
        navigationActions.navigateNestedComments(navigation, params)
        break
      case ACTIONS.VIEWS:
        navigationActions.navigateNestedPostViews(navigation, params)
        break
      case ACTIONS.LIKES:
        navigationActions.navigateNestedPostLikes(navigation, params)
        break
      case ACTIONS.POST:
        navigationActions.navigateNestedPost(navigation, params)
        break
      case ACTIONS.PROFILE_PHOTO:
        navigationActions.navigateProfilePhoto(navigation, params)
        break
      case ACTIONS.INVITE_FRIENDS:
        navigationActions.navigateInviteFriends(navigation, params)
        break
      case ACTIONS.SIGNUP:
        navigationActions.navigateAuthUsername(navigation, params)
        break
      default:
        break
    }
  } catch (error) {
    if (error.code === 'NOT_SUPPORTED_IN_APP_CARD_ERROR') {
      return Linking.openURL(action)
    }
  }
}
