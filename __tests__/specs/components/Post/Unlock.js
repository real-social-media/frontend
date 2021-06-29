import React from 'react'
import { useDispatch } from 'react-redux'
import { render, fireEvent } from 'tests/utils'
import UnlockPost from 'components/Post/Unlock'
import * as postsActions from 'store/ducks/posts/actions'

/**
 * Mock Data
 */
const postId = '2'
const payment = 0.0004
const requiredProps = { postId, payment }

/**
 * Mock Functions
 */
jest.mock('react-redux', () => ({ useDispatch: jest.fn() }))

const dispatch = jest.fn()
useDispatch.mockReturnValue(dispatch)

const setup = (props = {}) => render(<UnlockPost {...requiredProps} {...props} />)

describe('UnlockPost component', () => {
  afterEach(() => {
    dispatch.mockClear()
  })

  it('title and subtitle', () => {
    const { getByText } = setup()

    expect(getByText('Paid Content')).toBeTruthy()
    expect(getByText(`This post costs $${payment} REAL Coins`)).toBeTruthy()
  })

  it('handle pay button press', () => {
    const { getByText } = setup()
    const $button = getByText('Pay & Continue')

    expect($button).toBeTruthy()
    expect(dispatch).not.toHaveBeenCalled()

    fireEvent.press($button)
    expect(dispatch).toHaveBeenCalledWith(postsActions.postsPayRequest({ postId }))
  })
})
