import {credentials} from './data.mock'

describe('Feature: Sign in', () => {
  beforeAll(async () => {
    await device.launchApp({permissions: {notifications: 'YES'}, newInstance: true})
  })

  describe('As a user I want to sign in with right credentials', () => {
    it('Given: Unauthorized user on auth home screen', async () => {
      await expect(element(by.id('components/AuthHome'))).toBeVisible()
    })

    it('Then tap by the Sign In button', async () => {
      await element(by.id('components/AuthHome/BottomAction')).tap()
    })

    it('When sign in by phone screen open', async () => {
      await expect(element(by.id('components/AuthSigninPhone'))).toBeVisible()
    })

    it('Then tap by email tab', async () => {
      await element(by.id('navigation/AuthNavigator/Signin/email')).tap()
    })

    it('When sign in by email screen open', async () => {
      await expect(element(by.id('components/AuthSigninEmail'))).toBeVisible()
    })

    it('Then submit sign in form with right credentials', async () => {
      await element(by.id('components/AuthSignin/Form/username')).typeText(credentials.username)
      await element(by.id('components/AuthSignin/Form/password')).typeText(credentials.password)
      await element(by.id('components/AuthSignin/Form/submit')).tap()
    })

    it('Then authorized user on upload profile pictire screen', async () => {
      await expect(element(by.id('components/AuthPhoto'))).toBeVisible()
    })
  })
})
