import React from 'react'
import { renderWithProviders, fireEvent } from 'tests/utils'
import PrivacyService from 'services/Privacy'
import HeaderComponent from 'components/Story/Header'
import { useNavigation } from '@react-navigation/native'
import testIDs from 'components/Story/test-ids'

jest.mock('templates/Avatar', () => () => null)
jest.mock('react-native-actionsheet', () => jest.fn().mockReturnValue(null))
jest.mock('services/Privacy', () => ({
  postRepostVisiblity: jest.fn().mockReturnValue(true),
  postVerificationVisibility: jest.fn().mockReturnValue(true),
  postExpiryVisiblity: jest.fn().mockReturnValue(true),
}))

const navigation = { push: jest.fn(), navigate: jest.fn() }
jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn() }))
useNavigation.mockReturnValue(navigation)

const postId = 1
const postedBy = { userId: 1 }
const post = { postId, postedBy, originalPost: { postedBy }, expiresAt: '2020-09-10T05:26:58.746Z' }
const requiredProps = { post }

const setup = (props) => renderWithProviders(<HeaderComponent {...requiredProps} {...props} />)

describe('Story Header component', () => {
  afterEach(() => {
    PrivacyService.postRepostVisiblity.mockClear()
    PrivacyService.postVerificationVisibility.mockClear()
    PrivacyService.postExpiryVisiblity.mockClear()
    navigation.push.mockClear()
    navigation.navigate.mockClear()
  })

  describe('Repost button', () => {
    it('visibility service with called with right params', () => {
      setup()

      expect(PrivacyService.postRepostVisiblity).toHaveBeenCalledWith(post)
    })

    it('visible', () => {
      const { queryByTestId } = setup()

      expect(queryByTestId(testIDs.header.repostBtn)).toBeTruthy()
    })

    it('hidden', () => {
      PrivacyService.postRepostVisiblity.mockReturnValueOnce(false)
      const { queryByTestId } = setup()

      expect(queryByTestId(testIDs.header.repostBtn)).toBeFalsy()
    })

    it('callback on press', () => {
      const { queryByTestId } = setup()
      const $repostBtn = queryByTestId(testIDs.header.repostBtn)

      expect($repostBtn).toBeTruthy()

      fireEvent.press($repostBtn)
      expect(navigation.push).toHaveBeenCalledWith('Profile', { userId: post.postedBy.userId })
    })
  })

  describe('Expiry', () => {
    it('visibility service with called with right params', () => {
      setup()

      expect(PrivacyService.postExpiryVisiblity).toHaveBeenCalledWith(post)
    })

    it('visible', () => {
      const { queryByTestId } = setup()

      expect(queryByTestId(testIDs.header.expiry)).toBeTruthy()
    })

    it('hidden', () => {
      PrivacyService.postExpiryVisiblity.mockReturnValueOnce(false)
      const { queryByTestId } = setup()

      expect(queryByTestId(testIDs.header.expiry)).toBeFalsy()
    })
  })

  describe('Verification Status', () => {
    it('visibility service with called with right params', () => {
      setup()

      expect(PrivacyService.postVerificationVisibility).toHaveBeenCalledWith(post)
    })

    it('visible', () => {
      const { queryByTestId } = setup()

      expect(queryByTestId(testIDs.header.verificationStatus)).toBeTruthy()
    })

    it('hidden', () => {
      PrivacyService.postVerificationVisibility.mockReturnValueOnce(false)
      const { queryByTestId } = setup()

      expect(queryByTestId(testIDs.header.verificationStatus)).toBeFalsy()
    })

    it('callback on press', () => {
      const { queryByTestId } = setup()
      const $verificationStatus = queryByTestId(testIDs.header.verificationStatus)

      expect($verificationStatus).toBeTruthy()

      fireEvent.press($verificationStatus)
      expect(navigation.navigate).toHaveBeenCalledWith('Verification', { actionType: 'BACK' })
    })
  })
})
