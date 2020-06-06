import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from 'store/ducks/cache/actions'
import {
  StyleSheet,
  Image,
  ActivityIndicator,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import RNFS from 'react-native-fs'
import qs from 'query-string'
import path from 'ramda/src/path'
import last from 'ramda/src/last'
import useTimeoutFn from 'react-use/lib/useTimeoutFn'

/**
 * 
 */
const getPartial = (source) => {
  if (!source.includes('cloudfront.net')) {
    return source
  }
  return qs.parseUrl(source).url.split('cloudfront.net')[1].replace(':', '-')
}

const getIsRemote = (source) => {
  return source.includes('http://') || source.includes('https://')
}

const generateSignature = (source) => {
  if (typeof source !== 'string' || !source.length) {
    return {
      partial: '',
      path: '',
      isRemote: '',
    }
  }

  const isRemote = getIsRemote(source)
  const partial = getPartial(source)
  const path = isRemote ? `${RNFS.CachesDirectoryPath}/REAL${partial}` : source
  const pathFolder = path.substring(0, path.lastIndexOf('/'))

  return {
    source,
    partial,
    path,
    pathFolder,
    isRemote,
  }
}

/**
 * UI Component
 */
const CacheComponent = ({
  images,
  fallback,
  resizeMode,
  priorityIndex,
  style,
  hideProgress,
  hideLabel,
}) => {
  const styling = styles()
  const dispatch = useDispatch()

  const [hasError, setHasError] = useState(false)

  const signatures = images
    .filter(([source, shouldDownload]) => source)
    .map(([source, shouldDownload]) => [generateSignature(source), shouldDownload])

  const pathFolder = path([0, 0, 'pathFolder'])(signatures)
  const cached = useSelector(path(['cache', 'cached', pathFolder]))
  const progress = useSelector(path(['cache', 'progress', pathFolder, 'progress']))

  const uri = last(cached || [])

  const progressVisibility = !hideProgress && progress

  const getFilename = (source) => {
    if (!source) return ''
    const withoutQuery = source.split('?').shift()
    const withoutPath = withoutQuery.split('/').pop()
    const withoutExt = withoutPath.split('.').shift()
    return withoutExt
  }

  const getPriority = (filename = '', priority = 0) => {
    if (filename.includes('64p')) {
      return priority
    }
    if (filename.includes('480p')) {
      return 1000 + priority
    }
    if (filename.includes('4K')) {
      return 10000 + priority
    }
    if (filename.includes('native')) {
      return 100000 + priority
    }
    return 0
  }

  const fetchRemoteImages = () =>
    signatures.forEach(([signature, shouldDownload], index) => {
      const priority = getPriority(getFilename(signature.source), priorityIndex)

      if (!shouldDownload) {
        return
      }

      dispatch(actions.cacheFetchRequest({
        /**
         * Image source
         */
        signature,

        /**
         * Priority of the image, usually is the position of the item in list
         */
        priority,
      }))
    })

  const [isReady, cancelTimeout, resetTimeout] = useTimeoutFn(() => {
    fetchRemoteImages()
  }, 15000)

  useEffect(() => {
    if ((cached && cached.length) === (signatures && signatures.length) && isReady() === false) {
      cancelTimeout()
    }

    if ((cached && cached.length) !== (signatures && signatures.length) && isReady() === true) {
      // resetTimeout()
    }
    
  }, [uri, cached])

  useEffect(() => {
    fetchRemoteImages()

    /**
     * Cancel all pending tasks on image remove
     */
    return () => {}
  }, [])

  /**
   * 
   */
  const handleError = ({ nativeEvent }) => {
    setHasError(true)

    signatures
      .filter(([signature]) => signature.path === uri)
      .forEach(([signature, shouldDownload]) => {
        dispatch(actions.cacheFetchFailure({
          signature,
          jobId: 0,
          error: nativeEvent,
          progress: 0,
        }))
      })
  }

  /**
   * Show loading indicator image if placeholder image is not loaded, yet.
   */
  if (!uri && !progress && !hasError) {
    return (
      <ActivityIndicator
        style={styling.image}
      />
    )
  }

  const filename = getFilename(uri)

  return (
    <View style={styling.root}>
      <View style={[styling.image, style]}>
        {!hideLabel && filename ?
          <View style={styling.label}>
            <Text style={styling.text}>{filename}</Text>
          </View>
        : null}

        {progressVisibility ?
          <View style={styling.progress}>
            <AnimatedCircularProgress
              size={40}
              width={2}
              fill={progress}
              tintColor="#21ce99"
              backgroundColor="#ffffff"
            />
          </View>
        : null}

        {uri && !hasError ? (
          <Image
            source={{ uri }}
            resizeMode={resizeMode}
            style={[styling.image, style]}
            onError={handleError}
            blurRadius={filename === '64p' && !hideProgress ? 5 : 0}
          />
        ) : (
          <Image
            source={{ uri: fallback }}
            resizeMode={resizeMode}
            style={[styling.image, style]}
            onError={handleError}
            blurRadius={filename === '64p' && !hideProgress ? 5 : 0}
          />
        )}
      </View>
    </View>
  )
}

CacheComponent.propTypes = {
  images: PropTypes.any,
  fallback: PropTypes.any,
  resizeMode: PropTypes.any,
  priorityIndex: PropTypes.any,
  style: PropTypes.any,
  hideProgress: PropTypes.any,
  hideLabel: PropTypes.any,
  ages: PropTypes.any,
  prio: PropTypes.any,
}

CacheComponent.defaultProps = {
  hideProgress: false,
  hideLabel: true,
}

const styles = () => StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  label: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 10,
    margin: 6,
    padding: 2,
    borderWidth: 0.5,
    borderRadius: 3,
    backgroundColor: '#ffffff80',
    borderColor: 'black',
  },
  text: {
    fontSize: 8,
    color: 'black',
  },
})

export const CacheContext = React.createContext(null)
export default CacheComponent