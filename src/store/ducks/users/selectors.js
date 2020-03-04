import { createSelector } from 'reselect'
import update from 'immutability-helper'
import pathOr from 'ramda/src/pathOr'

export const usersGetProfileSelector = createSelector(
  state => state.users.usersGetProfile,
  usersGetProfile => update(usersGetProfile, {
    data: {
      $set: {
        username: pathOr('', ['data', 'username'], usersGetProfile),
        fullName: pathOr('', ['data', 'fullName'], usersGetProfile),
        bio: pathOr('', ['data', 'bio'], usersGetProfile),
        email: pathOr('', ['data', 'email'], usersGetProfile),
        phoneNumber: pathOr('', ['data', 'phoneNumber'], usersGetProfile),
        privacyStatus: pathOr('', ['data', 'privacyStatus'], usersGetProfile),
        followCountsHidden: pathOr('', ['data', 'followCountsHidden'], usersGetProfile),
        viewCountsHidden: pathOr('', ['data', 'viewCountsHidden'], usersGetProfile),
        photo: {
          url: pathOr('', ['data', 'photo', 'url'], usersGetProfile),
          url64p: pathOr('', ['data', 'photo', 'url64p'], usersGetProfile),
          url480p: pathOr('', ['data', 'photo', 'url480p'], usersGetProfile),
          url1080p: pathOr('', ['data', 'photo', 'url1080p'], usersGetProfile),
          url4k: pathOr('', ['data', 'photo', 'url4k'], usersGetProfile),
        },
      },
    },
  })
)