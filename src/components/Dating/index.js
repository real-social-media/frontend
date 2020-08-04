import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native'
import DatingGridComponent from 'components/DatingGrid'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const Dating = ({
  theme,
  datingGet,
  user,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <ScrollView bounces={false}>
        <DatingGridComponent 
          datingGet={datingGet}
          themeCode={path(['data', 'themeCode'])(user)}
        />
      </ScrollView>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
})

Dating.propTypes = {
  theme: PropTypes.any,
  datingGet: PropTypes.any,
  user: PropTypes.any
}

export default withTranslation()(withTheme(Dating))
