import React from 'react'

import StoryScreen from 'screens/StoryScreen'
import PostEditScreen from 'screens/PostEditScreen'
import PostMediaScreen from 'screens/PostMediaScreen'
import PostLikesScreen from 'screens/PostLikesScreen'
import PostViewsScreen from 'screens/PostViewsScreen'
import PostShareScreen from 'screens/PostShareScreen'
import ProfileScreen from 'screens/ProfileScreen'
import AlbumScreen from 'screens/AlbumScreen'
import CommentsScreen from 'screens/CommentsScreen'
import ProfileFollowedScreen from 'screens/ProfileFollowedScreen'
import ProfileFollowerScreen from 'screens/ProfileFollowerScreen'
import VerificationScreen from 'screens/VerificationScreen'

export const media = ({
  Stack,
  stackScreenCardProps,
  stackScreenPageProps,
}) => {
  return (
    <>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        {...stackScreenPageProps({ options: { title: 'Profile' } })}
      />

      <Stack.Screen
        name="PostMedia"
        component={PostMediaScreen}
        {...stackScreenPageProps({ options: { title: 'Profile' } })}
      />

      <Stack.Screen
        name="ProfileFollowed"
        component={ProfileFollowedScreen}
        {...stackScreenPageProps({ options: { title: 'Followed' } })}
      />

      <Stack.Screen
        name="ProfileFollower"
        component={ProfileFollowerScreen}
        {...stackScreenPageProps({ options: { title: 'Followers' } })}
      />

      <Stack.Screen
        name="Story"
        component={StoryScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="PostEdit"
        component={PostEditScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="PostLikes"
        component={PostLikesScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="PostViews"
        component={PostViewsScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="PostShare"
        component={PostShareScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="Album"
        component={AlbumScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="Verification"
        component={VerificationScreen}
        {...stackScreenCardProps}
      />
    </>
  )
}
