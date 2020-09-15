import throttle from 'lodash.throttle'

const defaultThrottle = functor => throttle(functor, 200, { trailing: false })

/**
 *
 */
export const navigateNestedPost = (navigation, params) => () =>
  navigation.navigate('Root', {
    screen: 'PostMedia',
    params,
  })

export const navigateNestedPostViews = (navigation, params) => () =>
  navigation.navigate('Root', {
    screen: 'PostViews',
    params,
  })

export const navigateNestedComments = (navigation, params) => () =>
  navigation.navigate('Root', {
    screen: 'Comments',
    params,
  })

export const navigateNestedPostLikes = (navigation, params) => () =>
  navigation.navigate('Root', {
    screen: 'PostLikes',
    params,
  })

/**
 * Root -> Home -> Feed -> Feed
 */

export const navigateBack = (navigation) => () =>
  navigation.goBack()

export const navigatePop = (navigation) => () =>
  navigation.popToTop()

export const navigateHome = (navigation, params) => () =>
  navigation.navigate('Root', {
    screen: 'Home',
    params: {
      screen: 'Feed',
      params: {
        screen: 'Feed',
        ...params,
      },
    },
  })

export const navigatePostCreate = (navigation, params) => () =>
  navigation.navigate('Root', {
    screen: 'PostCreate',
    params,
  })

export const navigateSearch = (navigation, params) => () =>
  navigation.navigate('Search', {
    screen: 'Search',
    params,
  })

export const navigateCamera = (navigation, params) => () =>
  navigation.navigate('Camera', params)

  
export const navigateStory = (navigation, params) => defaultThrottle(() =>
  navigation.push('Story', params),
)

export const navigateChat = (navigation, params) => defaultThrottle(() =>
  navigation.navigate('Chat', params),
)

export const navigateChatDirect = (navigation, params) => defaultThrottle(() =>
  navigation.navigate('ChatDirect', params),
)

export const navigateChatOptions = (navigation, params) => defaultThrottle(() =>
  navigation.navigate('ChatOptions', params),
)

export const navigatePostShare = (navigation, params) => defaultThrottle(() =>
  navigation.push('PostShare', params),
)

export const navigatePostEdit = (navigation, params) => defaultThrottle(() =>
  navigation.navigate('PostEdit', params),
)

export const navigateProfileRequests = (navigation, params) => defaultThrottle(() =>
  navigation.navigate('ProfileRequests', params),
)

export const navigateProfilePhoto = (navigation, params) => defaultThrottle(() =>
  navigation.navigate('ProfilePhoto', params),
)

export const navigateProfilePhotoUpload = (navigation, params) => defaultThrottle(() =>
  navigation.navigate('ProfilePhotoUpload', params),
)

export const navigateAlbum = (navigation, params) => defaultThrottle(() =>
  navigation.push('Album', params),
)

export const navigateAlbumCreate = (navigation, params) => defaultThrottle(() =>
  navigation.navigate('AlbumCreate', params),
)

export const navigateAlbumEdit = (navigation, params) => defaultThrottle(() =>
  navigation.navigate('AlbumEdit', params),
)

export const navigateAlbums = (navigation, params) => defaultThrottle(() =>
  navigation.navigate('Albums', params),
)

export const navigateComments = (navigation, params) => defaultThrottle(() =>
  navigation.push('Comments', params),
)

export const navigatePostType = (navigation, params) => defaultThrottle(() =>
  navigation.navigate('PostType', params),
)

export const navigateProfile = (navigation, params) => defaultThrottle(() =>
  navigation.push('Profile', params),
)

export const navigateProfileSelf = (navigation, params) => defaultThrottle(() =>
  navigation.push('ProfileSelf', params),
)

export const navigateProfileFollower = (navigation, params) => defaultThrottle(() =>
  navigation.push('ProfileFollower', params),
)

export const navigateProfileFollowed = (navigation, params) => defaultThrottle(() =>
  navigation.push('ProfileFollowed', params),
)

export const navigatePostMedia = (navigation, params) => defaultThrottle(() =>
  navigation.push('PostMedia', params),
)

export const navigatePostLikes = (navigation, params) => defaultThrottle(() =>
  navigation.push('PostLikes', params),
)

export const navigatePostViews = (navigation, params) => defaultThrottle(() =>
  navigation.push('PostViews', params),
)

export const navigateSettings = (navigation, params) => defaultThrottle(() =>
  navigation.navigate('Settings', params),
)

export const navigatePayout = (navigation, params) => defaultThrottle(() =>
  navigation.navigate('Payout', params),
)

export const navigateVerification = (navigation, params) => defaultThrottle(() =>
  navigation.navigate('Verification', params),
)


/**
 * 
 */
export const navigateAuthHome = (navigation, params) => () =>
  navigation.navigate('AuthHome', params)

export const navigateAuthUsername = (navigation, params) => () =>
  navigation.navigate('AuthUsername', params)

export const navigateAuthSigninPhone = (navigation, params) => () =>
  navigation.navigate('AuthSigninPhone', params)

export const navigateAuthSigninEmail = (navigation) => () =>
  navigation.navigate('Signin', { initialRouteName: 'AuthSigninEmail' })

export const navigateSignup = (navigation, params) => () =>
  navigation.navigate('Signup', params)

export const navigateSignin = (navigation, params) => () =>
  navigation.navigate('Signin', params)

export const navigateAuthPhone = (navigation, params) => () =>
  navigation.navigate('Signup', {
    screen: 'AuthPhone',
    params,
  })

export const navigateAuthEmail = (navigation, params) => () =>
  navigation.navigate('Signup', {
    screen: 'AuthEmail',
    params,
  })

export const navigateAuthPhoneConfirm = (navigation, params) => () =>
  navigation.navigate('AuthPhoneConfirm', params)

export const navigateAuthPassword = (navigation, params) => () =>
  navigation.navigate('AuthPassword', params)

export const navigateAuthEmailConfirm = (navigation, params) => () =>
  navigation.navigate('AuthEmailConfirm', params)

export const navigateForgot = (navigation, params) => () =>
  navigation.navigate('Forgot', params)

export const navigateAuthForgotEmail = (navigation) => () =>
  navigation.navigate('Forgot', { initialRouteName: 'AuthForgotEmail' })

export const navigateAuthForgotPhone = (navigation, params) => () =>
  navigation.navigate('AuthForgotPhone', params)

export const navigateAuthForgotConfirm = (navigation, params) => () =>
  navigation.navigate('AuthForgotConfirm', params)

export const navigateAuthCamera = (navigation, params) => () =>
  navigation.navigate('AuthCamera', params)

/**
 *
 */
export const navigateAuthSignup = (navigation, params) => () =>
  navigation.navigate('AuthSignup', params)

export const navigateAuthSignupConfirm = (navigation, params) => () =>
  navigation.navigate('AuthSignupConfirm', params)
