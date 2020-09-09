import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { Caption, Headline } from 'react-native-paper'
import path from 'ramda/src/path'
import * as navigationActions from 'navigation/actions'
import * as PrivacyService from 'services/Privacy'

import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'
import testIDs from './test-ids'

const ProfileCounts = ({
  t,
  usersGetProfile,
}) => {
  const styling = styles
  const navigation = useNavigation()

  const followersCount = path(['data', 'followersCount'])(usersGetProfile)
  const followedsCount = path(['data', 'followedsCount'])(usersGetProfile)
  const postCount = path(['data', 'postCount'])(usersGetProfile)

  const followingVisibility = useMemo(() => PrivacyService.userFollowingVisibility(usersGetProfile.data), [usersGetProfile.data])
  const followerVisibility = useMemo(() => PrivacyService.userFollowerVisibility(usersGetProfile.data), [usersGetProfile.data])

  return (
    <View style={styling.root}>
      <View style={styling.item}>
        <Headline style={styling.itemTitle}>{postCount}</Headline>
        <Caption style={styling.itemText} numberOfLines={1}>{t('Posts')}</Caption>
      </View>

      {followerVisibility ?
        <TouchableOpacity testID={testIDs.counts.followers} style={styling.item} onPress={navigationActions.navigateProfileFollower(navigation, { userId: usersGetProfile.data.userId })}>
          <Headline style={styling.itemTitle}>{followersCount}</Headline>
          <Caption style={styling.itemText} numberOfLines={1}>{t('Followers')}</Caption>
        </TouchableOpacity>
      :
        <View testID={testIDs.counts.followers} style={styling.item}>
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

const styles = StyleSheet.create({
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
  t: PropTypes.any,
  usersGetProfile: PropTypes.shape({
    data: PropTypes.shape({
      userId: PropTypes.string,
      followersCount: PropTypes.number,
      followedsCount: PropTypes.number,
      postCount: PropTypes.number, 
    }),
  }),
}

export default withTranslation()(ProfileCounts)
