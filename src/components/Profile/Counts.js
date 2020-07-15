import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { Caption, Headline } from 'react-native-paper'
import path from 'ramda/src/path'
import is from 'ramda/src/is'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ProfileCounts = ({
  t,
  theme,
  usersGetProfile,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  const followersCount = path(['data', 'followersCount'])(usersGetProfile)
  const followedsCount = path(['data', 'followedsCount'])(usersGetProfile)

  const followingVisibility = (
    is(Number)(followedsCount) &&
    (
      path(['data', 'followCountsHidden'])(usersGetProfile) !== true ||
      path(['data', 'followedStatus'])(usersGetProfile) === 'SELF'
    ) && !(
      path(['data', 'followedStatus'])(usersGetProfile) === 'NOT_FOLLOWING' &&
      path(['data', 'privacyStatus'])(usersGetProfile) === 'PRIVATE'
    )
  )

  const followerVisibility = (
    is(Number)(followersCount) &&
    (
      path(['data', 'followCountsHidden'])(usersGetProfile) !== true ||
      path(['data', 'followedStatus'])(usersGetProfile) === 'SELF'
    ) && !(
      path(['data', 'followedStatus'])(usersGetProfile) === 'NOT_FOLLOWING' &&
      path(['data', 'privacyStatus'])(usersGetProfile) === 'PRIVATE'
    )
  )

  return (
    <View style={styling.root}>
      <View style={styling.item}>
        <Headline style={styling.itemTitle}>{path(['data', 'postCount'])(usersGetProfile)}</Headline>
        <Caption style={styling.itemText} numberOfLines={1}>{t('Posts')}</Caption>
      </View>

      {followerVisibility ?
        <TouchableOpacity style={styling.item} onPress={navigationActions.navigateProfileFollower(navigation, { userId: usersGetProfile.data.userId })}>
          <Headline style={styling.itemTitle}>{followersCount}</Headline>
          <Caption style={styling.itemText} numberOfLines={1}>{t('Followers')}</Caption>
        </TouchableOpacity>
      :
        <View style={styling.item}>
          <Headline style={styling.itemTitle}>•</Headline>
          <Caption style={styling.itemText} numberOfLines={1}>{t('Followers')}</Caption>
        </View>
      }

      
      {followingVisibility ?
        <TouchableOpacity style={styling.item} onPress={navigationActions.navigateProfileFollowed(navigation, { userId: usersGetProfile.data.userId })}>
          <Headline style={styling.itemTitle}>{followedsCount}</Headline>
          <Caption style={styling.itemText} numberOfLines={1}>{t('Following')}</Caption>
        </TouchableOpacity>
      :
        <View style={styling.item}>
          <Headline style={styling.itemTitle}>•</Headline>
          <Caption style={styling.itemText} numberOfLines={1}>{t('Following')}</Caption>
        </View>
      }
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    height: 32,
  },
  itemText: {
  },
})

ProfileCounts.propTypes = {
  theme: PropTypes.any,
  usersGetProfile: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withTheme(ProfileCounts))
