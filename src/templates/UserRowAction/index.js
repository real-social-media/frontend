import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { withTranslation } from 'react-i18next'

const UserRowActionTemplate = ({
  t,
  followActive,
  followLoading,
  onFollowPress,
  unfollowActive,
  unfollowLoading,
  onUnfollowPress,
  requestActive,
  requestLoading,
  onRequestedPress,
  replyActive,
  onReplyPress,
  replyLoading,
  onDeclinePress,
  declineLoading,
}) => {
  return (
    <View accessibilityLabel="User Row" style={styles.root}>
      <View style={styles.component}>
        {!replyActive && followActive ? (
          <DefaultButton
            label={t('Follow')}
            onPress={onFollowPress}
            loading={followLoading}
            disabled={followLoading}
            mode="outlined"
            size="compact"
          />
        ) : null}

        {!replyActive && unfollowActive ? (
          <DefaultButton
            label={t('Unfollow')}
            onPress={onUnfollowPress}
            loading={unfollowLoading}
            disabled={unfollowLoading}
            mode="outlined"
            size="compact"
          />
        ) : null}

        {!replyActive && requestActive ? (
          <DefaultButton
            label={t('Pending')}
            onPress={onRequestedPress}
            loading={requestLoading}
            disabled={requestLoading}
            mode="outlined"
            size="compact"
          />
        ) : null}

        {replyActive ? (
          <View style={styles.group}>
            <DefaultButton
              style={styles.acceptBtn}
              label={t('Accept')}
              onPress={onReplyPress}
              loading={replyLoading}
              disabled={replyLoading || declineLoading}
              size="compact"
            />
            <DefaultButton
              label={t('Decline')}
              onPress={onDeclinePress}
              loading={declineLoading}
              disabled={replyLoading || declineLoading}
              mode="outlined"
              size="compact"
            />
          </View>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
  },
  acceptBtn: {
    marginRight: 10,
  },
})

UserRowActionTemplate.propTypes = {
  t: PropTypes.any,
  followActive: PropTypes.bool,
  followLoading: PropTypes.bool,
  onFollowPress: PropTypes.func,
  unfollowActive: PropTypes.bool,
  unfollowLoading: PropTypes.bool,
  onUnfollowPress: PropTypes.func,
  requestActive: PropTypes.bool,
  requestLoading: PropTypes.bool,
  onRequestedPress: PropTypes.func,
  replyActive: PropTypes.bool,
  onReplyPress: PropTypes.func,
  replyLoading: PropTypes.bool,
  onDeclinePress: PropTypes.func,
  declineLoading: PropTypes.bool,
}

UserRowActionTemplate.defaultProps = {
  followActive: false,
  followLoading: false,
  unfollowActive: false,
  unfollowLoading: false,
  requestActive: false,
  requestLoading: false,
  replyActive: false,
  replyLoading: false,
  declineLoading: false,
}

export default withTranslation()(UserRowActionTemplate)
