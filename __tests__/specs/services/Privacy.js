import Privacy from 'services/Privacy'

const falsyValues = [false, null, undefined, '', 0]

describe('Privacy service', () => {
  describe('postShareVisibility', () => {
    const username = 'username'
    const user = { username, userId: 11 }

    it('enabled on post and post owner level', () => {
      falsyValues.forEach((sharingDisabled) => {
        const postedBy = { sharingDisabled }
        const post = { sharingDisabled, textTaggedUsers: [], postedBy }

        expect(Privacy.postShareVisibility(post, user)).toBe(true)
      })
    })

    it('disabled on post level', () => {
      const post = { sharingDisabled: true, textTaggedUsers: [] }

      expect(Privacy.postShareVisibility(post, user)).toBe(false)
    })

    it('disabled in user mental health settings', () => {
      falsyValues.forEach((sharingDisabled) => {
        const post = { sharingDisabled, textTaggedUsers: [] }

        expect(Privacy.postShareVisibility(post, { ...user, sharingDisabled: true })).toBe(false)
      })
    })

    it('enable when user was tagged in a post', () => {
      const textTaggedUsers = [{ tag: `@${username}` }]
      const post = { sharingDisabled: true, textTaggedUsers }

      expect(Privacy.postShareVisibility(post, user)).toBe(true)
    })

    it('disabled for archived post', () => {
      falsyValues.forEach((sharingDisabled) => {
        const post = { sharingDisabled, textTaggedUsers: [], postStatus: 'ARCHIVED' }

        expect(Privacy.postShareVisibility(post, user)).toBe(false)
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
      expect(Privacy.userFollowerVisibility({ ...user, followedsCount: 0 })).toBeTruthy()
      expect(Privacy.userFollowerVisibility({ ...user, followedsCount: 1 })).toBeTruthy()

      expect(Privacy.userFollowerVisibility({ ...user, followedsCount: null })).toBeFalsy()
      expect(Privacy.userFollowerVisibility({ ...user, followedsCount: undefined })).toBeFalsy()
      expect(Privacy.userFollowerVisibility({ ...user, followedsCount: '' })).toBeFalsy()
    })

    it('private account', () => {
      const privateAccount = { ...user, privacyStatus: 'PRIVATE' }

      expect(Privacy.userFollowerVisibility({ ...privateAccount, followedStatus: 'FOLLOWING' })).toBeTruthy()
      expect(Privacy.userFollowerVisibility({ ...privateAccount, followedStatus: 'SELF' })).toBeTruthy()

      expect(Privacy.userFollowerVisibility({ ...privateAccount, followedStatus: 'NOT_FOLLOWING' })).toBeFalsy()
      expect(Privacy.userFollowerVisibility({ ...privateAccount, followedStatus: 'REQUESTED' })).toBeFalsy()
      expect(Privacy.userFollowerVisibility({ ...privateAccount, followedStatus: 'DENIED' })).toBeFalsy()
    })

    it('public account', () => {
      const publicAccount = { ...user, privacyStatus: 'PUBLIC' }

      expect(Privacy.userFollowerVisibility({ ...publicAccount, followedStatus: 'NOT_FOLLOWING' })).toBeTruthy()
      expect(Privacy.userFollowerVisibility({ ...publicAccount, followedStatus: 'FOLLOWING' })).toBeTruthy()
      expect(Privacy.userFollowerVisibility({ ...publicAccount, followedStatus: 'SELF' })).toBeTruthy()
      expect(Privacy.userFollowerVisibility({ ...publicAccount, followedStatus: 'REQUESTED' })).toBeTruthy()
      expect(Privacy.userFollowerVisibility({ ...publicAccount, followedStatus: 'DENIED' })).toBeTruthy()
    })

    it('followCountsHidden settings', () => {
      const hidden = { ...user, followCountsHidden: true }
      const visible = { ...user, followCountsHidden: false }

      expect(Privacy.userFollowerVisibility({ ...hidden, followedStatus: 'SELF' })).toBeTruthy()

      expect(Privacy.userFollowerVisibility({ ...hidden, followedStatus: 'NOT_FOLLOWING' })).toBeFalsy()
      expect(Privacy.userFollowerVisibility({ ...hidden, followedStatus: 'FOLLOWING' })).toBeFalsy()
      expect(Privacy.userFollowerVisibility({ ...hidden, followedStatus: 'REQUESTED' })).toBeFalsy()
      expect(Privacy.userFollowerVisibility({ ...hidden, followedStatus: 'DENIED' })).toBeFalsy()

      expect(Privacy.userFollowerVisibility({ ...visible, followedStatus: 'NOT_FOLLOWING' })).toBeTruthy()
      expect(Privacy.userFollowerVisibility({ ...visible, followedStatus: 'FOLLOWING' })).toBeTruthy()
      expect(Privacy.userFollowerVisibility({ ...visible, followedStatus: 'SELF' })).toBeTruthy()
      expect(Privacy.userFollowerVisibility({ ...visible, followedStatus: 'REQUESTED' })).toBeTruthy()
      expect(Privacy.userFollowerVisibility({ ...visible, followedStatus: 'DENIED' })).toBeTruthy()
    })
  })

  describe('userFollowingVisibility', () => {
    const user = {
      followersCount: 1,
      followCountsHidden: false,
      followedStatus: 'SELF',
      privacyStatus: 'PUBLIC',
    }

    it('followersCount should be a number', () => {
      expect(Privacy.userFollowingVisibility({ ...user, followersCount: 0 })).toBeTruthy()
      expect(Privacy.userFollowingVisibility({ ...user, followersCount: 1 })).toBeTruthy()

      expect(Privacy.userFollowingVisibility({ ...user, followersCount: null })).toBeFalsy()
      expect(Privacy.userFollowingVisibility({ ...user, followersCount: undefined })).toBeFalsy()
      expect(Privacy.userFollowingVisibility({ ...user, followersCount: '' })).toBeFalsy()
    })

    it('private account', () => {
      const privateAccount = { ...user, privacyStatus: 'PRIVATE' }

      expect(Privacy.userFollowingVisibility({ ...privateAccount, followedStatus: 'FOLLOWING' })).toBeTruthy()
      expect(Privacy.userFollowingVisibility({ ...privateAccount, followedStatus: 'SELF' })).toBeTruthy()

      expect(Privacy.userFollowingVisibility({ ...privateAccount, followedStatus: 'NOT_FOLLOWING' })).toBeFalsy()
      expect(Privacy.userFollowingVisibility({ ...privateAccount, followedStatus: 'REQUESTED' })).toBeFalsy()
      expect(Privacy.userFollowingVisibility({ ...privateAccount, followedStatus: 'DENIED' })).toBeFalsy()
    })

    it('public account', () => {
      const publicAccount = { ...user, privacyStatus: 'PUBLIC' }

      expect(Privacy.userFollowingVisibility({ ...publicAccount, followedStatus: 'NOT_FOLLOWING' })).toBeTruthy()
      expect(Privacy.userFollowingVisibility({ ...publicAccount, followedStatus: 'FOLLOWING' })).toBeTruthy()
      expect(Privacy.userFollowingVisibility({ ...publicAccount, followedStatus: 'SELF' })).toBeTruthy()
      expect(Privacy.userFollowingVisibility({ ...publicAccount, followedStatus: 'REQUESTED' })).toBeTruthy()
      expect(Privacy.userFollowingVisibility({ ...publicAccount, followedStatus: 'DENIED' })).toBeTruthy()
    })

    it('followCountsHidden settings', () => {
      const hidden = { ...user, followCountsHidden: true }
      const visible = { ...user, followCountsHidden: false }

      expect(Privacy.userFollowingVisibility({ ...hidden, followedStatus: 'SELF' })).toBeTruthy()

      expect(Privacy.userFollowingVisibility({ ...hidden, followedStatus: 'NOT_FOLLOWING' })).toBeFalsy()
      expect(Privacy.userFollowingVisibility({ ...hidden, followedStatus: 'FOLLOWING' })).toBeFalsy()
      expect(Privacy.userFollowingVisibility({ ...hidden, followedStatus: 'REQUESTED' })).toBeFalsy()
      expect(Privacy.userFollowingVisibility({ ...hidden, followedStatus: 'DENIED' })).toBeFalsy()

      expect(Privacy.userFollowingVisibility({ ...visible, followedStatus: 'NOT_FOLLOWING' })).toBeTruthy()
      expect(Privacy.userFollowingVisibility({ ...visible, followedStatus: 'FOLLOWING' })).toBeTruthy()
      expect(Privacy.userFollowingVisibility({ ...visible, followedStatus: 'SELF' })).toBeTruthy()
      expect(Privacy.userFollowingVisibility({ ...visible, followedStatus: 'REQUESTED' })).toBeTruthy()
      expect(Privacy.userFollowingVisibility({ ...visible, followedStatus: 'DENIED' })).toBeTruthy()
    })
  })

  describe('postLikeVisibility', () => {
    const user = {}

    it('enabled on post, user and post owner level', () => {
      falsyValues.forEach((likesDisabled) => {
        const post = { likesDisabled, postedBy: { likesDisabled } }

        expect(Privacy.postLikeVisibility(post, { ...user, likesDisabled })).toBe(true)
      })
    })

    it('disabled on post level', () => {
      const post = { likesDisabled: true }

      expect(Privacy.postLikeVisibility(post, user)).toBe(false)
    })

    it('disabled in a user mental health settings', () => {
      falsyValues.forEach((likesDisabled) => {
        const post = { likesDisabled }

        expect(Privacy.postLikeVisibility(post, { ...user, likesDisabled: true })).toBe(false)
      })
    })
  })

  describe('postCommentVisibility', () => {
    const user = {}

    it('enabled on post, user and post owner level', () => {
      falsyValues.forEach((commentsDisabled) => {
        const post = { commentsDisabled, postedBy: { commentsDisabled } }

        expect(Privacy.postCommentVisibility(post, { ...user, commentsDisabled })).toBe(true)
      })
    })

    it('disabled on post level', () => {
      const post = { commentsDisabled: true }

      expect(Privacy.postCommentVisibility(post, user)).toBe(false)
    })

    it('disabled in a user mental health settings', () => {
      falsyValues.forEach((commentsDisabled) => {
        const post = { commentsDisabled }

        expect(Privacy.postCommentVisibility(post, { ...user, commentsDisabled: true })).toBe(false)
      })
    })
  })

  describe('postSeenByVisility', () => {
    const userId = 1

    it('disable for not owner', () => {
      const user = { userId: 1 }
      const post = { postedBy: { userId: 2 }, viewedByCount: 1 }

      expect(user.userId).not.toBe(post.postedBy.userId)
      expect(Privacy.postSeenByVisility(post, user)).toBe(false)
    })

    it('enabled for post owner', () => {
      falsyValues.forEach((viewCountsHidden) => {
        const user = { userId, viewCountsHidden }
        const post = { postedBy: { userId, viewCountsHidden }, viewedByCount: 1 }

        expect(Privacy.postSeenByVisility(post, user)).toBe(true)
      })
    })

    it('disabled when viewedByCount is 0', () => {
      falsyValues.forEach((viewCountsHidden) => {
        const user = { userId, viewCountsHidden }
        const post = { postedBy: { userId, viewCountsHidden }, viewedByCount: 0 }

        expect(Privacy.postSeenByVisility(post, user)).toBe(false)
      })
    })

    it('disabled in user mental health settings', () => {
      const user = { userId, viewCountsHidden: true }
      const post = { postedBy: { userId }, viewedByCount: 1 }

      expect(Privacy.postSeenByVisility(post, user)).toBe(false)
    })
  })

  describe('postRepostVisiblity', () => {
    it('disabled for post owner', () => {
      const username = 'username'
      const post = { originalPost: { postedBy: { username } }, postedBy: { username } }

      expect(Privacy.postRepostVisiblity(post)).toBe(false)
    })

    it('disabled when username empty', () => {
      const post = { originalPost: { postedBy: { username: '' } }, postedBy: { username: 'username' } }

      expect(Privacy.postRepostVisiblity(post)).toBe(false)
    })

    it('enabled for not post owner', () => {
      const post = { originalPost: { postedBy: { username: '1' } }, postedBy: { username: '2' } }

      expect(Privacy.postRepostVisiblity(post)).toBe(true)
    })
  })

  describe('postVerificationVisibility', () => {
    let Privacy

    const post = { isVerified: false }

    beforeAll(() => {
      jest.isolateModules(() => {
        Privacy = require('services/Privacy').default
        jest.spyOn(Privacy, 'postRepostVisiblity').mockReturnValue(false)
      })
    })

    afterAll(() => {
      Privacy.postRepostVisiblity.mockRestore()
    })

    it('enable when postRepostVisiblity return false', () => {
      expect(Privacy.postVerificationVisibility(post)).toBe(true)
    })

    it('disabled when postRepostVisiblity return true', () => {
      Privacy.postRepostVisiblity.mockReturnValueOnce(true)
      expect(Privacy.postVerificationVisibility(post)).toBe(false)
    })

    it('enabled for not verified post', () => {
      expect(Privacy.postVerificationVisibility({ ...post, isVerified: false })).toBe(true)
    })

    it('disabled for verified post', () => {
      expect(Privacy.postVerificationVisibility({ ...post, isVerified: true })).toBe(false)
    })

    it('disabled for text type post', () => {
      expect(Privacy.postVerificationVisibility({ ...post, postType: 'TEXT_ONLY' })).toBe(false)
    })
  })

  describe('selfPostVerificationVisibility', () => {
    let Privacy

    const user = { userId: 1 }
    const post = { postedBy: user }

    beforeAll(() => {
      jest.isolateModules(() => {
        Privacy = require('services/Privacy').default
        jest.spyOn(Privacy, 'postVerificationVisibility').mockReturnValue(true)
      })
    })

    afterAll(() => {
      Privacy.postVerificationVisibility.mockRestore()
    })

    it('disabled when postVerificationVisibility return false', () => {
      Privacy.postVerificationVisibility.mockReturnValueOnce(false)
      expect(Privacy.selfPostVerificationVisibility(post, user)).toBe(false)
    })

    it('enabled when postVerificationVisibility return true', () => {
      Privacy.postVerificationVisibility.mockReturnValueOnce(true)
      expect(Privacy.selfPostVerificationVisibility(post, user)).toBe(true)
    })

    it('disabled for nor post owner', () => {
      expect(Privacy.selfPostVerificationVisibility(post, { userId: 2 })).toBe(false)
    })

    it('enabled for post owner', () => {
      expect(Privacy.selfPostVerificationVisibility(post, user)).toBe(true)
    })
  })

  describe('postLikedVisibility', () => {
    const user = { userId: 1 }
    const post = {
      likesDisabled: false,
      postedBy: { ...user, likesDisabled: false },
      onymouslyLikedBy: { items: [{ username: 'username' }] },
    }

    it('disabled when onymouslyLikedBy empty', () => {
      expect(Privacy.postLikedVisibility({ ...post, onymouslyLikedBy: { items: [] } }, user)).toBe(false)
    })

    it('disabled on post level', () => {
      expect(Privacy.postLikedVisibility({ ...post, likesDisabled: true }, user)).toBe(false)
    })

    it('disabled for not post owner', () => {
      expect(Privacy.postLikedVisibility(post, { userId: 2 })).toBe(false)
    })

    it('enabled for post owner', () => {
      expect(Privacy.postLikedVisibility(post, user)).toBe(true)
    })
  })

  describe('postExpiryVisiblity', () => {
    let Privacy

    const post = { expiresAt: '2020-09-10T14:51:19.393Z' }

    beforeAll(() => {
      jest.isolateModules(() => {
        Privacy = require('services/Privacy').default
        jest.spyOn(Privacy, 'postVerificationVisibility').mockReturnValue(false)
      })
    })

    afterAll(() => {
      Privacy.postVerificationVisibility.mockRestore()
    })

    it('enabled when postVerificationVisibility false', () => {
      expect(Privacy.postExpiryVisiblity(post)).toBe(true)

      Privacy.postVerificationVisibility.mockReturnValueOnce(true)
      expect(Privacy.postExpiryVisiblity(post)).toBe(false)
    })

    it('enabled when expiresAt exists', () => {
      expect(Privacy.postExpiryVisiblity(post)).toBe(true)
      expect(Privacy.postExpiryVisiblity({ expiresAt: undefined })).toBe(false)
    })
  })
})
