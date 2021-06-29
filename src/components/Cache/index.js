import React, { memo } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Image,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import CacheServiceComponent from 'components/Cache/index.service'
import equals from 'ramda/src/equals'

const CacheComponent = ({
  uri,
  resizeMode,
  style,
  handleError,
  progress,
  hideProgress,
  hideLabel,
  filename,
}) => {
  return (
    <View style={styles.root}>
      <View style={[styles.image, style]}>
        {!hideProgress && !progress && !uri ?
          <View style={styles.progress}>
            <AnimatedCircularProgress
              size={40}
              width={2}
              fill={0}
              tintColor="#21ce99"
              backgroundColor="#ffffff"
            />
          </View>
        : null}

        {!hideProgress && progress ?
          <View style={styles.progress}>
            <AnimatedCircularProgress
              size={40}
              width={2}
              fill={progress}
              tintColor="#21ce99"
              backgroundColor="#ffffff"
            />
          </View>
        : null}

        <Image
          key={uri}
          source={{ uri }}
          resizeMode={resizeMode}
          style={[styles.image, style]}
          onError={handleError}
        />

        {!hideLabel && filename ?
          <View style={styles.label}>
            <Text style={styles.text}>{filename}</Text>
          </View>
        : null}
      </View>
    </View>
  )
}

CacheComponent.propTypes = {
  uri: PropTypes.any,
  resizeMode: PropTypes.any,
  style: PropTypes.any,
  handleError: PropTypes.any,
  progress: PropTypes.any,
  hideProgress: PropTypes.any,
  hideLabel: PropTypes.any,
  filename: PropTypes.any,
}

CacheComponent.defaultProps = {
  hideProgress: false,
  hideLabel: true,
}

const styles = StyleSheet.create({
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
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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
export default memo((props) =>
  <CacheServiceComponent {...props}>
    {(cacheProps) => (
      <CacheComponent {...cacheProps} />
    )}
  </CacheServiceComponent>
, equals)
