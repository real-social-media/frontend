import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { Text, Title } from 'react-native-paper'
import BackIcon from 'assets/svg/header/Back'
import CloseIcon from 'assets/svg/header/Close'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const NavigationHeader = ({
  theme,
  title,
  onNavLeftPress,
  rightLabel,
  onNavRightPress,
  onClosePress,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      {onNavLeftPress ?
        <TouchableOpacity style={styling.leftNav} onPress={onNavLeftPress}>
          <BackIcon fill={theme.colors.primaryIcon} />
        </TouchableOpacity>
      : <View style={styling.leftNav} />}

      <View style={styling.title}>
        <Title>{title}</Title>
      </View>
      
      {onClosePress ?
        <TouchableOpacity style={styling.rightNav} onPress={onClosePress}>
          <CloseIcon fill={theme.colors.primaryIcon} />
        </TouchableOpacity>
      : null}

      {onNavRightPress ?
        <TouchableOpacity style={styling.rightNav} onPress={onNavRightPress}>
          <Text>{rightLabel}</Text>
        </TouchableOpacity>
      : null}

      {!onClosePress && !onNavRightPress ?
        <View style={styling.rightNav} />
      : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    backgroundColor: theme.colors.backgroundSecondary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
  },
  leftNav: {
    padding: 18,
    width: 100,
  },
  rightNav: {
    padding: 18,
    width: 100,
    flexDirection: 'row-reverse',
  },
})

NavigationHeader.propTypes = {
  theme: PropTypes.any,
  title: PropTypes.any,
  onNavLeftPress: PropTypes.any,
  rightLabel: PropTypes.any,
  onNavRightPress: PropTypes.any,
}

export default withTheme(NavigationHeader)
