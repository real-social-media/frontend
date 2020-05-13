import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
} from 'react-native'
import FormComponent from 'components/Comments/Form'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import CommentComponent from 'components/Comments/Comment'
import SwipeableComponent from 'components/Comments/Swipeable'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Comments = ({
  t,
  theme,
  user,
  commentsAdd,
  commentsAddRequest,
  commentsDeleteRequest,
  postsCommentsGet,
  marginBottom,
  post,
  onViewableItemsChangedRef,
  viewabilityConfigRef,
}) => {
  const styling = styles(theme)
  
  const pseudoCommentVisibility = path(['text', 'length'])(post)
  const pseudoComment = {
    ...post,
    commentedBy: path(['postedBy'])(post),
    commentedAt: path(['postedAt'])(post),
  }

  return (
    <View style={styling.root}>
      <FlatList
        style={styling.comments}
        refreshControl={
          <RefreshControl
            tintColor={theme.colors.border}
            refreshing={postsCommentsGet.status === 'loading'}
          />
        }
        keyExtractor={item => item.commentId}
        data={pathOr([], ['data'])(postsCommentsGet)}
        onViewableItemsChanged={onViewableItemsChangedRef.current}
        viewabilityConfig={viewabilityConfigRef.current}
        ListHeaderComponent={pseudoCommentVisibility ?
          <View style={styling.comment} key="desc">
            <CommentComponent comment={pseudoComment} />
          </View>
        : null}
        renderItem={({ item: comment, index }) => (
          <View style={styling.comment}>
            {(
              path(['postedBy', 'userId'])(post) === user.userId ||
              comment.commentedBy.userId === user.userId
            ) ?
              <SwipeableComponent onPress={() => commentsDeleteRequest({ commentId: comment.commentId })}>
                <CommentComponent comment={comment} />
              </SwipeableComponent>
            : null}

            {comment.commentedBy.userId !== user.userId ?
              <CommentComponent comment={comment} />
            : null}
          </View>
        )}
      />
      <View style={{ marginBottom }}>
        <FormComponent
          commentsAdd={commentsAdd}
          commentsAddRequest={commentsAddRequest}
        />
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  comments: {
    flex: 1,
  },
  comment: {
    paddingHorizontal: theme.spacing.base,
    marginBottom: theme.spacing.base,
  },
  form: {
    ...ifIphoneX({
      paddingBottom: 40,
    }, {
      paddingBottom: 0,
    }),
  }
})

Comments.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  user: PropTypes.any,
  commentsAdd: PropTypes.any,
  commentsAddRequest: PropTypes.any,
  commentsDeleteRequest: PropTypes.any,
  postsCommentsGet: PropTypes.any,
  marginBottom: PropTypes.any,
  post: PropTypes.any,
  onViewableItemsChangedRef: PropTypes.any,
  viewabilityConfigRef: PropTypes.any,
}

export default withTranslation()(withTheme(Comments))
