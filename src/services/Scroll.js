import path from 'ramda/src/path'
import Layout from 'constants/Layout'

/**
 * 
 */
const isCloseToBottom = (multiplier = 1.80) => ({ layoutMeasurement, contentOffset, contentSize }) =>
  layoutMeasurement.height + contentOffset.y >= contentSize.height - (Layout.window.height * multiplier)

/**
 *
 */
const getLoadMoreCondition = resource => (
  path(['status'])(resource) !== 'loading' &&
  path(['data', 'length'])(resource) &&
  path(['meta', 'nextToken'])(resource) &&
  path(['meta', 'nextToken'])(resource) !== path(['payload', 'nextToken'])(resource)
)

/**
 *
 */
const getRefreshingCondition = resource => (
  path(['status'])(resource) === 'loading' &&
  !path(['payload', 'nextToken'])(resource)
)

/**
 *
 */
const getLoadingMoreCondition = resource => !!(
  path(['status'])(resource) === 'loading' &&
  path(['payload', 'nextToken'])(resource)
)

const ScrollHelper = ({
  resource,
  loadInit,
  loadMore,
  extra = {},
  multiplier = 3,
}) => {
  /**
   *
   */
  const handleLoadMore = () =>
    getLoadMoreCondition(resource) && loadMore({ nextToken: path(['meta', 'nextToken'])(resource), ...extra })

  /**
   *
   */
  const handleScrollChange = ({ nativeEvent }) =>
    isCloseToBottom(multiplier)(nativeEvent) && handleLoadMore()
  
  /**
   *
   */
  const handleRefresh = () =>
    loadInit(extra)

  /**
   *
   */
  const refreshing = getRefreshingCondition(resource)

  /**
   *
   */
  const loadingmore = getLoadingMoreCondition(resource)

  return {
    handleScrollChange,
    handleRefresh,
    handleLoadMore,
    refreshing,
    loadingmore,
  }
}


export default ScrollHelper