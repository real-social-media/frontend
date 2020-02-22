import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import path from 'ramda/src/path'
import { getPhotoProportions } from 'services/Camera'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const ListItemTemplate = ({
  theme,
  children,
  post,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  const mediaObject = path(['mediaObjects', '0'])(post)

  if (!mediaObject) {
    return null
  }

  const getDimensionsFromPostSize = ({ width: inputWidth, height: inputHeight }) => {
    const { x, y } = getPhotoProportions(inputWidth, inputHeight)
    return { width: x, height: y }
  }

  return (
    <View style={[styling.root, getDimensionsFromPostSize(mediaObject)]}>
      <View style={styling.component}>
        {children}
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    position: 'relative',
  },
  component: {
    width: '100%',
    height: '100%',
  },
})

ListItemTemplate.defaultProps = {
}

ListItemTemplate.propTypes = {
  theme: PropTypes.any,
  children: PropTypes.any,
}

export default withTheme(ListItemTemplate)
