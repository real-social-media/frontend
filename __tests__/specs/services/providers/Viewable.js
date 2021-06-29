import { renderHook } from '@testing-library/react-hooks'
import { unpaid, useViewable } from 'services/providers/Viewable'
import { useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'

/**
 * Mock Data
 */
const viewableItems = [
  { item: { postId: '1', payment: 0.00001, viewedStatus: 'NOT_VIEWED' } },
  { item: { postId: '2', payment: 0.00001, viewedStatus: 'VIEWED' } },
  { item: { postId: '3', payment: 0.00002, viewedStatus: 'VIEWED' } },
  { item: { postId: '4', payment: 0.00002, viewedStatus: 'NOT_VIEWED' } },
]

/**
 * Mock Functions
 */
jest.mock('react-redux', () => ({ useDispatch: jest.fn() }))

const dispatch = jest.fn()
useDispatch.mockReturnValue(dispatch)

describe('Viewable provider', () => {
  afterEach(() => {
    dispatch.mockClear()
  })

  describe('filter unpaid posts', () => {
    it('unpaid', () => {
      expect(unpaid(viewableItems[0].item)).toBeFalsy()
      expect(unpaid(viewableItems[1].item)).toBeFalsy()
      expect(unpaid(viewableItems[2].item)).toBeFalsy()
      expect(unpaid(viewableItems[3].item)).toBeTruthy()
    })

    it('onViewableItemsFocusRef', () => {
      const { result } = renderHook(() => useViewable())

      result.current.onViewableItemsFocusRef.current({ viewableItems })

      expect(dispatch).toHaveBeenCalledWith(
        postsActions.postsReportPostViewsRequest({ postIds: ['1', '2', '3'], viewType: 'FOCUS' }),
      )
    })

    it('onViewableItemsThumbnailsRef', () => {
      const { result } = renderHook(() => useViewable())

      result.current.onViewableItemsThumbnailsRef.current({ viewableItems })

      expect(dispatch).toHaveBeenCalledWith(
        postsActions.postsReportPostViewsRequest({ postIds: ['1', '2', '3'], viewType: 'THUMBNAIL' }),
      )
    })
  })
})
