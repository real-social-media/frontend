import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Animated,
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { RectButton } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Comments = ({
  theme,
  children,
  onPress,
}) => {
  const styling = styles(theme)
  const swipeableRef = useRef(null)

  const renderRightAction = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    })
    return (
      <Animated.View style={[styling.row, { transform: [{ translateX: trans }] }]}>
        <RectButton
          style={[styling.action, { backgroundColor: color }]}
          onPress={onPress}
        >
          <Text style={styling.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    )
  }

  const renderRightActions = progress => (
    <View style={{ width: 64, flexDirection: 'row' }}>
      {renderRightAction('Delete', '#dd2c00', 64, progress)}
    </View>
  )

  return (
    <View style={styling.root}>
      <Swipeable
        ref={swipeableRef}
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        renderRightActions={renderRightActions}>
        {children}
      </Swipeable>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  row: {
    flex: 1,
  },
  action: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

Comments.propTypes = {
  theme: PropTypes.any,
  children: PropTypes.any,
  onPress: PropTypes.any,
}

export default withTheme(Comments)
