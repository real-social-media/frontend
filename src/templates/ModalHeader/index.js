import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import CloseIcon from 'assets/svg/header/Close'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const ModalHeader = ({
  theme,
  onPress,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.header}>
      <TouchableOpacity style={styling.icon} onPress={onPress}>
        <CloseIcon fill={theme.colors.primaryIcon} />
      </TouchableOpacity>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  header: {
    ...StyleSheet.absoluteFill,
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: theme.spacing.base,
  },
  icon: {
    backgroundColor: `${theme.colors.backgroundSecondary}99`,
    padding: 6,
    borderRadius: 100,
  },
})

ModalHeader.propTypes = {
  theme: PropTypes.any,
}

export default withTheme(ModalHeader)
