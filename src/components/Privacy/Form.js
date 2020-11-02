import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import RowsComponent from 'templates/Rows'
import RowsItemComponent from 'templates/RowsItem'
import UserRowComponent from 'templates/UserRow'
import path from 'ramda/src/path'
import { Text, Switch, Caption, withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'
import testIDs from 'components/Privacy/test-ids'

const Privacy = ({
  t,
  theme,
  user,
  togglePrivacyStatus,
  toggleFollowCountsHidden,
  toggleLikesDisabled,
  toggleCommentsDisabled,
  toggleSharingDisabled,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <RowsComponent
        items={[
          {
            testID: testIDs.form.privacyStatus,
            label: t('Private Account'),
            caption: t('Approve followers'),
            onPress: togglePrivacyStatus,
            enabled: user.privacyStatus === 'PRIVATE',
          },
          {
            testID: testIDs.form.followCountsHidden,
            label: t('Total Followers'),
            caption: t('Followers can see your other followers'),
            onPress: toggleFollowCountsHidden,
            enabled: !user.followCountsHidden,
          },
          {
            testID: testIDs.form.likesDisabled,
            label: t('Likes'),
            caption: t('Followers can like your posts'),
            onPress: toggleLikesDisabled,
            enabled: !user.likesDisabled,
          },
          {
            testID: testIDs.form.commentsDisabled,
            label: t('Comments'),
            caption: t('Followers can comment on posts'),
            onPress: toggleCommentsDisabled,
            enabled: !user.commentsDisabled,
          },
          {
            testID: testIDs.form.sharingDisabled,
            label: t('Share'),
            caption: t('Followers can share posts'),
            onPress: toggleSharingDisabled,
            enabled: !user.sharingDisabled,
          },
        ]}
      >
        {(privacy) => (
          <RowsItemComponent hasBorders>
            <UserRowComponent
              testID={privacy.testID}
              onPress={path(['onPress'])(privacy)}
              content={
                <View>
                  <Text style={styling.username}>{path(['label'])(privacy)}</Text>
                  <Caption>{path(['caption'])(privacy)}</Caption>
                </View>
              }
              action={<Switch value={path(['enabled'])(privacy)} onValueChange={privacy.onPress} />}
            />
          </RowsItemComponent>
        )}
      </RowsComponent>
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {},
    form: {
      padding: theme.spacing.base,
    },
  })

Privacy.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  user: PropTypes.shape({
    privacyStatus: PropTypes.oneOf(['PUBLIC', 'PRIVATE']),
    followCountsHidden: PropTypes.bool,
    likesDisabled: PropTypes.bool,
    commentsDisabled: PropTypes.bool,
    sharingDisabled: PropTypes.bool,
  }),
  togglePrivacyStatus: PropTypes.func.isRequired,
  toggleFollowCountsHidden: PropTypes.func.isRequired,
  toggleLikesDisabled: PropTypes.func.isRequired,
  toggleCommentsDisabled: PropTypes.func.isRequired,
  toggleSharingDisabled: PropTypes.func.isRequired,
}

export default withTranslation()(withTheme(Privacy))
