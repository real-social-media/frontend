import { postShareVisibility } from 'services/Privacy'

describe('Privacy service', () => {
  describe('postShareVisibility', () => {
    const username = 'username'
    const user = { username }

    it('Post and post owner has enabled shares', () => {
      const postedBy = { sharingDisabled: false }
      const post = { sharingDisabled: false, textTaggedUsers: [], postedBy }

      expect(postShareVisibility(post, user)).toBeTruthy()
    })

    it('Post has disabled shares', () => {
      const postedBy = { sharingDisabled: false }
      const post = { sharingDisabled: true, textTaggedUsers: [], postedBy }

      expect(postShareVisibility(post, user)).toBeFalsy()
    })

    it('Post owner has disabled shares', () => {
      const postedBy = { sharingDisabled: true }
      const post = { sharingDisabled: false, textTaggedUsers: [], postedBy }

      expect(postShareVisibility(post, user)).toBeFalsy()
    })

    it('User was tagged in a post', () => {
      const postedBy = { sharingDisabled: true }
      const textTaggedUsers = [{ tag: `@${username}` }]
      const post = { sharingDisabled: true, textTaggedUsers, postedBy }

      expect(postShareVisibility(post, user)).toBeTruthy()
    })
  })
})
