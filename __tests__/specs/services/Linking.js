import * as LinkingService from 'services/Linking'

test('deeplinkPath determines provided post params', () => {
  /**
   * Chats
   */
  const chatsUrl = 'https://real.app/chat/'
  expect(LinkingService.deeplinkPath(chatsUrl)).toMatchObject({
    action: 'chats',
  })

  /**
   * Root post without action
   */
  const rootUrl =
    'https://real.app/user/us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce/post/1bb30c92-ff1d-4d38-98b7-73942557dfbd'
  expect(LinkingService.deeplinkPath(rootUrl)).toMatchObject({
    _: 'https://real.app',
    userId: 'us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce',
    postId: '1bb30c92-ff1d-4d38-98b7-73942557dfbd',
  })

  const rootUrlSlashed =
    'https://real.app/user/us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce/post/1bb30c92-ff1d-4d38-98b7-73942557dfbd/'
  expect(LinkingService.deeplinkPath(rootUrlSlashed)).toMatchObject({
    _: 'https://real.app',
    userId: 'us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce',
    postId: '1bb30c92-ff1d-4d38-98b7-73942557dfbd',
  })

  /**
   * Views action path
   */
  const viewsUrl =
    'https://real.app/user/us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce/post/1bb30c92-ff1d-4d38-98b7-73942557dfbd/views'
  expect(LinkingService.deeplinkPath(viewsUrl)).toMatchObject({
    _: 'https://real.app',
    userId: 'us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce',
    postId: '1bb30c92-ff1d-4d38-98b7-73942557dfbd',
    action: 'views',
  })

  /**
   * Likes action path
   */
  const likesUrl =
    'https://real.app/user/us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce/post/1bb30c92-ff1d-4d38-98b7-73942557dfbd/likes'
  expect(LinkingService.deeplinkPath(likesUrl)).toMatchObject({
    _: 'https://real.app',
    userId: 'us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce',
    postId: '1bb30c92-ff1d-4d38-98b7-73942557dfbd',
    action: 'likes',
  })

  /**
   * Comments action path
   */
  const commentsUrl =
    'https://real.app/user/us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce/post/1bb30c92-ff1d-4d38-98b7-73942557dfbd/comments'
  expect(LinkingService.deeplinkPath(commentsUrl)).toMatchObject({
    _: 'https://real.app',
    userId: 'us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce',
    postId: '1bb30c92-ff1d-4d38-98b7-73942557dfbd',
    action: 'comments',
  })

  const commentsUrlSlashed =
    'https://real.app/user/us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce/post/1bb30c92-ff1d-4d38-98b7-73942557dfbd/comments/'
  expect(LinkingService.deeplinkPath(commentsUrlSlashed)).toMatchObject({
    _: 'https://real.app',
    userId: 'us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce',
    postId: '1bb30c92-ff1d-4d38-98b7-73942557dfbd',
    action: 'comments',
  })

  const commentsUrlAction =
    'https://real.app/user/us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce/post/1bb30c92-ff1d-4d38-98b7-73942557dfbd/comments/3fb30c92-ffgg-4d53-98b7-73957dfs425'
  expect(LinkingService.deeplinkPath(commentsUrlAction)).toMatchObject({
    _: 'https://real.app',
    userId: 'us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce',
    postId: '1bb30c92-ff1d-4d38-98b7-73942557dfbd',
    action: 'comments',
    actionId: '3fb30c92-ffgg-4d53-98b7-73957dfs425',
  })

  /**
   * Failing url
   */
  const appUrl = 'https://real.app/'
  expect(() => LinkingService.deeplinkPath(appUrl)).toThrow(/Missing userId or postId parameters for post endpoint/)

  const missingUserUrl = 'https://real.app/user/us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce'
  expect(() => LinkingService.deeplinkPath(missingUserUrl)).toThrow(
    /Missing userId or postId parameters for post endpoint/,
  )
})

describe('deeplinkNavigation redirect routes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const navigation = {
    navigate: jest.fn().mockName('mockedNavigate'),
    push: jest.fn().mockName('mockedPush'),
  }
  const actions = {
    navigateChat: jest.fn().mockName('mockedNavigateChat'),
    navigateNestedComments: jest.fn().mockName('mockedNavigateNestedComments'),
    navigateNestedPostViews: jest.fn().mockName('mockedNavigateNestedPostViews'),
    navigateNestedPostLikes: jest.fn().mockName('mockedNavigateNestedPostLikes'),
    navigateNestedPost: jest.fn().mockName('mockedNavigateNestedPost'),
  }
  const Linking = {
    openURL: jest.fn().mockName('mockedOpenUrl'),
  }

  test('chats', () => {
    const rootUrl = 'https://real.app/chat/'
    LinkingService.deeplinkNavigation(navigation, actions, Linking)(rootUrl)
    expect(actions.navigateChat).toHaveBeenLastCalledWith(navigation)
  })

  test('post', () => {
    const rootUrl =
      'https://real.app/user/us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce/post/1bb30c92-ff1d-4d38-98b7-73942557dfbd'
    LinkingService.deeplinkNavigation(navigation, actions, Linking)(rootUrl)
    expect(actions.navigateNestedPost).toHaveBeenLastCalledWith(navigation, {
      _: 'https://real.app',
      userId: 'us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce',
      postId: '1bb30c92-ff1d-4d38-98b7-73942557dfbd',
    })
  })

  test('comments', () => {
    const rootUrl =
      'https://real.app/user/us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce/post/1bb30c92-ff1d-4d38-98b7-73942557dfbd/comments'
    LinkingService.deeplinkNavigation(navigation, actions, Linking)(rootUrl)
    expect(actions.navigateNestedComments).toHaveBeenLastCalledWith(navigation, {
      _: 'https://real.app',
      userId: 'us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce',
      postId: '1bb30c92-ff1d-4d38-98b7-73942557dfbd',
      action: 'comments',
    })
  })

  test('comments with commentId', () => {
    const rootUrl =
      'https://real.app/user/us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce/post/1bb30c92-ff1d-4d38-98b7-73942557dfbd/comments/3fb30c92-ffgg-4d53-98b7-73957dfs425'
    LinkingService.deeplinkNavigation(navigation, actions, Linking)(rootUrl)
    expect(actions.navigateNestedComments).toHaveBeenLastCalledWith(navigation, {
      _: 'https://real.app',
      userId: 'us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce',
      postId: '1bb30c92-ff1d-4d38-98b7-73942557dfbd',
      action: 'comments',
      actionId: '3fb30c92-ffgg-4d53-98b7-73957dfs425',
    })
  })

  test('likes', () => {
    const rootUrl =
      'https://real.app/user/us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce/post/1bb30c92-ff1d-4d38-98b7-73942557dfbd/likes'
    LinkingService.deeplinkNavigation(navigation, actions, Linking)(rootUrl)
    expect(actions.navigateNestedPostLikes).toHaveBeenLastCalledWith(navigation, {
      _: 'https://real.app',
      userId: 'us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce',
      postId: '1bb30c92-ff1d-4d38-98b7-73942557dfbd',
      action: 'likes',
    })
  })

  test('views', () => {
    const rootUrl =
      'https://real.app/user/us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce/post/1bb30c92-ff1d-4d38-98b7-73942557dfbd/views'
    LinkingService.deeplinkNavigation(navigation, actions, Linking)(rootUrl)
    expect(actions.navigateNestedPostViews).toHaveBeenLastCalledWith(navigation, {
      _: 'https://real.app',
      userId: 'us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce',
      postId: '1bb30c92-ff1d-4d38-98b7-73942557dfbd',
      action: 'views',
    })
  })

  test('open url', () => {
    const rootUrl = 'https://google.com'
    LinkingService.deeplinkNavigation(navigation, actions, Linking)(rootUrl)
    expect(Linking.openURL).toHaveBeenLastCalledWith(rootUrl)
  })
})
