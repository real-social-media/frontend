import * as actions from './actions'
import {credentials} from '../../helpers/users'
import {tap, toBeVisible, waitForElement} from '../../helpers/utils'
import {AuthPhotoScreen, FeedScreen} from './../../helpers/screens'

describe('Feature: Upload Profile Picture', () => {
  beforeAll(async () => {
    await device.launchApp({permissions: {notifications: 'YES'}, newInstance: true})
  })

  describe('As a new user I want skip upload profile picture', () => {
    describe('Rule: Skip by header button tap', () => {
      it('Given: New user on upload profile picture screen', async () => {
        await actions.signIn(credentials)
        await waitForElement(AuthPhotoScreen.root)
      })

      it('Then click to the skip button', async () => {
        await toBeVisible(AuthPhotoScreen.header.skipBtn)
        await tap(AuthPhotoScreen.header.skipBtn)
      })

      it('Then feed screen opened', async () => {
        await toBeVisible(FeedScreen.root)
      })
    })

    describe('Rule: Skip by actions button tap', () => {
      it('Given: New user on upload profile picture screen', async () => {
        await device.reloadReactNative()
        await waitForElement(AuthPhotoScreen.root)
      })

      it('Then click to the skip button', async () => {
        await toBeVisible(AuthPhotoScreen.actions.skipBtn)
        await tap(AuthPhotoScreen.actions.skipBtn)
      })

      it('Then feed screen opened', async () => {
        await toBeVisible(FeedScreen.root)
      })
    })
  })
})
