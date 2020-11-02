/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "testNavigate"] }] */
import { Linking } from 'react-native'
import * as LinkingService from 'services/Linking'
import { testNavigate } from 'tests/utils/helpers'

jest.spyOn(Linking, 'openURL')

const baseUrl = 'https:/real.app'
const userId = 'us-east-1:6b33c0d0-cc30-4083-92a1-043f7cd313ce'
const postId = '1bb30c92-ff1d-4d38-98b7-73942557dfbd'

describe('deeplinkPath determines provided post params', () => {
  it('Chats', () => {
    const chatsUrl = `${baseUrl}/chat/`
    expect(LinkingService.deeplinkPath(chatsUrl)).toMatchObject({
      action: 'chats',
    })
  })

  it('Root post without action', () => {
    const rootUrl = `${baseUrl}/user/${userId}/post/${postId}`
    expect(LinkingService.deeplinkPath(rootUrl)).toMatchObject({ _: baseUrl, userId, postId })

    const rootUrlSlashed = `${rootUrl}/`
    expect(LinkingService.deeplinkPath(rootUrlSlashed)).toMatchObject({ _: baseUrl, userId, postId })
  })

  it('Invite Friends', () => {
    const inviteFriendsUrl = `${baseUrl}/user/${userId}/settings/contacts`
    expect(LinkingService.deeplinkPath(inviteFriendsUrl)).toMatchObject({ _: baseUrl, userId })

    const inviteFriendsUrlSlashed = `${inviteFriendsUrl}/`
    expect(LinkingService.deeplinkPath(inviteFriendsUrlSlashed)).toMatchObject({ _: baseUrl, userId })
  })

  it('Views action path', () => {
    const viewsUrl = `${baseUrl}/user/${userId}/post/${postId}/views`
    expect(LinkingService.deeplinkPath(viewsUrl)).toMatchObject({ _: baseUrl, userId, postId, action: 'views' })
  })

  it('Likes action path', () => {
    const likesUrl = `${baseUrl}/user/${userId}/post/${postId}/likes`
    expect(LinkingService.deeplinkPath(likesUrl)).toMatchObject({ _: baseUrl, userId, postId, action: 'likes' })
  })

  it('Comments action path', () => {
    const commentsUrl = `${baseUrl}/user/${userId}/post/${postId}/comments`
    expect(LinkingService.deeplinkPath(commentsUrl)).toMatchObject({ _: baseUrl, userId, postId, action: 'comments' })

    const commentsUrlSlashed = `${baseUrl}/user/${userId}/post/${postId}/comments/`
    expect(LinkingService.deeplinkPath(commentsUrlSlashed)).toMatchObject({
      _: baseUrl,
      userId,
      postId,
      action: 'comments',
    })

    const commentsUrlAction = `${baseUrl}/user/${userId}/post/${postId}/comments/3fb30c92-ffgg-4d53-98b7-73957dfs425`
    expect(LinkingService.deeplinkPath(commentsUrlAction)).toMatchObject({
      _: baseUrl,
      userId,
      postId,
      action: 'comments',
      actionId: '3fb30c92-ffgg-4d53-98b7-73957dfs425',
    })
  })

  it('Failing url', () => {
    const appUrl = baseUrl
    expect(() => LinkingService.deeplinkPath(appUrl)).toThrow(/The in-app card is not supported/)

    const missingUserUrl = `${baseUrl}/user/${userId}`
    expect(() => LinkingService.deeplinkPath(missingUserUrl)).toThrow(/The in-app card is not supported/)
  })

  it('Sign up', () => {
    const signupUrl = `${baseUrl}/signup/${userId}`
    expect(LinkingService.deeplinkPath(signupUrl)).toEqual({ _: baseUrl, action: 'signup', userId })
  })
})

describe('deeplinkNavigation redirect routes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const navigation = {
    navigate: jest.fn(),
    push: jest.fn(),
  }

  it('chats', () => {
    const rootUrl = `${baseUrl}/chat/`
    LinkingService.deeplinkNavigation(navigation)(rootUrl)

    testNavigate(navigation, 'App.Chat')
  })

  it('post', () => {
    const rootUrl = `${baseUrl}/user/${userId}/post/${postId}`
    LinkingService.deeplinkNavigation(navigation)(rootUrl)

    testNavigate(navigation, 'App.Root.PostMedia', {
      _: baseUrl,
      userId,
      postId,
      action: 'post',
    })
  })

  it('comments', () => {
    const rootUrl = `${baseUrl}/user/${userId}/post/${postId}/comments`
    LinkingService.deeplinkNavigation(navigation)(rootUrl)

    testNavigate(navigation, 'App.Root.Comments', {
      _: baseUrl,
      userId,
      postId,
      action: 'comments',
    })
  })

  it('comments with commentId', () => {
    const rootUrl = `${baseUrl}/user/${userId}/post/${postId}/comments/3fb30c92-ffgg-4d53-98b7-73957dfs425`
    LinkingService.deeplinkNavigation(navigation)(rootUrl)

    testNavigate(navigation, 'App.Root.Comments', {
      _: baseUrl,
      userId,
      postId,
      action: 'comments',
      actionId: '3fb30c92-ffgg-4d53-98b7-73957dfs425',
    })
  })

  it('likes', () => {
    const rootUrl = `${baseUrl}/user/${userId}/post/${postId}/likes`
    LinkingService.deeplinkNavigation(navigation)(rootUrl)

    testNavigate(navigation, 'App.Root.PostLikes', {
      _: baseUrl,
      userId,
      postId,
      action: 'likes',
    })
  })

  it('views', () => {
    const rootUrl = `${baseUrl}/user/${userId}/post/${postId}/views`
    LinkingService.deeplinkNavigation(navigation)(rootUrl)

    testNavigate(navigation, 'App.Root.PostViews', {
      _: baseUrl,
      userId,
      postId,
      action: 'views',
    })
  })

  it('profile photo', () => {
    const rootUrl = `${baseUrl}/user/${userId}/settings/photo`
    LinkingService.deeplinkNavigation(navigation)(rootUrl)

    testNavigate(navigation, 'App.Root.Home.Profile.ProfilePhoto', {
      _: baseUrl,
      userId,
      action: 'profilePhoto',
    })
  })

  it('invite friends', () => {
    const rootUrl = `${baseUrl}/user/${userId}/settings/contacts`
    LinkingService.deeplinkNavigation(navigation)(rootUrl)

    testNavigate(navigation, 'App.Root.Home.Profile.InviteFriends', {
      _: baseUrl,
      userId,
      action: 'inviteFriends',
    })
  })

  it('sign up', () => {
    const rootUrl = `${baseUrl}/signup/${userId}`
    LinkingService.deeplinkNavigation(navigation)(rootUrl)

    testNavigate(navigation, 'Auth.AuthUsername', { _: baseUrl, userId, action: 'signup' })
  })

  it('open url', () => {
    const rootUrl = 'https:/google.com'
    LinkingService.deeplinkNavigation(navigation)(rootUrl)
    expect(Linking.openURL).toHaveBeenLastCalledWith(rootUrl)
  })
})
