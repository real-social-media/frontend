export const setUserAPNSToken = `
  mutation setUserAPNSToken($token: String!) {
    setUserAPNSToken(token: $token) {
      userId
    }
  }
`
