import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native'
import ResultComponent from 'components/Search/Result'
import { Caption } from 'react-native-paper'

import PreviewServiceComponent from 'components/Preview/index.service'
import PreviewPostComponent from 'components/Preview/Post'
import PreviewUserComponent from 'components/Preview/User'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const PostLikes = ({
  t,
  theme,
  postsLikesGet,
  usersFollow,
  usersFollowRequest,
  usersUnfollow,
  usersUnfollowRequest,
  usersAcceptFollowerUser,
  usersAcceptFollowerUserRequest,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <View style={styling.info}></View>
      <ScrollView
        refreshControl={
          <RefreshControl tintColor={theme.colors.border} refreshing={postsLikesGet.status === 'loading'} />
        }
      >
        <PreviewServiceComponent>
          {({ postPreviewProps, postUserProps }) => (
            <React.Fragment>
              <PreviewPostComponent {...postPreviewProps} />
              <PreviewUserComponent {...postUserProps} />
            </React.Fragment>
          )}
        </PreviewServiceComponent>

        <ResultComponent
          usersSearch={postsLikesGet}
          usersFollow={usersFollow}
          usersFollowRequest={usersFollowRequest}
          usersUnfollow={usersUnfollow}
          usersUnfollowRequest={usersUnfollowRequest}
          usersAcceptFollowerUser={usersAcceptFollowerUser}
          usersAcceptFollowerUserRequest={usersAcceptFollowerUserRequest}
        />

        <View style={styling.info}>
          <Caption>{t('Only you can see who liked your post')}</Caption>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    info: {
      paddingHorizontal: theme.spacing.base,
      alignItems: 'center',
    },
    content: {
      padding: theme.spacing.base,
    },
  })

PostLikes.propTypes = {
  theme: PropTypes.any,
  postsLikesGet: PropTypes.any,
  usersFollow: PropTypes.any,
  usersFollowRequest: PropTypes.any,
  usersUnfollow: PropTypes.any,
  usersUnfollowRequest: PropTypes.any,
  t: PropTypes.any,
  usersAcceptFollowerUser: PropTypes.any,
  usersAcceptFollowerUserRequest: PropTypes.any,
  postsSingleGet: PropTypes.any,
}

export default withTranslation()(withTheme(PostLikes))
