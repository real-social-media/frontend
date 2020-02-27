import React from 'react'
import PropTypes from 'prop-types'
import {
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const PostType = ({
  theme,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()

  return (
    <View style={styling.root}>
      <TouchableOpacity style={styling.backdrop} onPress={() => navigation.goBack()} />
    
      <View style={styling.component}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.backgroundSecondary]}
          style={styling.gradient}
        />
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
  component: {
    height: 240,
    width: '100%',
    borderRadius: 38,
    overflow: 'hidden',
  },
})

PostType.propTypes = {
  theme: PropTypes.any,
}

export default withTheme(PostType)
