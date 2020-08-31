import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import * as navigationActions from 'navigation/actions'
import pathOr from 'ramda/src/pathOr'
import reactStringReplace from 'react-string-replace'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Comment = ({ t, theme, post }) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  const regex = /(?:@)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/g

  return (
    <TouchableOpacity
      onPress={navigationActions.navigateComments(navigation, { postId: post.postId, userId: post.postedBy.userId })}
      style={styling.root}
    >
      {pathOr(0, ['commentsCount'], post) > 3 ? <Text style={styling.count}>{t('View all comments')}</Text> : null}

      {pathOr([], ['comments', 'items'], post).map((comment, key) => (
        <Text style={styling.comment} numberOfLines={4} ellipsizeMode="tail" key={key}>
          {[
            /**
             * Username of post owner
             */
            <Text key="username" style={styling.author}>
              {pathOr('', ['commentedBy', 'username'])(comment)}{' '}
            </Text>,

            /**
             * Tagged @username occurrences with attached user object
             */
            ...reactStringReplace(pathOr('', ['text'])(comment).trim(), regex, (match, i) => {
              const tagged = (path(['textTaggedUsers'])(comment) || []).find((textTag) => textTag.tag === `@${match}`)

              if (tagged) {
                return (
                  <Text
                    key={match + i}
                    onPress={navigationActions.navigateProfile(navigation, { userId: tagged.user.userId })}
                    style={styling.textUsername}
                  >
                    @{match}
                  </Text>
                )
              }

              return <Text style={styling.textDefault}>{`@${match}`}</Text>
            }),
          ]}
        </Text>
      ))}
    </TouchableOpacity>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      paddingHorizontal: theme.spacing.base,
      marginBottom: 6,
    },
    comment: {
      marginBottom: 4,
      flex: 1,
    },
    count: {
      paddingVertical: 6,
      opacity: 0.6,
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
  post: PropTypes.any,
}

export default withTranslation()(withTheme(Comment))
