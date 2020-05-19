import {
  userFragment,
} from 'store/fragments'

export const self = `
  query self {
    self {
      ...userFragment
    }
  }
  ${userFragment}
`
