/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  Animated,
} from 'react-native'
import CameraTemplate from 'templates/Camera'
import CameraHeaderTemplate from 'templates/Camera/Header'
import ShutterComponent from 'components/Camera/Shutter'
import PickerComponent from 'components/Camera/Picker'
import { RNCamera } from 'react-native-camera'
import Layout from 'constants/Layout'
import usePrevious from 'react-use/lib/usePrevious'
import { getCameraBonds } from 'services/Dimensions'
import { BlurView } from '@react-native-community/blur'
import * as navigationActions from 'navigation/actions'

import { useNavigation } from '@react-navigation/native'

const usePulse = (fromValue, toValue) => {
  const width = new Animated.Value(fromValue)
  const pulse = () => Animated.timing(width, { toValue, duration: 250 }).start()
  useEffect(pulse, [toValue])
  return width
}

const CameraComponent = ({
  photoSize,
  setPhotoSize,
  cameraRef,
  flashMode,
  flipMode,
  handleFlipToggle,
  handleLibrarySnap,
  handleCameraSnap,
  handleFlashToggle,
  postsCreateRequest,
  postsCreate,
}) => {
  const styling = styles
  const navigation = useNavigation()
  
  /**
   * Size calc
   */
  const prevStatus = usePrevious(photoSize)
  const topHeight = usePulse(getCameraBonds(prevStatus).top, getCameraBonds(photoSize).top)
  const bottomHeight = usePulse(getCameraBonds(prevStatus).bottom, getCameraBonds(photoSize).bottom)

  return (
    <View style={styling.root}>
      <CameraTemplate
        header={(
          <CameraHeaderTemplate
            handleClosePress={() => navigationActions.navigateHome(navigation)}
          />
        )}
        content={(
          <View style={styling.cameraWrapper}>
            <Animated.View style={[{ top: 0, height: topHeight }, styling.overflow]}>
              <BlurView style={styling.blur} />
            </Animated.View>
            <Animated.View style={[{ bottom: 0, height: bottomHeight }, styling.overflow]}>
              <BlurView style={styling.blur} />
            </Animated.View>

            <RNCamera
              key={(
                flipMode ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back
              )}
              type={(
                flipMode ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back
              )}
              flashMode={(
                flashMode ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off
              )}
              ref={cameraRef}
              captureAudio={false}
              style={styling.camera}
            />
          </View>
        )}
        footer={(
          <View style={styling.footer}>
            <ShutterComponent
              flashMode={flashMode}
              handleLibrarySnap={handleLibrarySnap}
              handleCameraSnap={handleCameraSnap}
              handleFlipToggle={handleFlipToggle}
              handleFlashToggle={handleFlashToggle}
              postsCreateRequest={postsCreateRequest}
              postsCreate={postsCreate}
            />
            <PickerComponent setPhotoSize={setPhotoSize} />
          </View>
        )}
        selector={(
          null
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  cameraWrapper: {
    justifyContent: 'center',
    overflow: 'hidden',
  },
  camera: {
    height: Layout.window.height,
    width: Layout.window.width,
  },
  footer: {
    flex: 1,
    paddingHorizontal: 12,
    flexDirection: 'column-reverse',
  },
  overflow: {
    zIndex: 10,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  blur: {
    width: '100%',
    height: '100%',
  },
})

CameraComponent.propTypes = {
  cameraRef: PropTypes.any,
  flashMode: PropTypes.any,
  flipMode: PropTypes.any,
  handleFlipToggle: PropTypes.any,
  handleLibrarySnap: PropTypes.any,
  handleCameraSnap: PropTypes.any,
  handleFlashToggle: PropTypes.any,
  postsCreateRequest: PropTypes.any,
  postsCreate: PropTypes.any,
  photoSize: PropTypes.any,
  setPhotoSize: PropTypes.any,
  cameraEnabled: PropTypes.any,
  libraryEnabled: PropTypes.any,
}

export default CameraComponent
