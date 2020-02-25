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
import UserServiceProvider from 'services/providers/User'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const ReactionsPreviewTemplate = ({
  theme,
  post,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()

  if (path(['postedBy', 'likesDisabled'])(post) || post.likesDisabled) {
    return null
  }

  return (
    <UserServiceProvider navigation={navigation}>
      {((userProps) => (
        <View style={styling.root}>
          <View style={styling.row}>
            {path(['onymouslyLikedBy', 'items', '0', 'username'])(post) ?
              <View style={styling.profile}>
                <Avatar
                  size="micro"
                  thumbnailSource={{ uri: path(['onymouslyLikedBy', 'items', '0', 'photoUrl64p'])(post) }}
                  imageSource={{ uri: path(['onymouslyLikedBy', 'items', '0', 'photoUrl64p'])(post) }}
                />
              </View>
            : null}

            {path(['onymouslyLikedBy', 'items', '0', 'username'])(post) ?
              <View style={styling.row}>
                <TouchableOpacity onPress={() => navigation.navigate('PostLikes')}>
                  <Text style={styling.text}>
                    {t('liked first by')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={userProps.handleProfilePress(path(['onymouslyLikedBy', 'items', '0'])(post))}>
                  <Text style={styling.text}>
                    {path(['onymouslyLikedBy', 'items', '0', 'username'])(post)}
                  </Text>
                </TouchableOpacity>
              </View>
            : null}
          </View>
        </View>
      ))}
    </UserServiceProvider>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    paddingHorizontal: theme.spacing.base,
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
})

ReactionsPreviewTemplate.defaultProps = {
}

ReactionsPreviewTemplate.propTypes = {
  theme: PropTypes.any,
  children: PropTypes.any,
  post: PropTypes.any,
}

export default withTheme(ReactionsPreviewTemplate)
