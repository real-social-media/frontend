import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { Paragraph, Caption } from 'react-native-paper'
import Avatar from 'templates/Avatar'
import path from 'ramda/src/path'
import dayjs from 'dayjs'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Comment = ({
  theme,
  comment,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()

  return (
    <View style={styling.root}>
      <TouchableOpacity style={styling.image} onPress={navigationActions.navigateProfile(navigation, { user: comment.commentedBy })}>
        <Avatar
          thumbnailSource={{ uri: path(['commentedBy', 'photo', 'url64p'])(comment) }}
          imageSource={{ uri: path(['commentedBy', 'photo', 'url64p'])(comment) }}
        />
      </TouchableOpacity>
      <View style={styling.comment}>
        <Paragraph>{path(['text'])(comment)}</Paragraph>
        <Caption>{dayjs(path(['commentedAt'])(comment)).from(dayjs())}</Caption>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
  },
  comment: {
    marginLeft: theme.spacing.base,
  },
})

Comment.propTypes = {
  theme: PropTypes.any,
}

export default withTheme(Comment)
