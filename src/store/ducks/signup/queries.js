import {
  userFragment,
} from 'store/fragments'

export const createCognitoOnlyUser = `
  mutation createCognitoOnlyUser($username: String!, $fullName: String) {
    createCognitoOnlyUser(username: $username, fullName: $fullName) {
      ...userFragment
    }
  }
  ${userFragment}
`

export const createGoogleUser = `
  mutation createGoogleUser($username: String!, $fullName: String, $googleIdToken: String!) {
    createGoogleUser(username: $username, fullName: $fullName, googleIdToken: $googleIdToken) {
      ...userFragment
    }
  }
  ${userFragment}
`

export const createAppleUser = `
  mutation createAppleUser($username: String!, $fullName: String, $appleIdToken: String!) {
    createAppleUser(username: $username, fullName: $fullName, appleIdToken: $appleIdToken) {
      ...userFragment
    }
  }
  ${userFragment}
`

export const setUserAcceptedEULAVersion = `
  mutation SetUserAcceptedEULAVersion($version: String!) {
    setUserAcceptedEULAVersion(version: $version) {
      ...userFragment
    }
  }
  ${userFragment}
`

export const createAnonymousUser = `
  mutation createAnonymousUser {
    createAnonymousUser {
      AccessToken
      ExpiresIn
      TokenType
      RefreshToken
      IdToken
    }
  }
`

export const startChangeUserPhoneNumber = `
  mutation startChangeUserPhoneNumber($phoneNumber: AWSPhone!) {
    startChangeUserPhoneNumber(phoneNumber: $phoneNumber) {
      ...userFragment
    }
  }
  ${userFragment}
`

export const finishChangeUserPhoneNumber = `
  mutation finishChangeUserPhoneNumber($verificationCode: String!) {
    finishChangeUserPhoneNumber(verificationCode: $verificationCode) {
      ...userFragment
    }
  }
  ${userFragment}
`

export const startChangeUserEmail = `
  mutation startChangeUserEmail($email: AWSEmail!) {
    startChangeUserEmail(email: $email) {
      ...userFragment
    }
  }
  ${userFragment}
`

export const finishChangeUserEmail = `
  mutation finishChangeUserEmail($verificationCode: String!) {
    finishChangeUserEmail(verificationCode: $verificationCode) {
      ...userFragment
    }
  }
  ${userFragment}
`

export const setFullname = `
  mutation setFullname($fullName: String) {
    setUserDetails(fullName: $fullName) {
      ...userFragment
    }
  }
  ${userFragment}
`

export const setUsername = `
  mutation setUsername($username: String) {
    setUserDetails(username: $username) {
      ...userFragment
    }
  }
  ${userFragment}
`

export const setUserPassword = `
  mutation setUserPassword($encryptedPassword: String!) {
    setUserPassword(encryptedPassword: $encryptedPassword) {
      ...userFragment
    }
  }
  ${userFragment}
`
