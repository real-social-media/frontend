import { postShareVisibility } from 'services/Privacy'

const falsyValues = [false, null, undefined, '', 0]

describe('Privacy service', () => {
  describe('postShareVisibility', () => {
    const username = 'username'
    const user = { username, userId: 11 }

    it('Post and post owner has enabled share', () => {
      falsyValues.forEach((sharingDisabled) => {
        const postedBy = { sharingDisabled }
        const post = { sharingDisabled, textTaggedUsers: [], postedBy }

        expect(postShareVisibility(post, user)).toBe(true)
      })
    })

    it('Post has disabled share', () => {
      falsyValues.forEach((sharingDisabled) => {
        const postedBy = { sharingDisabled }
        const post = { sharingDisabled: true, textTaggedUsers: [], postedBy }

        expect(postShareVisibility(post, user)).toBe(false)
      })
    })

    it('Enable share on a post level for owner', () => {
      falsyValues.forEach((sharingDisabled) => {
        const postedBy = { sharingDisabled: true, userId: user.userId }
        const post = { sharingDisabled, textTaggedUsers: [], postedBy }

        expect(postShareVisibility(post, { ...user, sharingDisabled: true })).toBe(true)
      })
    })

    it('Disable share for not owner if a user has disabled sharing', () => {
      falsyValues.forEach((sharingDisabled) => {
        const postedBy = { sharingDisabled: true, userId: user.userId + 1 }
        const post = { sharingDisabled, textTaggedUsers: [], postedBy }

        expect(postShareVisibility(post, { ...user, sharingDisabled: true })).toBe(false)
      })
    })

    it('User was tagged in a post', () => {
      const postedBy = { sharingDisabled: true }
      const textTaggedUsers = [{ tag: `@${username}` }]
      const post = { sharingDisabled: true, textTaggedUsers, postedBy }

      expect(postShareVisibility(post, user)).toBe(true)
    })

    it('Archived post', () => {
      falsyValues.forEach((sharingDisabled) => {
        const postedBy = { sharingDisabled }
        const post = { sharingDisabled, textTaggedUsers: [], postedBy, postStatus: 'ARCHIVED' }

        expect(postShareVisibility(post, user)).toBe(false)
      })
    })
  })
})
