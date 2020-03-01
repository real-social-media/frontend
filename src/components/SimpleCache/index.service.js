import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as cacheActions from 'store/ducks/cache/actions'
import RNFS from 'react-native-fs'
import { v4 as uuidv5 } from 'uuid'
import qs from 'query-string'
import path from 'ramda/src/path'
import includes from 'ramda/src/includes'

const generateSignature = (source) => {
  if (typeof source !== 'string' || !source.length) {
    return {
      partial: '',
      path: '',
      isRemote: '',
    }
  }

  const parsed = qs.parseUrl(source)
  const partial = qs.parseUrl(source).url.split('cloudfront.net')[1]
  const uuid = uuidv5(partial || parsed.url, uuidv5.URL)
  const isRemote = includes('http://', source) || includes('https://', source)
  
  const path = isRemote ? `${RNFS.CachesDirectoryPath}/${uuid}.jpg` : source

  return {
    partial,
    path,
    isRemote,
  }
}

const cacheFetchItemPathSelector = partial => path(['cache', 'cacheFetch', 'data', partial, 'path'])

const SimpleCacheService = ({ children, source, priorityIndex }) => {
  const dispatch = useDispatch()

  const signature = generateSignature(source.uri)

  const cacheFetchItemPath = useSelector(cacheFetchItemPathSelector(signature.partial))

  const channelType = ['64p', '480p', '1080p', '4k'].find(resolution => includes(resolution, source.uri || ''))

  const cacheFetchRequest = (sourcePath) => {
    if (typeof sourcePath !== 'string' || !sourcePath.length) {
      return
    }

    if (channelType === '64p') {
      dispatch(cacheActions.cacheFetch64pRequest({ priorityIndex, source: sourcePath }))
    } else if (channelType === '480p') {
      dispatch(cacheActions.cacheFetch480pRequest({ priorityIndex, source: sourcePath }))
    } else if (channelType === '1080p') {
      dispatch(cacheActions.cacheFetch1080pRequest({ priorityIndex, source: sourcePath }))
    } else if (channelType === '4k') {
      dispatch(cacheActions.cacheFetch4kRequest({ priorityIndex, source: sourcePath }))
    } else {
      dispatch(cacheActions.cacheFetchRequest({ priorityIndex, source: sourcePath }))
    }
  }

  const cacheFetchIdle = (sourcePath) => {
    dispatch(cacheActions.cacheFetchIdle({ source: sourcePath }))
  }

  useEffect(() => {
    cacheFetchRequest(source.uri)
  }, [source.uri])

  const [hasError, setHasError] = useState(null)
  const uri = signature.isRemote && !hasError ? cacheFetchItemPath : source.uri

  const onError = () => {
    setHasError(true)
    cacheFetchIdle(signature)
  }

  if (!uri) {
    return null
  }

  return children({
    source: {
      uri,
      cache: 'reload',
    },
    onError,
  })
}

export default SimpleCacheService
