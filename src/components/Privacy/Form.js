import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import RowsComponent from 'templates/Rows'
import RowsItemComponent from 'templates/RowsItem'
import UserRowComponent from 'templates/UserRow'
import path from 'ramda/src/path'
import { Text, Switch, Caption } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Privacy = ({
  theme,
  user,
  togglePrivacyStatus,
  toggleFollowCountsHidden,
  toggleViewCountsHidden,
  toggleLikesDisabled,
  toggleCommentsDisabled,
  toggleSharingDisabled,
  toggleVerificationHidden,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <RowsComponent items={[{
        label: t('Private Account'),
        caption: t('Approve followers'),
        onPress: togglePrivacyStatus,
        enabled: user.privacyStatus === 'PRIVATE',
      }, {
        label: t('Hide Total Followers'),
        caption: t('Followers can\'t view a list of your total followers'),
        onPress: toggleFollowCountsHidden,
        enabled: user.followCountsHidden,
      }, {
        label: t('First Like'),
        caption: t('See the first user to like your post'),
        onPress: toggleLikesDisabled,
        enabled: !user.likesDisabled,
      }, {
        label: t('Comments'),
        caption: t('Followers can comment on posts'),
        onPress: toggleCommentsDisabled,
        enabled: !user.commentsDisabled,
      }, {
        label: t('Share'),
        caption: t('Followers can share posts'),
        onPress: toggleSharingDisabled,
        enabled: !user.sharingDisabled,
      }, {
        label: t('Views count'),
        caption: t('Followers can view total post views'),
        onPress: toggleViewCountsHidden,
        enabled: !user.viewCountsHidden,
      }, {
        label: t('Verification hidden'),
        caption: t('Verification label is hidden'),
        onPress: toggleVerificationHidden,
        enabled: !user.verificationHidden,
      }]}>
        {(privacy) => (
          <RowsItemComponent hasBorders>
            <UserRowComponent
              onPress={path(['onPress'])(privacy)}
              content={
                <View>
                  <Text style={styling.username}>{path(['label'])(privacy)}</Text>
                  <Caption>{path(['caption'])(privacy)}</Caption>
                </View>
              }
              action={
                <Switch
                  value={path(['enabled'])(privacy)}
                  onValueChange={privacy.onPress}
                />
              }
            />
          </RowsItemComponent>
        )}
      </RowsComponent>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  form: {
    padding: theme.spacing.base,
  },
})

Privacy.propTypes = {
  theme: PropTypes.any,
  user: PropTypes.any,
  togglePrivacyStatus: PropTypes.any,
  toggleFollowCountsHidden: PropTypes.any,
}

export default withTheme(Privacy)
