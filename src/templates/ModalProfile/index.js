import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Text, Caption } from 'react-native-paper'
import Avatar from 'templates/Avatar'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Profile = ({
  theme,
  thumbnailSource,
  imageSource,
  title,
  subtitle,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.profile}>
      <Avatar
        thumbnailSource={thumbnailSource}
        imageSource={imageSource}
      />

      <View style={styling.profileText}>
        <Text>{title}</Text>
        <Caption>{subtitle}</Caption>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileText: {
    paddingHorizontal: theme.spacing.base,
  },
})

Profile.propTypes = {
  theme: PropTypes.any,
  thumbnailSource: PropTypes.any,
  imageSource: PropTypes.any,
  title: PropTypes.any,
  subtitle: PropTypes.any,
}

export default withTheme(Profile)
