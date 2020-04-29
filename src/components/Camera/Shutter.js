import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import UploadIcon from 'assets/svg/camera/Upload'
import FlipIcon from 'assets/svg/camera/Flip'
import FlashOnIcon from 'assets/svg/camera/FlashOn'
import FlashOffIcon from 'assets/svg/camera/FlashOff'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Shutter = ({
  t,
  theme,
  flashMode,
  handleFlipToggle,
  handleLibrarySnap,
  handleCameraSnap,
  handleFlashToggle,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <View style={styling.action}>
        <TouchableOpacity style={styling.item} onPress={handleLibrarySnap}>
          <UploadIcon
            fill="#ffffff"
          />
        </TouchableOpacity>
        <View style={styling.item} />

        <TouchableOpacity style={styling.capture} onPress={handleCameraSnap}>
        </TouchableOpacity>

        <TouchableOpacity style={styling.item} onPress={handleFlipToggle}>
          <FlipIcon
            fill="#ffffff"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styling.item} onPress={handleFlashToggle}>
          {flashMode ?
            <FlashOnIcon
              fill="#ffffff"
            />
          : null}

          {!flashMode ?
            <FlashOffIcon
              fill="#ffffff"
            />
          : null}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  item: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 10,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.input,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

Shutter.propTypes = {
  theme: PropTypes.any,
  flashMode: PropTypes.any,
  handleFlipToggle: PropTypes.any,
  handleCameraSnap: PropTypes.any,
  handleFlashToggle: PropTypes.any,
  t: PropTypes.any,
  handleLibrarySnap: PropTypes.any,
}

export default withTranslation()(withTheme(Shutter))
