import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { Caption, Paragraph } from 'react-native-paper'
import Avatar from 'templates/Avatar'
import dayjs from 'dayjs'
import * as navigationActions from 'navigation/actions'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'
import MoreIcon from 'assets/svg/comment/More'
import * as UserService from 'services/User'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Username from 'components/Post/Username'
import linkifyText from 'services/helpers/linkifyText'

const Comment = ({
  theme,
  comment,
  tappable,
  handleTap,
  handleUserReply,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <View style={styling.root}>
      <TouchableOpacity style={styling.image} onPress={() => navigationActions.navigateProfile(navigation, { userId: comment.commentedBy.userId })}>
        <Avatar
          active={UserService.hasActiveStories(path(['commentedBy'])(comment))}
          thumbnailSource={{ uri: path(['commentedBy', 'photo', 'url64p'])(comment) }}
          imageSource={{ uri: path(['commentedBy', 'photo', 'url64p'])(comment) }}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styling.comment} onPress={() => handleUserReply(comment.commentedBy.username)}>
        <Username user={pathOr(null, ['commentedBy'])(comment)} />
        <Paragraph>
          {linkifyText({
            text: pathOr('', ['text'])(comment).trim(),
            textTaggedUsers: path(['textTaggedUsers'])(comment),
            navigation,
          })}
        </Paragraph>
        <Caption>{dayjs(path(['commentedAt'])(comment)).from(dayjs())} | Reply</Caption>
      </TouchableOpacity>
      <View style={styling.action}>
        {tappable ?
          <TouchableOpacity style={styling.action} onPress={handleTap}>
            <MoreIcon fill={theme.colors.text} />
          </TouchableOpacity>
        : null}
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
  action: {
    width: 18,
    justifyContent: 'center',
  },
})

Comment.propTypes = {
  theme: PropTypes.any,
  comment: PropTypes.any,
  tappable: PropTypes.any,
  handleTap: PropTypes.any,
  handleUserReply: PropTypes.any,
}

export default withTheme(Comment)
