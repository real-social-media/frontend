import UrlPattern from 'url-pattern'

export class MissingDeeplinkParamsError extends Error {
  constructor(...args) {
    super(...args)
    this.code = 'MISSING_DEEP_LINK_PARAMS_ERROR'
  }
}

const options = { segmentValueCharset: ':a-zA-Z0-9_-' }

const patterns = {
  post: new UrlPattern('*/user/(:userId)/post/(:postId)((/):action)(/)((/):actionId)(/)', options),
  profilePhoto: new UrlPattern('*/user/:userId/settings/photo(/)', options),
}

export const deeplinkPath = (action) => {
  const [postMatch, profilePhotoMatch] = [
    patterns.post.match(action), 
    patterns.profilePhoto.match(action),
  ]

  if (profilePhotoMatch !== null) {
    return { action: 'profilePhoto', ...profilePhotoMatch }
  }

  if (action === 'https://real.app/chat/') {
    return { action: 'chats' }
  }

  if (!postMatch || !postMatch.userId || !postMatch.postId) {
    throw new MissingDeeplinkParamsError('Missing userId or postId parameters for post endpoint')
  }

  return postMatch
}

export const deeplinkNavigation = (navigation, navigationActions, Linking) => (action) => {
  try {
    const params = deeplinkPath(action)

    /**
     * Chats screen
     */
    if (params.action === 'chats') {
      return navigationActions.navigateChat(navigation)()
    } else if (params && params.action === 'comments') {

    /**
     * Comments screen
     */
      return navigationActions.navigateNestedComments(navigation, params)()
    } else if (params && params.action === 'views') {

    /**
     * Views screen
     */
      return navigationActions.navigateNestedPostViews(navigation, params)()
    } else if (params && params.action === 'likes') {

    /**
     * Likes screen
     */
      return navigationActions.navigateNestedPostLikes(navigation, params)()
    } else if (params && !params.action) {

    /**
     * Post screen
     */
      return navigationActions.navigateNestedPost(navigation, params)()
    } else if (params && params.action === 'profilePhoto') {

      /**
       * Profile Photo Upload
       */
      return navigationActions.navigateProfilePhoto(navigation, params)()
    }
  } catch (error) {
    if (error.code === 'MISSING_DEEP_LINK_PARAMS_ERROR') {
      return Linking.openURL(action)
    }
  }
}
