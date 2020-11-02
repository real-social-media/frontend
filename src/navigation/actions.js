import { navigateToPath, pushToPath } from 'navigation/helpers'

const withAuthValidation = (callback) => {
  return (navigation, params = {}, meta = {}) => {
    return () => {
      if (!meta.protected) {
        return callback(navigation, params)
      }

      if (meta.user && meta.user.userStatus === 'ACTIVE') {
        return callback(navigation, params)
      }

      return navigateProfileUpgrade(navigation)
    }
  }
}

/**
 * Common
 */
export const navigateProfile = pushToPath('Profile')
export const navigatePostMedia = pushToPath('PostMedia')
export const navigateProfileFollowed = pushToPath('ProfileFollowed')
export const navigateProfileFollower = pushToPath('ProfileFollower')
export const navigatePostViews = pushToPath('PostViews')
export const navigatePostLikes = pushToPath('PostLikes')
export const navigatePostShare = pushToPath('PostShare')
export const navigatePostCreate = navigateToPath('PostCreate')
export const navigateAlbum = pushToPath('Album')
export const navigateAlbums = navigateToPath('Albums')
export const navigateAlbumCreate = navigateToPath('AlbumCreate')
export const navigateAlbumEdit = navigateToPath('AlbumEdit')
export const navigatePostEdit = navigateToPath('PostEdit')

/**
 * Nested Routes
 */
export const navigateNestedPost = navigateToPath('App.Root.PostMedia')
export const navigateNestedPostViews = navigateToPath('App.Root.PostViews')
export const navigateNestedComments = navigateToPath('App.Root.Comments')
export const navigateNestedPostLikes = navigateToPath('App.Root.PostLikes')

/**
 * Chat
 */
export const navigateChat = withAuthValidation(navigateToPath('App.Chat'))
export const navigateChatDirect = withAuthValidation(navigateToPath('App.Chat.ChatDirect'))
export const navigateChatOptions = withAuthValidation(navigateToPath('App.Chat.ChatOptions'))
export const navigateProfileRequests = navigateToPath('App.Chat.ProfileRequests')
 
/**
 * Dating
 */
export const navigateDating = withAuthValidation(navigateToPath('Dating'))
export const navigateDatingAbout = withAuthValidation(navigateToPath('DatingAbout'))
export const navigateDatingMatch = withAuthValidation(navigateToPath('DatingMatch'))
export const navigateDatingProfile = withAuthValidation(navigateToPath('DatingProfile'))

/**
 * Profile
 */
export const navigateProfileSelf = withAuthValidation(navigateToPath('App.Root.Home.Profile'))
export const navigateSettings = withAuthValidation(navigateToPath('App.Root.Home.Profile.Settings'))
export const navigateProfilePhotoUpload = withAuthValidation(navigateToPath('App.Root.Home.Profile.ProfilePhotoUpload'))
export const navigateProfilePhoto = navigateToPath('App.Root.Home.Profile.ProfilePhoto')
export const navigateProfilePhotoGrid = navigateToPath('App.Root.Home.Profile.ProfilePhotoGrid')
export const navigateProfileEdit = navigateToPath('App.Root.Home.Profile.ProfileEdit')
export const navigateInviteFriends = navigateToPath('App.Root.Home.Profile.InviteFriends')
export const navigateTheme = navigateToPath('App.Root.Home.Profile.Theme')
export const navigatePrivacy = navigateToPath('App.Root.Home.Profile.Privacy')
export const navigateMembership = navigateToPath('App.Root.Home.Profile.Membership')
export const navigateArchived = navigateToPath('App.Root.Home.Profile.Archived')

/**
 * Auth
 */
export const navigateAuthHome = navigateToPath('Auth.AuthHome')
export const navigateAuthUsername = navigateToPath('Auth.AuthUsername')
export const navigateAuthPhoneConfirm = navigateToPath('Auth.AuthPhoneConfirm')
export const navigateAuthPassword = navigateToPath('Auth.AuthPassword')
export const navigateAuthEmailConfirm = navigateToPath('Auth.AuthEmailConfirm')
export const navigateAuthForgotConfirm = navigateToPath('Auth.AuthForgotConfirm')

/**
 * Signin
 */
export const navigateSignin = navigateToPath('Auth.Signin')
export const navigateAuthSigninPhone = navigateToPath('Auth.Signin.AuthSigninPhone')
export const navigateAuthSigninEmail = navigateToPath('Auth.Signin.AuthSigninEmail')

/**
 * Signup
 */
export const navigateSignup = navigateToPath('Auth.Signup')
export const navigateAuthPhone = navigateToPath('Auth.Signup.AuthPhone')
export const navigateAuthEmail = navigateToPath('Auth.Signup.AuthEmail')

/**
 * Forgot
 */
export const navigateForgot = navigateToPath('Auth.Forgot')
export const navigateAuthForgotEmail = navigateToPath('Auth.Forgot.AuthForgotEmail')
export const navigateAuthForgotPhone = navigateToPath('Auth.Forgot.AuthForgotPhone')

/**
 * Root
 */
export const navigateProfileUpgrade = navigateToPath('App.Root.ProfileUpgrade')
export const navigatePostType = withAuthValidation(navigateToPath('PostType'))
export const navigateStory = withAuthValidation(pushToPath('Story'))
export const navigateVerification = withAuthValidation(navigateToPath('Verification'))
export const navigateComments = withAuthValidation(pushToPath('Comments'))

/**
 * Other
 */
export const navigateBack = (navigation) => navigation.goBack()
export const navigateApp = navigateToPath('App')
export const navigateHome = navigateToPath('App.Root.Home.Feed')
export const navigateSearch = navigateToPath('App.Root.Home.Search')
export const navigateCamera = withAuthValidation(navigateToPath('Camera'))
export const navigatePayout = withAuthValidation(navigateToPath('Payout'))