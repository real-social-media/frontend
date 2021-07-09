import { useEffect, useState, useCallback, useMemo, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as cacheSelector from 'store/ducks/cache/selectors'
import * as actions from 'store/ducks/cache/actions'
import * as helpers from 'components/Cache/helpers'
import equals from 'ramda/src/equals'
import path from 'ramda/src/path'
import compose from 'ramda/src/compose'
import useAsyncRetry from 'react-use/lib/useAsyncRetry'
import usePreviousDistinct from 'react-use/lib/usePreviousDistinct'
import { Platform } from 'react-native'

const CacheService = ({
  children,
  images,
  fallback,
  resizeMode,
  priorityIndex,
  style,
  hideProgress,
  hideLabel,
  thread,
}) => {
  const dispatch = useDispatch()

  /**
   * Fetched items counter
   */
  const [counter, setCounter] = useState(0)

  const signature = compose(helpers.generateSignature, path([counter, 0]))(images)
  const cachedState = useSelector(cacheSelector.cachedSelector(signature.partial))
  const cached = cachedState ? (Platform.OS == 'android' ? 'file://' + cachedState : cachedState) : cachedState
  const progress = useSelector(cacheSelector.progressSelector(signature.partial))
  const failed = useSelector(cacheSelector.failedSelector(signature.partial))
  const previousCached = usePreviousDistinct(cached)
  const uri = useMemo(() => failed ? fallback : (cached || previousCached), [cached, failed])
  const filename = useMemo(() => helpers.getFilename(uri), [uri])

  /**
   * Initialize image fetch
   */
  const request = useAsyncRetry(async () => {
    const priority = helpers.getPriority(helpers.getFilename(signature.source), priorityIndex)

    if (await helpers.checkLocalImage(signature.path)) {
      dispatch(actions.cacheFetchSuccess({ signature, progress: 100 }))
    } else if (path([counter, 1])(images)) {
      dispatch(actions.cacheFetchRequest({ signature, priority, thread }))
    }
  }, [signature.partial, counter])

  /**
   * Switch image to higher resolution if download was successful
   */
  useEffect(() => {
    const availableImages = images.length
    const moreToDownload = availableImages - 1 > counter
    const firstCondition = (moreToDownload && cached && !progress)
    if (!firstCondition) {
      return
    }
    setCounter(counter + 1)
  }, [signature.partial, counter, cached, progress])

  /**
   * Error handler
   */
  const handleError = useCallback(() => {
    dispatch(actions.cacheFetchFailure({ signature }))
    !request.loading && request.retry()
  }, [signature.partial])

  return children({
    uri,
    resizeMode,
    style,
    handleError,
    progress,
    hideProgress,
    hideLabel,
    filename,
    previousCached,
  })
}

function areEqual(prevProps, nextProps) {
  return equals(prevProps.images, nextProps.images)
}

export default memo(CacheService, areEqual)
