import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import Layout from 'constants/Layout'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const RowsItemTemplate = ({
  theme,
  children,
  hasBorders,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const rootStyle = hasBorders ? styling.rootBorder : styling.rootDefault

  return (
    <View style={rootStyle}>
      <View style={styling.component}>
        {children}
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  rootDefault: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 1,
    paddingBottom: 6,
    marginBottom: 6,
  },
  rootBorder: {
    borderBottomColor: '#33333340',
    borderBottomWidth: 1,
    paddingBottom: 6,
    marginBottom: 6,
  },
  component: {
    height: 42,
    justifyContent: 'center',
  },
})

RowsItemTemplate.defaultProps = {
}

RowsItemTemplate.propTypes = {
  theme: PropTypes.any,
  children: PropTypes.any,
  hasBorders: PropTypes.any,
}

export default withTheme(RowsItemTemplate)
