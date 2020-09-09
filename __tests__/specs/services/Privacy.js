import { postShareVisibility, userFollowerVisibility } from 'services/Privacy'

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

  describe('userFollowerVisibility', () => {
    const user = {
      followedsCount: 1,
      followCountsHidden: false,
      followedStatus: 'SELF',
      privacyStatus: 'PUBLIC',
    }

    it('followedsCount should be a number', () => {
      expect(userFollowerVisibility({ ...user, followedsCount: 0 })).toBeTruthy()
      expect(userFollowerVisibility({ ...user, followedsCount: 1 })).toBeTruthy()

      expect(userFollowerVisibility({ ...user, followedsCount: null })).toBeFalsy()
      expect(userFollowerVisibility({ ...user, followedsCount: undefined })).toBeFalsy()
      expect(userFollowerVisibility({ ...user, followedsCount: '' })).toBeFalsy()
    })

    it('private account', () => {
      const privateAccount = { ...user, privacyStatus: 'PRIVATE' }

      expect(userFollowerVisibility({ ...privateAccount, followedStatus: 'FOLLOWING' })).toBeTruthy()
      expect(userFollowerVisibility({ ...privateAccount, followedStatus: 'SELF' })).toBeTruthy()

      expect(userFollowerVisibility({ ...privateAccount, followedStatus: 'NOT_FOLLOWING' })).toBeFalsy()
      expect(userFollowerVisibility({ ...privateAccount, followedStatus: 'REQUESTED' })).toBeFalsy()
      expect(userFollowerVisibility({ ...privateAccount, followedStatus: 'DENIED' })).toBeFalsy()
    })

    it('public account', () => {
      const publicAccount = { ...user, privacyStatus: 'PUBLIC' }

      expect(userFollowerVisibility({ ...publicAccount, followedStatus: 'NOT_FOLLOWING' })).toBeTruthy()
      expect(userFollowerVisibility({ ...publicAccount, followedStatus: 'FOLLOWING' })).toBeTruthy()
      expect(userFollowerVisibility({ ...publicAccount, followedStatus: 'SELF' })).toBeTruthy()
      expect(userFollowerVisibility({ ...publicAccount, followedStatus: 'REQUESTED' })).toBeTruthy()
      expect(userFollowerVisibility({ ...publicAccount, followedStatus: 'DENIED' })).toBeTruthy()
    })

    it('followCountsHidden settings', () => {
      const hidden = { ...user, followCountsHidden: true }
      const visible = { ...user, followCountsHidden: false }

      expect(userFollowerVisibility({ ...hidden, followedStatus: 'SELF' })).toBeTruthy()

      expect(userFollowerVisibility({ ...hidden, followedStatus: 'NOT_FOLLOWING' })).toBeFalsy()
      expect(userFollowerVisibility({ ...hidden, followedStatus: 'FOLLOWING' })).toBeFalsy()
      expect(userFollowerVisibility({ ...hidden, followedStatus: 'REQUESTED' })).toBeFalsy()
      expect(userFollowerVisibility({ ...hidden, followedStatus: 'DENIED' })).toBeFalsy()

      expect(userFollowerVisibility({ ...visible, followedStatus: 'NOT_FOLLOWING' })).toBeTruthy()
      expect(userFollowerVisibility({ ...visible, followedStatus: 'FOLLOWING' })).toBeTruthy()
      expect(userFollowerVisibility({ ...visible, followedStatus: 'SELF' })).toBeTruthy()
      expect(userFollowerVisibility({ ...visible, followedStatus: 'REQUESTED' })).toBeTruthy()
      expect(userFollowerVisibility({ ...visible, followedStatus: 'DENIED' })).toBeTruthy()
    })
  })
})
