import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import path from 'ramda/src/path'
import reactStringReplace from 'react-string-replace'
import UserServiceProvider from 'services/providers/User'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const Description = ({
  theme,
  navigation,
  post,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const regex = /(?:@)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/g
  
  return (
    <UserServiceProvider navigation={navigation}>
      {((userProps) => (
        <View style={styling.root}>
          {/**
           * Using array based component rendering becauase having a hirarchy like:
           * Text -> View -> Text will not render correctly. Therefore parsing a string
           * to find @username pattern, then calculating the theme of next user route param
           * and returning navigation function.
           */}
          {path(['text', 'length'])(post) ?
            <View style={styling.text}>
              {[
                /**
                 * Username of post owner
                 */
                <TouchableOpacity key="username" onPress={userProps.handleProfilePress(post.postedBy)}>
                  <Text key="username" style={styling.username}>{post.postedBy.username} </Text>
                </TouchableOpacity>,

                /**
                 * Tagged @username occurrences with attached user object
                 */
                ...reactStringReplace(post.text, regex, (match, i) => {
                  const tagged = (path(['textTaggedUsers'])(post) || [])
                    .find(textTag => textTag.tag === `@${match}`)

                  if (tagged) {
                    return (
                      <TouchableOpacity key={match + i} onPress={userProps.handleProfilePress(tagged.user)}>
                        <Text style={styling.textUsername}>@{match}</Text>
                      </TouchableOpacity>
                    )
                  }
                  
                  return `@${match}`
                })
              ].map(
                item => {
                  if (typeof item === 'string') {
                    return <Text style={styling.textDefault}>{item}</Text>
                  }
                  return item
                }
              )}
            </View>
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
  desc: {
    padding: theme.spacing.base,
    flexDirection: 'row',
    backgroundColor: 'red',
  },
  username: {
    color: theme.colors.text,
    fontWeight: '500',
  },
  text: {
    padding: theme.spacing.base,
    flexDirection: 'row',
    flexWrap: 'wrap',
    color: 'red',
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

export default withNavigation(
  withTheme(Description)
)
