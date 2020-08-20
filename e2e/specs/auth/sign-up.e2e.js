/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "toBeVisible", "typeText", "element", "tap", "shouldStayOnStep"] }] */
import * as emailHelpers from '../../helpers/email'
import {generateString, tap, toBeVisible, toBeNotVisible, typeText} from '../../helpers/utils'
import {valid} from './data.mock'
import {
  AuthPhotoScreen,
  AuthHomeScreen,
  AuthUsernameScreen,
  AuthEmailConfirmScreen,
  AuthEmailScreen,
  AuthPhoneScreen,
  AuthPasswordScreen,
  Navigation,
} from './../../helpers/screens'

async function getFields() {
  return {
    username: element(by.id(AuthUsernameScreen.form.username)),
    password: element(by.id(AuthPasswordScreen.form.password)),
    email: element(by.id(AuthEmailScreen.form.email)),
    code: element(by.id(AuthEmailConfirmScreen.form.confirmationCode)),
  }
}

async function fillField(name, value) {
  const fields = await getFields()
  const field = fields[name]

  await field.clearText()
  await field.typeText(value)
}

async function shouldStayOnStep(step) {
  if (step === 'username') {
    await tap(AuthUsernameScreen.form.submitBtn)
    await toBeVisible(AuthUsernameScreen.root)
    await toBeNotVisible(AuthPasswordScreen.root)
  } else if (step === 'password') {
    await tap(AuthPasswordScreen.form.submitBtn)
    await toBeVisible(AuthPasswordScreen.root)
    await toBeNotVisible(AuthPhoneScreen.root)
  } else if (step === 'email') {
    await tap(AuthEmailScreen.form.submitBtn)
    await toBeVisible(AuthEmailScreen.root)
    await toBeNotVisible(AuthEmailConfirmScreen.root)
  } else if (step === 'code') {
    await toBeVisible(AuthEmailConfirmScreen.root)
  }
}

describe('Feature: Sign up', () => {
  let inbox

  beforeAll(async () => {
    inbox = await emailHelpers.createInbox()

    await device.launchApp({permissions: {notifications: 'YES'}, newInstance: true})
  })

  afterAll(async () => {
    await emailHelpers.deleteInbox(inbox.id)
  })

  describe('As a guest I want to not be able to sign up with incorrect credentials', () => {
    describe('Rule: Username validation', () => {
      it('Given: Unauthorized user on signup username step screen', async () => {
        await toBeVisible(AuthHomeScreen.root)
        await tap(AuthHomeScreen.actions.signUpBtn)
        await toBeVisible(AuthUsernameScreen.root)
      })

      it('Example: username is a required field', async () => {
        await shouldStayOnStep('username')
      })

      it('Example: already exists username', async () => {
        await fillField('username', 'real')
        await shouldStayOnStep('username')
      })

      it('Example: must be at least 3 characters', async () => {
        await fillField('username', generateString({length: 2}))
        await shouldStayOnStep('username')
      })

      it('Example: must be at most 30 characters', async () => {
        await fillField('username', generateString({length: 31}))
        await shouldStayOnStep('username')
      })

      it('Example: must only contain letters and numbers', async () => {
        const {username} = await getFields()

        await username.clearText()
        await username.typeText(valid.username)

        async function testSpecialChar(char) {
          await username.typeText(char)
          await shouldStayOnStep('username')
          await username.tapBackspaceKey()
        }

        await testSpecialChar('!')
        await testSpecialChar('&')
        await testSpecialChar('#')
        await testSpecialChar('*')
        await testSpecialChar('@')
        await testSpecialChar('|')
      })
    })

    describe('Rule: Password validation', () => {
      it('Given: Unauthorized user on signup password step screen', async () => {
        await fillField('username', valid.username)
        await tap(AuthUsernameScreen.form.submitBtn)
        await toBeVisible(AuthPasswordScreen.root)
      })

      it('Example: password is a required field', async () => {
        await shouldStayOnStep('password')
      })

      it('Example: must be at least 8 characters', async () => {
        await fillField('password', generateString({length: 7}))
        await shouldStayOnStep('password')
      })

      it('Example: must be at most 50 characters', async () => {
        await fillField('password', generateString({length: 51}))
        await shouldStayOnStep('password')
      })

      it('Example: no white space', async () => {
        await fillField('password', 'value with spaces')
        await shouldStayOnStep('password')
      })
    })

    describe('Rule: Email validation', () => {
      it('Given: Unauthorized user on signup email step screen', async () => {
        await fillField('password', valid.password)
        await tap(AuthPasswordScreen.form.submitBtn)
        await tap(Navigation.authNavigator.signUp.email)
        await toBeVisible(AuthEmailScreen.root)
      })

      it('Example: email is a required field', async () => {
        await shouldStayOnStep('email')
      })

      it('Example: must be at least 3 characters', async () => {
        await fillField('email', generateString({length: 2}))
        await shouldStayOnStep('email')
      })

      it('Example: must be at most 50 characters', async () => {
        await fillField('email', generateString({length: 51}))
        await shouldStayOnStep('email')
      })

      it('Example: must be valid email', async () => {
        await fillField('email', 'notvalid')
        await shouldStayOnStep('email')

        await fillField('email', 'notvalid@')
        await shouldStayOnStep('email')

        await fillField('email', 'notvalid@email')
        await shouldStayOnStep('email')

        await fillField('email', 'notvalid@email.')
        await shouldStayOnStep('email')
      })
    })

    describe('Rule: Confirmation code validation', () => {
      it('Given: Unauthorized user on Confirmation code screen', async () => {
        await fillField('email', valid.email)
        await tap(AuthEmailScreen.form.submitBtn)
        await toBeVisible(AuthEmailConfirmScreen.root)
      })

      it('Example: code is a required field', async () => {
        await shouldStayOnStep('code')
      })

      it('Example: must be at 6 characters', async () => {
        await fillField('code', '12345')
        await shouldStayOnStep('code')
      })

      it('Example: only numbers', async () => {
        await fillField('code', '12345a')
        await shouldStayOnStep('code')
      })
    })
  })

  describe('As a guest I want to navigate back through sign up for update credentials', () => {
    it('Given: Unauthorized user on the last sign up flow step', async () => {
      await toBeVisible(AuthEmailConfirmScreen.root)
    })

    it('When user click header left button #1', async () => {
      await toBeVisible(AuthEmailConfirmScreen.header.backBtn)
      await tap(AuthEmailConfirmScreen.header.backBtn)
    })

    it('Then open email screen with saved value', async () => {
      await toBeVisible(AuthEmailScreen.root)

      const {email} = await getFields()
      await expect(email).toHaveValue(valid.email)
    })

    it('When user click header left button #2', async () => {
      await tap(AuthEmailScreen.header.backBtn)
    })

    it('Then open password screen with saved value', async () => {
      await toBeVisible(AuthPasswordScreen.root)

      const {password} = await getFields()
      await expect(password).toHaveValue('••••••••')
    })

    it('When user click header left button again #3', async () => {
      await tap(AuthPasswordScreen.header.backBtn)
    })

    it('Then open username screen with saved value', async () => {
      await toBeVisible(AuthUsernameScreen.root)

      const {username} = await getFields()
      await expect(username).toHaveValue(valid.username)
    })

    it('When user click header left button again #4', async () => {
      await tap(AuthUsernameScreen.header.backBtn)
    })

    it('Then open sign up home screen', async () => {
      await toBeVisible(AuthHomeScreen.root)
    })
  })

  describe('As a guest I want to successfully sign up with email', () => {
    it('Given: Unauthorized user on auth home screen', async () => {
      await toBeVisible(AuthHomeScreen.root)
    })

    it('Then click Use Phone or Email button', async () => {
      await tap(AuthHomeScreen.actions.signUpBtn)
    })

    it('When username step screen opened', async () => {
      await toBeVisible(AuthUsernameScreen.root)
    })

    it('Then type valid username and click next', async () => {
      await typeText(AuthUsernameScreen.form.username, valid.username)
      await tap(AuthUsernameScreen.form.submitBtn)
    })

    it('Then type valid password and click next', async () => {
      await typeText(AuthPasswordScreen.form.password, valid.password)
      await tap(AuthPasswordScreen.form.submitBtn)
    })

    it('When sign up by phone screen opened', async () => {
      await toBeVisible(AuthPhoneScreen.root)
    })

    it('Then click the email tab', async () => {
      await tap(Navigation.authNavigator.signUp.email)
    })

    it('When sign up by email screen opened', async () => {
      await toBeVisible(AuthEmailScreen.root)
    })

    it('Then type valid email and click next', async () => {
      await typeText(AuthEmailScreen.form.email, inbox.emailAddress)
      await tap(AuthEmailScreen.form.submitBtn)
    })

    it('When confirm email screen opened', async () => {
      await toBeVisible(AuthEmailConfirmScreen.root)
    })

    it('Then type received confirmation code', async () => {
      const confirmationCode = await emailHelpers.extractCodeFromLatestEmail(inbox.id)
      await typeText(AuthEmailConfirmScreen.form.confirmationCode, confirmationCode)
    })

    it('Then user see upload profile picture screen', async () => {
      await toBeVisible(AuthPhotoScreen.root)
    })
  })
})
