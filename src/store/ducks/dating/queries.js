import * as usersList from 'store/ducks/users/queries/list'
import * as postsGrid from 'store/ducks/posts/queries/grid'

export const matchedUsers = `
  query MatchedUsers($matchStatus: MatchStatus!) {
    self {
      matchedUsers(matchStatus: $matchStatus) {
        items {
          bio
          dateOfBirth
          posts(limit: 10) {
            items(isVerified: true) {
              ...gridPostFragment
            }
            nextToken
          }
          ...listUserFragment
        }
        nextToken
      }
    }
  }

  ${usersList.listUserFragment}
  ${postsGrid.gridPostFragment}
`

export const rejectMatch = `
  mutation rejectMatch($userId: ID!) {
    rejectMatch (userId: $userId)
  }
`

export const approveMatch = `
  mutation approveMatch($userId: ID!) {
    approveMatch (userId: $userId)
  }
`
