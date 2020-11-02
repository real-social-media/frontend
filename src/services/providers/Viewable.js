import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import path from 'ramda/src/path'

export const useViewable = () => {
  const dispatch = useDispatch()

  /**
   * Triggers when FlatList item is in view area and viewabilityConfig conditions are met
   */
  const onViewableItemsChanged = ({ viewableItems, viewType }) => {
    const postIds = viewableItems.map(viewable => path(['item', 'postId'])(viewable))
      .filter(item => item)

    if (!Array.isArray(postIds) || !postIds.length) {
      return
    }

    dispatch(postsActions.postsReportPostViewsRequest({ postIds, viewType }))
  }

  /**
   * FlatList config to report post views, must be wrapped in useRef
   */
  const viewabilityConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 30,
    waitForInteraction: false,
  })

  const onViewableItemsThumbnailsRef = useRef(({ viewableItems }) => {
    onViewableItemsChanged({ viewableItems, viewType: 'THUMBNAIL' })
  })

  const onViewableItemsFocusRef = useRef(({ viewableItems }) => {
    onViewableItemsChanged({ viewableItems, viewType: 'FOCUS' })
  })

  return ({
    onViewableItemsThumbnailsRef,
    onViewableItemsFocusRef,
    viewabilityConfigRef,
  })
}

export default useViewable
