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
import QualityComponent from 'components/Camera/Quality'
import { RNCamera } from 'react-native-camera'
import Layout from 'constants/Layout'
import usePrevious from 'react-use/lib/usePrevious'
import { getCameraBonds } from 'services/Camera'
import { BlurView } from '@react-native-community/blur'
import Modal from 'components/Modal'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const usePulse = (fromValue, toValue) => {
  const width = new Animated.Value(fromValue)
  const pulse = () => Animated.timing(width, { toValue, duration: 250 }).start()
  useEffect(pulse, [toValue])
  return width
}

const CameraComponent = ({
  theme,
  photoSize,
  setPhotoSize,
  cameraRef,
  flashMode,
  flipMode,
  handleFlipToggle,
  handleClosePress,
  handleLibrarySnap,
  handleCameraSnap,
  handleFlashToggle,
  postsCreateRequest,
  postsCreate,
  photoQuality,
  setPhotoQuality,
  cameraEnabled,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
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
            handleClosePress={handleClosePress}
            content={(
              <QualityComponent
                photoQuality={photoQuality}
                setPhotoQuality={setPhotoQuality}
              />
            )}
          />
        )}
        content={(
          <View style={[styling.cameraWrapper]}>
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

      {!cameraEnabled ?
        <View style={styling.modal}>
          <Modal
            cancelAction={() => navigation.navigate('Feed')}
            cancelLabel={t('Cancel')}
            confirmLabel={t('OK')}
            confirmAction={() => navigation.navigate('Feed')}
            title={t('Camera is blocked')}
            text={t('Please enabled camera access in your phone settings to continue')}
          />
        </View>
      : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
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
  theme: PropTypes.any,
  
  cameraRef: PropTypes.any,
  flashMode: PropTypes.any,
  flipMode: PropTypes.any,
  handleFlipToggle: PropTypes.any,
  handleClosePress: PropTypes.any,
  handleCameraSnap: PropTypes.any,
  handleFlashToggle: PropTypes.any,
  postsCreateRequest: PropTypes.any,
  postsCreate: PropTypes.any,
}

export default withTheme(CameraComponent)
