import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'

import { withTranslation } from 'react-i18next'

const UserRowActionTemplate = ({
  t,
  followActive,
  followloading,
  onFollowPress,
  unfollowActive,
  unfollowloading,
  onUnfollowPress,
  requestActive,
  requestloading,
  onRequestedPress,
  replyActive,
  onReplyPress,
  replyloading,
}) => {
  const styling = styles

  return (
    <View style={styling.root}>
      <View style={styling.component}>
        {!replyActive && followActive ? (
          <DefaultButton
            label={t('Follow')}
            onPress={onFollowPress}
            loading={followloading}
            mode="outlined"
            size="compact"
          />
        ) : null}

        {!replyActive && unfollowActive ? (
          <DefaultButton
            label={t('Unfollow')}
            onPress={onUnfollowPress}
            loading={unfollowloading}
            mode="outlined"
            size="compact"
          />
        ) : null}

        {!replyActive && requestActive ? (
          <DefaultButton
            label={t('Pending')}
            onPress={onRequestedPress}
            loading={requestloading}
            mode="outlined"
            size="compact"
          />
        ) : null}

        {replyActive ? (
          <DefaultButton
            label={t('Accept')}
            onPress={onReplyPress}
            loading={replyloading}
            mode="outlined"
            size="compact"
          />
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {},
  component: {
    width: 90,
  },
  avatar: {},
  content: {},
  action: {},
})

UserRowActionTemplate.defaultProps = {}

UserRowActionTemplate.propTypes = {
  t: PropTypes.any,
  followActive: PropTypes.any,
  followloading: PropTypes.any,
  onFollowPress: PropTypes.any,
  unfollowActive: PropTypes.any,
  unfollowloading: PropTypes.any,
  onUnfollowPress: PropTypes.any,
  requestActive: PropTypes.any,
  requestloading: PropTypes.any,
  onRequestedPress: PropTypes.any,
  replyActive: PropTypes.any,
  onReplyPress: PropTypes.any,
  replyloading: PropTypes.any,
}

export default withTranslation()(UserRowActionTemplate)
