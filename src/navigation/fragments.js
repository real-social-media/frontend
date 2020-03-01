import React from 'react'

import PostMediaScreen from 'screens/PostMediaScreen'
import PostLikesScreen from 'screens/PostLikesScreen'
import PostViewsScreen from 'screens/PostViewsScreen'
import PostShareScreen from 'screens/PostShareScreen'
import ProfileScreen from 'screens/ProfileScreen'
import AlbumScreen from 'screens/AlbumScreen'
import ProfileFollowedScreen from 'screens/ProfileFollowedScreen'
import ProfileFollowerScreen from 'screens/ProfileFollowerScreen'
import VerificationScreen from 'screens/VerificationScreen'
import PostEditScreen from 'screens/PostEditScreen'
import PostCreateScreen from 'screens/PostCreateScreen'
import CommentsScreen from 'screens/CommentsScreen'

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
        {...stackScreenPageProps({ options: { title: 'Post' } })}
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
        name="PostViews"
        component={PostViewsScreen}
        {...stackScreenPageProps({ options: { title: 'Views' } })}
      />

      <Stack.Screen
        name="PostCreate"
        component={PostCreateScreen}
        {...stackScreenPageProps({ options: { title: 'New Post' } })}
      />

      <Stack.Screen
        name="PostEdit"
        component={PostEditScreen}
        {...stackScreenPageProps({ options: { title: 'Edit Post' } })}
      />

      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        {...stackScreenPageProps({ options: { title: 'Comments' } })}
      />

      <Stack.Screen
        name="Album"
        component={AlbumScreen}
        {...stackScreenPageProps({ options: { title: 'Album' } })}
      />

      <Stack.Screen
        name="PostLikes"
        component={PostLikesScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="PostShare"
        component={PostShareScreen}
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
