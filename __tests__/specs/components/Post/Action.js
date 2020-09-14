import React from 'react'
import { renderWithProviders, fireEvent } from 'tests/utils'
import * as PrivacyService from 'services/Privacy'
import ActionComponent from 'components/Post/Action'
import testIDs from 'components/Post/test-ids'

jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn() }))

const postShareVisibility = jest.spyOn(PrivacyService, 'postShareVisibility').mockReturnValue(true)
const post = { likeStatus: 'NOT_LIKED', postedAt: new Date().toISOString() }
const requiredProps = { post }

const setup = (props) => renderWithProviders(<ActionComponent {...requiredProps} {...props} />)

describe('Post actions', () => {
  describe('Sharing button', () => {
    it('should be visible when postShareVisibility return true', () => {
      postShareVisibility.mockReturnValueOnce(true)

      const handlePostShare = jest.fn()
      const { queryByTestId } = setup({ handlePostShare })
      const $shareBtn = queryByTestId(testIDs.action.shareBtn)

      expect($shareBtn).toBeTruthy()

      fireEvent.press($shareBtn)
      expect(handlePostShare).toHaveBeenCalled()
    })

    it('should be hidden when postShareVisibility return false', () => {
      postShareVisibility.mockReturnValueOnce(false)
      const { queryByTestId } = setup()

      expect(queryByTestId(testIDs.action.shareBtn)).toBeFalsy()
    })
  })
})
