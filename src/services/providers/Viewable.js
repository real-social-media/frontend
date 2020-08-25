import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import path from 'ramda/src/path'

export const useViewable = () => {
  const dispatch = useDispatch()

  /**
   * Triggers when FlatList item is in view area and viewabilityConfig conditions are met
   */
  const onViewableItemsChanged = ({ viewableItems }) => {
    const postIds = viewableItems.map(viewable => path(['item', 'postId'])(viewable))
      .filter(item => item)

    if (!Array.isArray(postIds) || !postIds.length) {
      return
    }

    dispatch(postsActions.postsReportPostViewsRequest({ postIds }))
  }

  /**
   * FlatList config to report post views, must be wrapped in useRef
   */
  const onViewableItemsChangedRef = useRef(onViewableItemsChanged)
  const viewabilityConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 30,
    waitForInteraction: false,
  })

  return ({
    onViewableItemsChangedRef,
    viewabilityConfigRef,
  })
}

export default useViewable
