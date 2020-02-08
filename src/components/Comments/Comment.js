import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Paragraph, Caption } from 'react-native-paper'
import Avatar from 'templates/Avatar'
import path from 'ramda/src/path'
import dayjs from 'dayjs'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const Comment = ({
  theme,
  comment,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <View style={styling.image}>
        <Avatar
          thumbnailSource={{ uri: path(['commentedBy', 'photoUrl64p'])(comment) }}
          imageSource={{ uri: path(['commentedBy', 'photoUrl64p'])(comment) }}
        />
      </View>
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
