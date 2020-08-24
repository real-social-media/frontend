import * as actions from './actions'
import {credentials} from '../../helpers/users'
import {tap, toBeVisible} from '../../helpers/utils'
import {SettingsScreen, ProfileScreen, AuthHomeScreen, Navigation} from './../../helpers/screens'

describe('Feature: Logout', () => {
  beforeAll(async () => {
    await device.launchApp({permissions: {notifications: 'YES'}, newInstance: true})
    await actions.signIn(credentials)
    await actions.skipUploadProfilePicture()
  })

  describe('As authorized user I want to be able to signout', () => {
    it('Given: Authorized user on his profile screen', async () => {
      await toBeVisible(Navigation.tabNavigator.profile)
      await tap(Navigation.tabNavigator.profile)
      await toBeVisible(ProfileScreen.root)
    })

    it('Then click to the settings button', async () => {
      await tap(ProfileScreen.actions.settingsBtn)
    })

    it('When settings screen opened', async () => {
      await toBeVisible(SettingsScreen.root)
    })

    it('Then click to the signout button', async () => {
      await tap(SettingsScreen.actions.signOutBtn)
    })

    it('Then unauthorized user on auth home screen', async () => {
      await toBeVisible(AuthHomeScreen.root)
    })
  })
})
