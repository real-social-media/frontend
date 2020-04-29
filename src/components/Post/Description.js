import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import path from 'ramda/src/path'
import reactStringReplace from 'react-string-replace'
import { Text } from 'react-native-paper'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Description = ({
  t,
  theme,
  post,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  const regex = /(?:@)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/g
  const visibility = path(['text', 'length'])(post)

  if (!visibility) {
    return null
  }
  
  return (
    <TouchableOpacity style={styling.root} onPress={navigationActions.navigateComments(navigation, { post })}>
      <Text style={styling.text} numberOfLines={4} ellipsizeMode="tail">
        {[
          /**
           * Username of post owner
           */
          <Text key="username" onPress={navigationActions.navigateProfile(navigation, { user: post.postedBy })} style={styling.username}>{post.postedBy.username} </Text>,

          /**
           * Tagged @username occurrences with attached user object
           */
          ...reactStringReplace(post.text.trim(), regex, (match, i) => {
            const tagged = (path(['textTaggedUsers'])(post) || [])
              .find(textTag => textTag.tag === `@${match}`)

            if (tagged) {
              return (
                <Text key={match + i} onPress={navigationActions.navigateProfile(navigation, { user: tagged.user })} style={styling.textUsername}>@{match}</Text>
              )
            }
            
            return <Text style={styling.textDefault}>{`@${match}`}</Text>
          })
        ]}
      </Text>
    </TouchableOpacity>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    paddingHorizontal: theme.spacing.base,
    marginBottom: 6,
  },
  likes: {
  },
  username: {
    color: theme.colors.text,
    fontWeight: '700',
  },
  text: {
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
  t: PropTypes.any,
}

export default withTranslation()(withTheme(Description))
