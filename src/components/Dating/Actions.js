import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import ApproveIcon from 'assets/svg/dating/Approve'
import RejectIcon from 'assets/svg/dating/Reject'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const Actions = ({
  theme,
  swiperRef,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <View style={styling.actions}>
        <TouchableOpacity style={styling.icon} onPress={() => swiperRef.current.swipeLeft()}>
          <RejectIcon fill="#E74C3C" />
        </TouchableOpacity>

        <TouchableOpacity style={styling.icon} onPress={() => swiperRef.current.swipeRight()}>
          <ApproveIcon fill="#0eac51" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    height: 76,
    width: 76,
    borderRadius: 38,
    marginHorizontal: theme.spacing.base * 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundSecondary,
  },
})

Actions.propTypes = {
  theme: PropTypes.any,
  swiperRef: PropTypes.any,
}

export default withTranslation()(withTheme(Actions))
