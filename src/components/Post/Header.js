import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import ActionSheet from 'components/ActionSheet'
import { Text, Caption } from 'react-native-paper'
import path from 'ramda/src/path'
import Avatar from 'templates/Avatar'
import MoreIcon from 'assets/svg/action/More'
import BellIcon from 'assets/svg/action/Bell'
import VerificationIcon from 'assets/svg/action/Verification'
import dayjs from 'dayjs'
import * as navigationActions from 'navigation/actions'
import * as UserService from 'services/User'
import * as PrivacyService from 'services/Privacy'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'
import testIDs from './test-ids'

const Header = ({
  t,
  theme,
  user,
  post,
  postsArchiveRequest,
  postsFlagRequest,
  postsDeleteRequest,
  postsRestoreArchivedRequest,
  handlePostShare,
  createActionSheetRef,
  actionSheetRef,
  navigation,
}) => {
  const styling = styles(theme)

  const handleOptionsPress = () => actionSheetRef && actionSheetRef.show()
  const archived = path(['postStatus'])(post) === 'ARCHIVED'
  const repostedUsername = path(['originalPost', 'postedBy', 'username'])(post)

  const repostVisiblity = useMemo(() => PrivacyService.postRepostVisiblity(post), [post])
  const verificationVisibility = useMemo(() => PrivacyService.postVerificationVisibility(post), [post])
  const expiryVisiblity = useMemo(() => PrivacyService.postExpiryVisiblity(post), [post])

  const isUserPostOwner = path(['userId'])(user) === path(['postedBy', 'userId'])(post)

  const onProfilePhotoPress = () => {
    const hasStories = path(['stories', 'items', 'length'])(post.postedBy)
    if (hasStories) {
      navigationActions.navigateStory(navigation, {
        user: post.postedBy,
        usersGetFollowedUsersWithStories: { data: [post.postedBy] },
      })()
    } else {
      navigationActions.navigateProfile(navigation, { userId: post.postedBy.userId })()
    }
  }

  return (
    <View style={styling.header}>
      <TouchableOpacity onPress={onProfilePhotoPress}>
        <Avatar
          active={UserService.hasActiveStories(path(['postedBy'])(post))}
          thumbnailSource={{ uri: path(['postedBy', 'photo', 'url64p'])(post) }}
          imageSource={{ uri: path(['postedBy', 'photo', 'url64p'])(post) }}
          themeCode={path(['postedBy', 'themeCode'])(post)}
        />
      </TouchableOpacity>

      <View style={styling.headerText}>
        <TouchableOpacity onPress={navigationActions.navigateProfile(navigation, { userId: post.postedBy.userId })}>
          <Text style={styling.headerUsername}>{path(['postedBy', 'username'])(post)}</Text>
        </TouchableOpacity>

        {repostVisiblity ? (
          <TouchableOpacity
            style={styling.verification}
            onPress={navigationActions.navigateProfile(navigation, { userId: post.originalPost.postedBy.userId })}
          >
            <Caption style={styling.headerStatus}>
              {t('Reposted from {{ username }}', { username: repostedUsername })}
            </Caption>
          </TouchableOpacity>
        ) : null}

        {expiryVisiblity ? (
          <View style={styling.verification}>
            <Caption style={styling.headerStatus}>
              {t('Expires {{expiry}}', { expiry: dayjs(post.expiresAt).from(dayjs()) })}
            </Caption>
          </View>
        ) : null}

        {verificationVisibility ? (
          <TouchableOpacity
            onPress={navigationActions.navigateVerification(navigation, { actionType: 'BACK', post })}
            style={styling.verification}
          >
            <Caption style={styling.verificationStatus}>
              {t('Failed Verification')} - {t('Learn More')}
            </Caption>
            <VerificationIcon fill="#DC3644" />
          </TouchableOpacity>
        ) : null}
      </View>

      {path(['commentsUnviewedCount'])(post) ? (
        <TouchableOpacity
          style={styling.headerAction}
          onPress={navigationActions.navigateComments(navigation, {
            postId: post.postId,
            userId: post.postedBy.userId,
          })}
        >
          <BellIcon fill="red" />
        </TouchableOpacity>
      ) : null}

      <React.Fragment>
        <TouchableOpacity
          testID={testIDs.header.openDropDownMenu}
          style={styling.headerAction}
          onPress={handleOptionsPress}
        >
          <MoreIcon fill={theme.colors.primaryIcon} />
        </TouchableOpacity>

        <ActionSheet
          testID={testIDs.header.openDropDownMenu}
          actionSheetRef={createActionSheetRef}
          options={[
            {
              name: t('Restore from Archived'),
              onPress: () => postsRestoreArchivedRequest({ postId: post.postId }),
              isVisible: isUserPostOwner && archived,
            },
            {
              name: t('Share'),
              onPress: () => handlePostShare(),
              isVisible: !archived,
            },
            {
              name: t('Report'),
              onPress: () => postsFlagRequest({ postId: post.postId }),
              isVisible: !isUserPostOwner,
            },
            {
              name: t('Edit'),
              onPress: () => navigationActions.navigatePostEdit(navigation, { post })(),
              isVisible: isUserPostOwner && !archived,
            },
            {
              name: t('Archive'),
              onPress: () => postsArchiveRequest({ postId: post.postId, userId: path(['postedBy', 'userId'])(post) }),
              isVisible: isUserPostOwner && !archived,
            },
            {
              name: t('Delete'),
              onPress: () => postsDeleteRequest({ postId: post.postId, userId: path(['postedBy', 'userId'])(post) }),
              isVisible: isUserPostOwner && !archived,
              isDestructive: true,
            },
            {
              name: t('Cancel'),
              onPress: () => {},
              isCancel: true,
            },
          ]}
        />
      </React.Fragment>
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.base,
    },
    headerText: {
      paddingHorizontal: 8,
      justifyContent: 'center',
      flex: 1,
    },
    headerAction: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 38,
      width: 38,
    },
    headerUsername: {},
    headerStatus: {
      color: '#676767',
      marginRight: 4,
    },
    verificationStatus: {
      color: '#DC3644',
      marginRight: 4,
    },
    verification: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })

Header.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  user: PropTypes.any,
  post: PropTypes.any,
  handleEditPress: PropTypes.any,
  postsArchiveRequest: PropTypes.func,
  postsFlagRequest: PropTypes.func,
  postsDeleteRequest: PropTypes.func,
  postsShareRequest: PropTypes.func,
  postsRestoreArchivedRequest: PropTypes.func,
  handlePostShare: PropTypes.func,
  createActionSheetRef: PropTypes.any,
  actionSheetRef: PropTypes.any,
  navigation: PropTypes.any,
}

export default withTranslation()(withTheme(Header))
