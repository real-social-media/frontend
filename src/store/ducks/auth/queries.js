import * as usersSingle from 'store/ducks/users/queries/single'

export const self = `
  query self {
    self {
      ...singleUserFragment
    }
  }
  ${usersSingle.singleUserFragment}
`
