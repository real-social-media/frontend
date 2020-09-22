import React from 'react'
import { renderWithProviders, fireEvent } from 'tests/utils'
import PostShare from 'components/PostShare'

jest.mock('components/Preview/index.service', () => ({ children }) => children({}))
jest.mock('components/Preview/Post', () => () => null)
jest.mock('components/Preview/User', () => () => null)

const photoUrl = 'photoUrl.jpg'
const post = { id: 1, image: { url: photoUrl } }
const postsSingleGet = { data: post }
const watermark = true
const postsShare = { status: 'loading', payload: {} }
const route = { params: {} }
const postsShareRequest = jest.fn()
const requiredProps = { postsSingleGet, postsShare, route, postsShareRequest, watermark }

const setup = (props) => renderWithProviders(<PostShare {...requiredProps} {...props} />)

describe('PostShare component', () => {
  afterEach(() => {
    postsShareRequest.mockReset()
  })

  it('Repost on REAL', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Repost on REAL'))
    expect(postsShareRequest).toHaveBeenCalledWith({
      photoUrl,
      type: 'repost',
      title: 'Repost',
      watermark,
      post,
    })
  })

  it('Copy to Photos', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Copy to Photos'))
    expect(postsShareRequest).toHaveBeenCalledWith({
      photoUrl,
      type: 'cameraroll',
      title: 'Camera roll export',
      watermark,
      post,
    })
  })

  it('Share on Instagram', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Share on Instagram'))
    expect(postsShareRequest).toHaveBeenCalledWith({
      photoUrl,
      type: 'instagramPost',
      title: 'Instagram export',
      watermark,
      post,
    })
  })
})
