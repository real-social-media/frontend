import * as actions from './actions'

describe('Feature: Upload Profile Picture', () => {
  beforeAll(async () => {
    await device.launchApp({permissions: {notifications: 'YES'}, newInstance: true})
  })

  describe('As a new user I want skip upload profile picture', () => {
    describe('Rule: Skip by header button tap', () => {
      it('Given: New user on upload profile picture screen', async () => {
        await actions.signIn()
        await expect(element(by.id('components/AuthPhoto'))).toBeVisible()
      })

      it('Then click to the skip button', async () => {
        await expect(element(by.id('components/AuthPhoto/HeaderRight/SkipBtn'))).toBeVisible()
        await element(by.id('components/AuthPhoto/HeaderRight/SkipBtn')).tap()
      })

      it('Then feed screen opened', async () => {
        await expect(element(by.id('components/Feed'))).toBeVisible()
      })
    })

    describe('Rule: Skip by actions button tap', () => {
      it('Given: New user on upload profile picture screen', async () => {
        await device.reloadReactNative()
        await expect(element(by.id('components/AuthPhoto'))).toBeVisible()
      })

      it('Then click to the skip button', async () => {
        await expect(element(by.id('components/AuthPhoto/Actions/skip'))).toBeVisible()
        await element(by.id('components/AuthPhoto/Actions/skip')).tap()
      })

      it('Then feed screen opened', async () => {
        await expect(element(by.id('components/Feed'))).toBeVisible()
      })
    })
  })
})
