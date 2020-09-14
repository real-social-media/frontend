import React from 'react'
import { renderWithProviders, fireEvent } from 'tests/utils'
import UploadingComponent from 'components/Feed/Uploading'
import testIDs from 'components/Feed/test-ids'

jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn() }))
jest.mock('react-redux', () => ({ useDispatch: jest.fn() }))
jest.mock('templates/Avatar', () => () => null)

const setup = (props) => renderWithProviders(<UploadingComponent {...props} />)

describe('Feed Uploading', () => {
  describe('Loading state', () => {
    it('represent progress', () => {
      [10, 50, 98].forEach((progress) => {
        const { getByText } = setup({ post: { status: 'loading', meta: { progress } } })

        expect(getByText(`Uploading ${progress}%`)).toBeTruthy()
      })
    })

    it('represent cancel button', () => {
      [(10, 50, 98)].forEach((progress) => {
        const postsCreateIdle = jest.fn()
        const post = { status: 'loading', meta: { progress } }
        const { queryByTestId } = setup({ post, postsCreateIdle })
        const $cancelBtn = queryByTestId(testIDs.uploading.cancelBtn)

        expect($cancelBtn).toBeTruthy()
        fireEvent.press($cancelBtn)

        expect(postsCreateIdle).toHaveBeenCalledWith(post)
      })
    })

    it('hide cancel button when uploading done', () => {
      const { queryByTestId } = setup({ post: { status: 'loading', meta: { progress: 99 } } })

      expect(queryByTestId(testIDs.uploading.cancelBtn)).toBeFalsy()
    })
  })
})
