import React from 'react'
import PropTypes from 'prop-types'
import { View, Animated, StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import DeleteIcon from 'assets/svg/comment/Delete'
import ReportIcon from 'assets/svg/comment/Report'
import path from 'ramda/src/path'

const RenderRightActions = (rowProps) => (progress, dragX) => {
  const interpolateProps = (
    rowProps.handleReportPress &&
    rowProps.handleDeletePress
  ) ? ({
    inputRange: [-120, 0],
    outputRange: [0, 120],
    extrapolate: 'clamp',
  }) : ({
    inputRange: [-60, 0],
    outputRange: [0, 60],
    extrapolate: 'clamp',
  })

  const trans = dragX.interpolate(interpolateProps)

  return (
    <View>
      <Animated.View style={[
        [{ transform: [{ translateX: trans }] }],
        [styles.swipeable],
      ]}>
        {rowProps.handleReportPress ?
          <RectButton style={[styles.button, styles.report]} onPress={rowProps.handleReportPress}>
            <ReportIcon fill="#ffffff" />
          </RectButton>
        : null}

        {rowProps.handleDeletePress ?
          <RectButton style={[styles.button, styles.delete]} onPress={rowProps.handleDeletePress}>
            <DeleteIcon fill="#ffffff" />
          </RectButton>
        : null}
      </Animated.View>
    </View>
  )
}

const AppleStyleSwipeableRow = ({ rowProps, rowRef, children }) => {
  if (
    !path(['handleReportPress'], rowProps) &&
    !path(['handleDeletePress'], rowProps)
  ) {
    return children
  }

  return (
    <Swipeable
      renderRightActions={RenderRightActions(rowProps)}
      ref={rowRef}
      containerStyle={styles.containerStyle}
      childrenContainerStyle={styles.childrenContainerStyle}
    >
      {children}
    </Swipeable>
  )
}

AppleStyleSwipeableRow.propTypes = {
  rowRef: PropTypes.any,
  children: PropTypes.any,
  rowProps: PropTypes.any,
}

const styles = StyleSheet.create({
  containerStyle: {
    overflow: 'hidden',
  },
  childrenContainerStyle: {
    overflow: 'hidden',
  },
  swipeable: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  report: {
    backgroundColor: '#f39c12',
  },
  delete: {
    backgroundColor: '#c0392b',
  },
})

export default AppleStyleSwipeableRow