import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import path from 'ramda/src/path'
import { Text } from 'react-native-paper'
import Avatar from 'templates/Avatar'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ReactionsPreviewTemplate = ({
  t,
  theme,
  post,
  user,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  const visibility = (
    path(['onymouslyLikedBy', 'items', '0', 'username'])(post) &&
    !path(['postedBy', 'likesDisabled'])(post) &&
    !post.likesDisabled &&
    post.postedBy.userId === user.userId
  )
  
  if (!visibility) {
    return null
  }

  return (
    <TouchableOpacity onPress={navigationActions.navigatePostLikes(navigation, { post })}>
      <View style={styling.root}>
        <View style={styling.row}>
          <View style={styling.profile}>
            <Avatar
              size="micro"
              thumbnailSource={{ uri: path(['onymouslyLikedBy', 'items', '0', 'photo', 'url64p'])(post) }}
              imageSource={{ uri: path(['onymouslyLikedBy', 'items', '0', 'photo', 'url64p'])(post) }}
            />
          </View>

          <View style={styling.row}>
            <Text style={styling.text}>
              {t('liked by')}
            </Text>

            <Text style={[styling.text, styling.author]}>
              {path(['onymouslyLikedBy', 'items', '0', 'username'])(post)}
            </Text>

            {post.onymousLikeCount > 1 ?
              <Text style={styling.text}>
                {t('and {{onymousLikeCount}} others', { onymousLikeCount: post.onymousLikeCount - 1 })}
              </Text>
            : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    paddingHorizontal: theme.spacing.base,
    marginBottom: 6,
  },
  profile: {
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    alignItems: 'center',
    marginRight: 4,
  },
  author: {
    fontWeight: '700',
  },
})

ReactionsPreviewTemplate.defaultProps = {
}

ReactionsPreviewTemplate.propTypes = {
  theme: PropTypes.any,
  children: PropTypes.any,
  post: PropTypes.any,
}

export default withTranslation()(withTheme(ReactionsPreviewTemplate))
