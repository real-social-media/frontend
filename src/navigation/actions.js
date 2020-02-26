export const navigateHome = (navigation, params) => () =>
  navigation.navigate('App', {
    screen: 'Feed',
    params: {
      screen: 'Feed',
      ...params,
    },
  })

export const navigateChat = (navigation, params) => () =>
  navigation.navigate('Chat')

export const navigateCamera = (navigation, params) => () =>
  navigation.navigate('Camera')

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