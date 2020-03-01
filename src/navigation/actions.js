export const navigateHome = (navigation, params) => () =>
  navigation.navigate('Tab', {
    screen: 'Feed',
    params: {
      screen: 'Feed',
      params: {
        screen: 'Feed',
          ...params,
      },
    },
  })

export const navigateCamera = (navigation, params) => () =>
  navigation.navigate('Tab', {
    screen: 'Feed',
    params: {
      screen: 'Feed',
      params: {
        screen: 'Camera',
      },
    },
  })

export const navigateChat = (navigation, params) => () =>
  navigation.navigate('Chat')

export const navigatePostCreate = (navigation, params) => () =>
  navigation.navigate('PostCreate', params)

export const navigateVerification = (navigation, params) => () =>
  navigation.navigate('Verification', params)

export const navigatePostShare = (navigation, params) => () =>
  navigation.navigate('PostShare', params)

export const navigatePostEdit = (navigation, params) => () =>
  navigation.navigate('PostEdit', params)

export const navigateProfileRequests = (navigation, params) => () =>
  navigation.navigate('ProfileRequests', params)

export const navigateAlbum = (navigation, params) => () =>
  navigation.navigate('Album', params)

export const navigateComments = (navigation, params) => () =>
  navigation.navigate('Comments', params)

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
