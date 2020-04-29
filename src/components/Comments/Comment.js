import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { Paragraph, Caption, Text } from 'react-native-paper'
import Avatar from 'templates/Avatar'
import dayjs from 'dayjs'
import * as navigationActions from 'navigation/actions'
import reactStringReplace from 'react-string-replace'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Comment = ({
  t,
  theme,
  comment,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  const regex = /(?:@)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/g

  return (
    <View style={styling.root}>
      <TouchableOpacity style={styling.image} onPress={navigationActions.navigateProfile(navigation, { user: comment.commentedBy })}>
        <Avatar
          active={path(['commentedBy', 'stories', 'items', 'length'])(comment) || false}
          thumbnailSource={{ uri: path(['commentedBy', 'photo', 'url64p'])(comment) }}
          imageSource={{ uri: path(['commentedBy', 'photo', 'url64p'])(comment) }}
        />
      </TouchableOpacity>
      <View style={styling.comment}>
        <Paragraph>
          {[
            /**
             * Username of comment owner
             */
            <Text key="username" style={styling.author}>{pathOr('', ['commentedBy', 'username'])(comment)} </Text>,

            /**
             * Tagged @username occurrences with attached user object
             */
            ...reactStringReplace(pathOr('', ['text'])(comment).trim(), regex, (match, i) => {
              const tagged = (path(['textTaggedUsers'])(comment) || [])
                .find(textTag => textTag.tag === `@${match}`)

              if (tagged) {
                return (
                  <Text key={match + i} onPress={navigationActions.navigateProfile(navigation, { user: tagged.user })} style={styling.textUsername}>@{match}</Text>
                )
              }
              
              return <Text style={styling.textDefault}>{`@${match}`}</Text>
            })
          ]}
        </Paragraph>
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
    flex: 1,
    marginLeft: theme.spacing.base,
  },
  author: {
    fontWeight: '700',
  },
  textDefault: {
    color: theme.colors.text,
  },
  textUsername: {
    color: theme.colors.primary,
  },
})

Comment.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  comment: PropTypes.any,
}

export default withTranslation()(withTheme(Comment))
