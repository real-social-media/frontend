import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import path from 'ramda/src/path'
import reactStringReplace from 'react-string-replace'
import UserServiceProvider from 'services/providers/User'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Description = ({
  theme,
  post,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  const { t } = useTranslation()
  const regex = /(?:@)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/g
  
  return (
    <UserServiceProvider navigation={navigation}>
      {((userProps) => (
        <View style={styling.root}>
          {path(['text', 'length'])(post) ?
            <Text style={styling.text}>
              {[
                /**
                 * Username of post owner
                 */
                <Text key="username" onPress={userProps.handleProfilePress(post.postedBy)} style={styling.username}>{post.postedBy.username} </Text>,

                /**
                 * Tagged @username occurrences with attached user object
                 */
                ...reactStringReplace(post.text.trim(), regex, (match, i) => {
                  const tagged = (path(['textTaggedUsers'])(post) || [])
                    .find(textTag => textTag.tag === `@${match}`)

                  if (tagged) {
                    return (
                      <Text key={match + i} onPress={userProps.handleProfilePress(tagged.user)} style={styling.textUsername}>@{match}</Text>
                    )
                  }
                  
                  return <Text style={styling.textDefault}>{`@${match}`}</Text>
                })
              ]}
            </Text>
          : null}
        </View>
      ))}
    </UserServiceProvider>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  likes: {
  },
  username: {
    color: theme.colors.text,
    fontWeight: '500',
  },
  text: {
    paddingHorizontal: theme.spacing.base,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textDefault: {
    color: theme.colors.text,
  },
  textUsername: {
    color: theme.colors.primary,
  },
})

Description.propTypes = {
  theme: PropTypes.any,
  post: PropTypes.any,
}

export default withTheme(Description)
