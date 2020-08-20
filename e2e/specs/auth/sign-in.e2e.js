/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "element", "toBeVisible", "tap", "shouldStayOnSignInScreenAfterSubmit"] }] */
import {credentials, valid} from './data.mock'
import * as actions from './actions'
import {generateString, tap, toBeVisible, typeText} from '../../helpers/utils'
import {
  AuthPhotoScreen,
  AuthHomeScreen,
  AuthSigninEmail,
  AuthSigninPhoneScreen,
  Navigation,
} from './../../helpers/screens'

async function getFields() {
  return {
    email: element(by.id(AuthSigninEmail.form.username)),
    password: element(by.id(AuthSigninEmail.form.password)),
  }
}

async function shouldStayOnSignInScreenAfterSubmit() {
  await tap(AuthSigninEmail.form.submitBtn)
  await toBeVisible(AuthSigninEmail.root)
}

describe('Feature: Sign in', () => {
  beforeAll(async () => {
    await device.launchApp({permissions: {notifications: 'YES'}, newInstance: true})
  })

  describe('As a user I want to not be able to sign in with incorrect credentials', () => {
    it('Given: Unauthorized user on signin screen', async () => {
      await actions.openSignInForm()
      await toBeVisible(AuthSigninEmail.root)
    })

    describe('Rule: Email validation', () => {
      let email

      beforeAll(async () => {
        const fields = await getFields()

        email = fields.email
        await fields.password.typeText(valid.password)
      })

      beforeEach(async () => {
        await email.clearText()
      })

      it('Example: email is a required field', async () => {
        await shouldStayOnSignInScreenAfterSubmit()
      })

      it('Example: must be at least 3 characters', async () => {
        await email.typeText(generateString({length: 2}))
        await shouldStayOnSignInScreenAfterSubmit()
      })

      it('Example: must be at most 50 characters', async () => {
        await email.typeText(generateString({length: 51}))
        await shouldStayOnSignInScreenAfterSubmit()
      })

      it('Example: must be valid email', async () => {
        async function testEmail(value) {
          await email.clearText()
          await email.typeText(value)
          await shouldStayOnSignInScreenAfterSubmit()
        }

        await testEmail('notvalid')
        await testEmail('notvalid@')
        await testEmail('notvalid@email')
        await testEmail('notvalid@email.')
      })
    })

    describe('Rule: Password validation', () => {
      let password

      beforeAll(async () => {
        const fields = await getFields()

        password = fields.password
        await fields.email.typeText(valid.email)
      })

      beforeEach(async () => {
        await password.clearText()
      })

      it('Example: password is a required field', async () => {
        await shouldStayOnSignInScreenAfterSubmit()
      })

      it('Example: must be at least 8 characters', async () => {
        await password.typeText(generateString({length: 7}))
        await shouldStayOnSignInScreenAfterSubmit()
      })

      it('Example: must be at most 50 characters', async () => {
        await password.typeText(generateString({length: 51}))
        await shouldStayOnSignInScreenAfterSubmit()
      })
    })
  })

  describe('As a user I want to sign in with right credentials', () => {
    it('Given: Unauthorized user on auth home screen', async () => {
      await device.reloadReactNative()
      await toBeVisible(AuthHomeScreen.root)
    })

    it('Then tap by the Sign In button', async () => {
      await tap(AuthHomeScreen.footer.signInBtn)
    })

    it('When sign in by phone screen open', async () => {
      await toBeVisible(AuthSigninPhoneScreen.root)
    })

    it('Then tap by email tab', async () => {
      await tap(Navigation.authNavigator.signIn.email)
    })

    it('When sign in by email screen open', async () => {
      await toBeVisible(AuthSigninEmail.root)
    })

    it('Then submit sign in form with right credentials', async () => {
      await typeText(AuthSigninEmail.form.username, credentials.email)
      await typeText(AuthSigninEmail.form.password, credentials.password)
      await tap(AuthSigninEmail.form.submitBtn)
    })

    it('Then authorized user on upload profile pictire screen', async () => {
      await toBeVisible(AuthPhotoScreen.root)
    })
  })
})
