import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native'
import FeedComponent from 'components/Profile/Feed'
import AlbumsComponent from 'components/Profile/Albums'
import { TabView, TabBar, SceneMap, ScrollPager } from 'react-native-tab-view'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const ProfileTabView = ({
  index,
  setIndex,
  routes,
}) => {
  const renderScene = SceneMap({
    feed: FeedComponent,
    albums: AlbumsComponent,
  })

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: 'transparent' }}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color, margin: 8 }}>
          {route.title}
        </Text>
      )}
    />
  )

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      indicatorStyle={{ backgroundColor: 'transparent' }}
      renderTabBar={renderTabBar}
    />
  )
}

const Profile = ({
  theme,
  index,
  setIndex,
  routes,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <ProfileTabView
        index={index}
        setIndex={setIndex}
        routes={routes}
      />
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
})

Profile.propTypes = {
  theme: PropTypes.any,
  usersGetProfile: PropTypes.any,
  authUser: PropTypes.any,
  usersBlock: PropTypes.any,
  usersBlockRequest: PropTypes.any,
  usersUnblock: PropTypes.any,
  usersUnblockRequest: PropTypes.any,
  usersFollow: PropTypes.any,
  usersFollowRequest: PropTypes.any,
  usersUnfollow: PropTypes.any,
  usersUnfollowRequest: PropTypes.any,
  postsGet: PropTypes.any,
}

export default withTheme(Profile)
