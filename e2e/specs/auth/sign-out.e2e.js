import * as actions from './actions'

describe('Feature: Logout', () => {
  beforeAll(async () => {
    await device.launchApp({permissions: {notifications: 'YES'}, newInstance: true})
    await actions.signIn()
    await actions.skipUploadProfilePicture()
  })

  describe('As authorized user I want to be able to signout', () => {
    it('Given: Authorized user on his profile screen', async () => {
      await element(by.id('navigation/TabNavigator/ProfileTab')).tap()
      await expect(element(by.id('components/Profile'))).toBeVisible()
    })

    it('Then click to the settings button', async () => {
      await element(by.id('components/Profile/Action/Settings')).tap()
    })

    it('When settings screen opened', async () => {
      await expect(element(by.id('components/Settings'))).toBeVisible()
    })

    it('Then click to the signout button', async () => {
      await element(by.id('components/Settings/Actions/Signout')).tap()
    })

    it('Then unauthorized user on auth home screen', async () => {
      await expect(element(by.id('components/AuthHome'))).toBeVisible()
    })
  })
})
