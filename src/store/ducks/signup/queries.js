import { userFragment } from 'store/fragments'

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
