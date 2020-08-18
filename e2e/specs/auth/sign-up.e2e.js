/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "element", "shouldStayOnStep"] }] */
import * as emailHelpers from '../../helpers/email'

const valid = {
  username: `detox${Date.now()}`,
  password: '12345678',
  email: 'valid@email.com',
}

async function getFields() {
  return {
    username: element(by.id('components/AuthUsername/Form/username')),
    password: element(by.id('components/AuthPassword/Form/password')),
    email: element(by.id('components/AuthEmail/Form/email')),
    code: element(by.id('components/AuthEmailConfirm/Form/confirmationCode')),
  }
}

async function fillField(name, value) {
  const fields = await getFields()
  const field = fields[name]

  await field.clearText()
  await field.typeText(value)
}

function generateString({length}) {
  return new Array(length).fill('a').join('')
}

async function shouldStayOnStep(step) {
  if (step === 'username') {
    await element(by.id('components/AuthUsername/Form/submit')).tap()
    await expect(element(by.id('components/AuthUsername'))).toBeVisible()
    await expect(element(by.id('components/AuthPassword'))).toBeNotVisible()
  } else if (step === 'password') {
    await element(by.id('components/AuthPassword/Form/submit')).tap()
    await expect(element(by.id('components/AuthPassword'))).toBeVisible()
    await expect(element(by.id('components/AuthPhone'))).toBeNotVisible()
  } else if (step === 'email') {
    await element(by.id('components/AuthEmail/Form/submit')).tap()
    await expect(element(by.id('components/AuthEmail'))).toBeVisible()
    await expect(element(by.id('components/AuthEmailConfirm'))).toBeNotVisible()
  } else if (step === 'code') {
    await expect(element(by.id('components/AuthEmailConfirm'))).toBeVisible()
  }
}

describe('Feature: Sign up', () => {
  let inbox

  beforeAll(async () => {
    inbox = await emailHelpers.createInbox()
    await device.launchApp({permissions: {notifications: 'YES'}, newInstance: true})
  })

  describe('As a guest I want to not be able to sign up with incorrect credentials', () => {
    describe('Rule: Username validation', () => {
      it('Given: Unauthorized user on signup username step screen', async () => {
        await device.reloadReactNative()
        await element(by.id('components/AuthHome/Actions/signin')).tap()
        await expect(element(by.id('components/AuthUsername'))).toBeVisible()
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
        await element(by.id('components/AuthUsername/Form/submit')).tap()
        await expect(element(by.id('components/AuthPassword'))).toBeVisible()
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
        await element(by.id('components/AuthPassword/Form/submit')).tap()
        await element(by.id('navigation/AuthNavigator/Signup/email')).tap()
        await expect(element(by.id('components/AuthEmail'))).toBeVisible()
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
        await element(by.id('components/AuthEmail/Form/submit')).tap()
        await expect(element(by.id('components/AuthEmailConfirm'))).toBeVisible()
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
      await expect(element(by.id('components/AuthEmailConfirm'))).toBeVisible()
    })

    it('When user click header left button #1', async () => {
      await expect(element(by.id('components/AuthEmailConfirm/HeaderLeft'))).toBeVisible()
      await element(by.id('components/AuthEmailConfirm/HeaderLeft')).tap()
    })

    it('Then open email screen with saved value', async () => {
      await expect(element(by.id('components/AuthEmail'))).toBeVisible()

      const {email} = await getFields()
      await expect(email).toHaveValue(valid.email)
    })

    it('When user click header left button #2', async () => {
      await element(by.id('components/AuthEmail/HeaderLeft')).tap()
    })

    it('Then open password screen with saved value', async () => {
      await expect(element(by.id('components/AuthPassword'))).toBeVisible()

      const {password} = await getFields()
      await expect(password).toHaveValue('••••••••')
    })

    it('When user click header left button again #3', async () => {
      await element(by.id('components/AuthPassword/HeaderLeft')).tap()
    })

    it('Then open username screen with saved value', async () => {
      await expect(element(by.id('components/AuthUsername'))).toBeVisible()

      const {username} = await getFields()
      await expect(username).toHaveValue(valid.username)
    })

    it('When user click header left button again #4', async () => {
      await element(by.id('components/AuthUsername/HeaderLeft')).tap()
    })

    it('Then open sign up home screen', async () => {
      await expect(element(by.id('components/AuthHome'))).toBeVisible()
    })
  })

  describe('As a guest I want to successfully sign up with email', () => {
    it('Given: Unauthorized user on auth home screen', async () => {
      await expect(element(by.id('components/AuthHome'))).toBeVisible()
    })

    it('Then click Use Phone or Email button', async () => {
      await element(by.id('components/AuthHome/Actions/signin')).tap()
    })

    it('When username step screen opened', async () => {
      await expect(element(by.id('components/AuthUsername'))).toBeVisible()
    })

    it('Then type valid username and click next', async () => {
      await element(by.id('components/AuthUsername/Form/username')).typeText(valid.username)
      await element(by.id('components/AuthUsername/Form/submit')).tap()
    })

    it('Then type valid password and click next', async () => {
      await element(by.id('components/AuthPassword/Form/password')).typeText(valid.password)
      await element(by.id('components/AuthPassword/Form/submit')).tap()
    })

    it('When sign up by phone screen opened', async () => {
      await expect(element(by.id('components/AuthPhone'))).toBeVisible()
    })

    it('Then click the email tab', async () => {
      await element(by.id('navigation/AuthNavigator/Signup/email')).tap()
    })

    it('When sign up by email screen opened', async () => {
      await expect(element(by.id('components/AuthEmail'))).toBeVisible()
    })

    it('Then type valid email and click next', async () => {
      await element(by.id('components/AuthEmail/Form/email')).typeText(inbox.emailAddress)
      await element(by.id('components/AuthEmail/Form/submit')).tap()
    })

    it('When confirm email screen opened', async () => {
      await expect(element(by.id('components/AuthEmailConfirm'))).toBeVisible()
    })

    it('Then type received confirmation code', async () => {
      const lastEmail = await emailHelpers.getLatestEmail(inbox)
      const confirmationCode = emailHelpers.extractConfirmationCode(lastEmail)
      await element(by.id('components/AuthEmailConfirm/Form/confirmationCode')).typeText(confirmationCode)
    })

    it('Then user see upload profile picture screen', async () => {
      await expect(element(by.id('components/AuthPhoto'))).toBeVisible()
    })
  })
})
