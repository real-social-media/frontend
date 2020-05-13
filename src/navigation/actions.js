/**
 * Root -> Home -> Feed -> Feed
 */

export const navigateBack = (navigation, params) => () =>
  navigation.goBack()

export const navigatePop = (navigation, params) => () =>
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

export const navigateCamera = (navigation, params) => () =>
  navigation.navigate('Camera', params)

export const navigateSearch = (navigation, params) => () =>
  navigation.navigate('Search', {
    screen: 'Search',
    params,
  })
  
export const navigateStory = (navigation, params) => () =>
  navigation.push('Story', params)

export const navigateChat = (navigation, params) => () =>
  navigation.navigate('Chat', params)

export const navigateChatDirect = (navigation, params) => () =>
  navigation.navigate('ChatDirect', params)

export const navigateVerification = (navigation, params) => () =>
  navigation.navigate('Verification', params)

export const navigatePostShare = (navigation, params) => () =>
  navigation.push('PostShare', params)

export const navigatePostEdit = (navigation, params) => () =>
  navigation.navigate('PostEdit', params)

export const navigateProfileRequests = (navigation, params) => () =>
  navigation.navigate('ProfileRequests', params)

export const navigateAlbum = (navigation, params) => () =>
  navigation.push('Album', params)

export const navigateAlbumCreate = (navigation, params) => () =>
  navigation.navigate('AlbumCreate', params)

  export const navigateAlbumEdit = (navigation, params) => () =>
  navigation.navigate('AlbumEdit', params)

export const navigateAlbums = (navigation, params) => () =>
  navigation.navigate('Albums', params)

export const navigateComments = (navigation, params) => () =>
  navigation.push('Comments', params)

export const navigatePostType = (navigation, params) => () =>
  navigation.navigate('PostType', params)

export const navigateProfile = (navigation, params) => () =>
  navigation.push('Profile', params)

export const navigateProfileSelf = (navigation, params) => () =>
  navigation.push('ProfileSelf', params)

export const navigateProfileFollower = (navigation, params) => () =>
  navigation.push('ProfileFollower', params)

export const navigateProfileFollowed = (navigation, params) => () =>
  navigation.push('ProfileFollowed', params)

export const navigatePostMedia = (navigation, params) => () =>
  navigation.push('PostMedia', params)

export const navigatePostLikes = (navigation, params) => () =>
  navigation.push('PostLikes', params)

export const navigatePostViews = (navigation, params) => () =>
  navigation.push('PostViews', params)

export const navigateSettings = (navigation, params) => () =>
  navigation.navigate('Settings', params)

export const navigatePayout = (navigation, params) => () =>
  navigation.navigate('Payout', params)

/**
 * 
 */
export const navigateAuthHome = (navigation, params) => () =>
  navigation.navigate('AuthHome', params)

export const navigateAuthUsername = (navigation, params) => () =>
  navigation.navigate('AuthUsername', params)

export const navigateAuthSignin = (navigation, params) => () =>
  navigation.navigate('AuthSignin', params)

export const navigateSignup = (navigation, params) => () =>
  navigation.navigate('Signup', params)

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

export const navigateAuthPhoto = (navigation, params) => () =>
  navigation.navigate('AuthPhoto', params)

export const navigateAuthPhotoUpload = (navigation, params) => () =>
  navigation.navigate('AuthPhotoUpload', params)

export const navigateAuthForgot = (navigation, params) => () =>
  navigation.navigate('AuthForgot', params)

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

export const navigateOnboardCamera = (navigation, params) => () =>
  navigation.navigate('OnboardCamera', params)

export const navigateOnboardPhoto = (navigation, params) => () =>
  navigation.navigate('OnboardPhoto', params)