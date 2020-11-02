import { userFragment } from 'store/fragments'
import * as usersSingle from 'store/ducks/users/queries/single'

export const findUsers = `
  query findUsers($emails: [AWSEmail!]!, $phoneNumbers: [AWSPhone!]!) {
    findUsers(emails: $emails, phoneNumbers: $phoneNumbers) {
      items {
        ...userFragment
      }
    }
  }
  ${userFragment}
`

export const findContacts = `
  query findContacts($contacts: [ContactInput!]!) {
    findContacts(contacts: $contacts) {
      contactId
      user {
        userId
        username
        followedStatus
        photo {
          url64p
        }
      }
    }
  }
`

export const grantUserSubscriptionBonus = `
  mutation grantUserSubscriptionBonus {
    grantUserSubscriptionBonus {
      ...singleUserFragment
    }
  }
  ${usersSingle.singleUserFragment}
`
