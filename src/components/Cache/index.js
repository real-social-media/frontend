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
  priorityQueueInstance,
}) => {
  const styling = styles()
  const dispatch = useDispatch()

  const cached = useSelector(state => state.cache.cached)
  const failed = useSelector(state => state.cache.failed)
  const progress = useSelector(state => state.cache.progress)
  const signatures = images
    .filter(([source, shouldDownload]) => source)
    .map(([source, shouldDownload]) => [generateSignature(source), shouldDownload])
  const pathFolder = path([0, 0, 'pathFolder'])(signatures)
  const uri = last(cached[pathFolder] || [])
  const fail = path([pathFolder])(failed)
  const fill = path([pathFolder, 'progress'])(progress)

  const getFilename = (source) => {
    if (!source) return ''
    const withoutQuery = source.split('?').shift()
    const withoutPath = withoutQuery.split('/').pop()
    const withoutExt = withoutPath.split('.').shift()
    return withoutExt
  }

  const getPriority = (filename = '', priority = 0) => {
    if (filename.includes('480p')) {
      return priority
    }
    if (filename.includes('4k')) {
      return 1000 + priority
    }
    if (filename.includes('native')) {
      return 10000 + priority
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
        priorityQueueInstance,

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
    dispatch(actions.cacheFetchIdle({
      signature: {
        pathFolder,
      },
    }))
    
    fetchRemoteImages()
  }

  /**
   * Show loading indicator image if placeholder image is not loaded, yet.
   */
  if (!uri && !fill && !fail) {
    return (
      <ActivityIndicator
        style={styling.image}
      />
    )
  }

  return (
    <View style={styling.root}>
      <View style={[styling.image, style]}>
        {!hideLabel && getFilename(uri) ?
          <View style={styling.label}>
            <Text style={styling.text}>{getFilename(uri)}</Text>
          </View>
        : null}

        {fill ?
          <View style={styling.progress}>
            <AnimatedCircularProgress
              size={50}
              width={2}
              fill={fill}
              tintColor="#21ce99"
              backgroundColor="#ffffff"
            />
          </View>
        : null}

        {uri ?
          <Image
            source={{ uri }}
            resizeMode={resizeMode}
            style={[styling.image, style]}
            onError={handleError}
          />
        : null}
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