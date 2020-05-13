import React from 'react'

import PostMediaScreen from 'screens/PostMediaScreen'
import PostLikesScreen from 'screens/PostLikesScreen'
import PostViewsScreen from 'screens/PostViewsScreen'
import PostShareScreen from 'screens/PostShareScreen'
import ProfileScreen from 'screens/ProfileScreen'
import ProfileFollowedScreen from 'screens/ProfileFollowedScreen'
import ProfileFollowerScreen from 'screens/ProfileFollowerScreen'
import AlbumScreen from 'screens/AlbumScreen'
import AlbumsScreen from 'screens/AlbumsScreen'
import AlbumCreateScreen from 'screens/AlbumCreateScreen'
import AlbumEditScreen from 'screens/AlbumEditScreen'
import PostEditScreen from 'screens/PostEditScreen'
import PostCreateScreen from 'screens/PostCreateScreen'

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
        {...stackScreenPageProps({ options: { title: 'Following' } })}
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
        name="PostLikes"
        component={PostLikesScreen}
        {...stackScreenPageProps({ options: { title: 'Likes' } })}
      />

      <Stack.Screen
        name="Album"
        component={AlbumScreen}
        {...stackScreenPageProps({ options: { title: 'Album' } })}
      />

      <Stack.Screen
        name="PostShare"
        component={PostShareScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="Albums"
        component={AlbumsScreen}
        {...stackScreenPageProps({ options: { title: 'Albums' } })}
      />

      <Stack.Screen
        name="AlbumCreate"
        component={AlbumCreateScreen}
        {...stackScreenPageProps({ options: { title: 'Create Album' } })}
      />

      <Stack.Screen
        name="AlbumEdit"
        component={AlbumEditScreen}
        {...stackScreenPageProps({ options: { title: 'Edit Album' } })}
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
    </>
  )
}
