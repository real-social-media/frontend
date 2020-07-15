import { Linking } from 'react-native'
import * as navigationActions from 'navigation/actions'
import urlPattern from 'url-pattern'

const options = { segmentValueCharset: '/:a-zA-Z0-9_-' }
const matchedPostAction = new urlPattern(
  '*/user/(:userId)/post/(:postId)/(:action)',
  options
)
const matchedPost = new urlPattern(
  '*/user/(:userId)/post/(:postId)',
  options
)

export const deeplinkNavigation = (navigation) => (action) => {
  const postActionParams = matchedPostAction.match(action)
  const postParams = matchedPost.match(action)

  if (action === 'https://real.app/chat/') {
    return navigationActions.navigateChat(navigation)()
  } else if (postActionParams && postActionParams.action === 'comments') {
    return navigationActions.navigateNestedComments(navigation, postActionParams)()
  } else if (postActionParams && postActionParams.action === 'views') {
    return navigationActions.navigateNestedPostViews(navigation, postActionParams)()
  } else if (postActionParams && postActionParams.action === 'likes') {
    return navigationActions.navigateNestedPostLikes(navigation, postActionParams)()
  } if (postParams) {
    return navigationActions.navigateNestedPost(navigation, postParams)()
  } else {
    return Linking.openURL(action)
  }
}