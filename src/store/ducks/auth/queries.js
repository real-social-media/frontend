const authUserFragment = `
  fragment authUserFragment on User {
    userId
    username
    photoUrl
    photoUrl64p
    photoUrl480p
    photoUrl1080p
    photoUrl4k
    privacyStatus
    followedStatus
    followerStatus
    followedCount
    followerCount
    followCountsHidden
    viewCountsHidden
    commentsDisabled
    likesDisabled
    sharingDisabled
    postCount
    fullName
    themeCode
    blockedStatus
    blockerStatus
    bio
    email
    phoneNumber
    languageCode
    signedUpAt
    postViewedByCount
  }
`

export const createCognitoOnlyUser = `
  mutation createCognitoOnlyUser($username: String!, $fullName: String) {
    createCognitoOnlyUser(username: $username, fullName: $fullName) {
      ...authUserFragment
    }
  }
  ${authUserFragment}
`

export const createGoogleUser = `
  mutation createGoogleUser($username: String!, $fullName: String, $googleIdToken: String!) {
    createGoogleUser(username: $username, fullName: $fullName, googleIdToken: $googleIdToken) {
      ...authUserFragment
    }
  }
  ${authUserFragment}
`

export const createFacebookUser = `
  mutation createFacebookUser($username: String!, $fullName: String, $facebookAccessToken: String!) {
    createFacebookUser(username: $username, fullName: $fullName, facebookAccessToken: $facebookAccessToken) {
      ...authUserFragment
    }
  }
  ${authUserFragment}
`

export const setUserAcceptedEULAVersion = `
  mutation SetUserAcceptedEULAVersion($version: String!) {
    setUserAcceptedEULAVersion(version: $version) {
      ...authUserFragment
    }
  }
  ${authUserFragment}
`

export const self = `
  query self {
    self {
      ...authUserFragment
    }
  }
  ${authUserFragment}
`

export const setUserDetails = `
  mutation SetUserDetails($fullName: String, $bio: String) {
    setUserDetails(fullName: $fullName, bio: $bio) {
      ...authUserFragment
    }
  }
  ${authUserFragment}
`
