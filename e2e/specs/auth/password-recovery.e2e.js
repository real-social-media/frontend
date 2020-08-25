import * as actions from './actions'
import { generatePassword, toBeVisible, tap, typeText, toHaveValue, waitForElement } from '../../helpers/utils'
import * as emailHelpers from '../../helpers/email'
import {
  AuthSigninEmail,
  AuthForgotConfirmScreen,
  AuthForgotEmailScreen,
  AuthPhotoScreen,
  AuthEmailConfirmScreen,
} from './../../helpers/screens'

describe('Feature: Password Recovery', () => {
  let user

  beforeAll(async () => {
    await device.launchApp({ permissions: { notifications: 'YES' }, newInstance: true })
    user = await actions.signUp()
    await emailHelpers.emptyInbox(user.inbox.id)
  })

  afterAll(async () => {
    await emailHelpers.deleteInbox(user.inbox.id)
  })

  describe('As a user I want to recovery my password', () => {
    const newPassword = generatePassword()

    it('Given: Unauthorized user on signin screen', async () => {
      await device.launchApp({ permissions: { notifications: 'YES' }, delete: true, newInstance: true })
      await actions.openSignInForm()
      await toBeVisible(AuthSigninEmail.root)
    })

    it('Then tap by reset your password button', async () => {
      await waitForElement(AuthSigninEmail.resetPasswordBtn)
      await tap(AuthSigninEmail.resetPasswordBtn)
    })

    it('When wait for forgot password screen opened on email tab', async () => {
      await toBeVisible(AuthForgotEmailScreen.root)
    })

    it('Then submit recovery password form with existed user email', async () => {
      await typeText(AuthForgotEmailScreen.form.username, user.email)
      await tap(AuthForgotEmailScreen.form.submitBtn)
    })

    it('When confirm recovery password screen open with prefilled email', async () => {
      await toBeVisible(AuthForgotConfirmScreen.root)
      await toHaveValue(AuthForgotConfirmScreen.form.username, user.email)
    })

    it('Then submit confirm form with confirmation code and new password', async () => {
      const confirmationCode = await emailHelpers.extractCodeFromLatestEmail(user.inbox.id)

      await typeText(AuthForgotConfirmScreen.form.confirmationCode, confirmationCode)
      await typeText(AuthForgotConfirmScreen.form.password, newPassword)

      await tap(AuthForgotConfirmScreen.form.submitBtn)
    })

    it('When sign in by email screen open', async () => {
      await toBeVisible(AuthSigninEmail.root)
    })

    it('Then user successfully sign in with new credentials', async () => {
      await actions.submitSignInForm({ email: user.email, password: newPassword })
      await waitForElement(AuthPhotoScreen.root)
    })
  })

  describe('As a user I want to be able to open recovery password screen by tap on a link from an email', () => {
    it('Given: Unauthorized user open an app tap by link from an email', async () => {
      const confirmationCode = '971805'
      const url = `https://real.app/confirm/email/us-east-1:92b7abce-860c-4fd9-aeb8-0f3a023a27ba/${confirmationCode}`
      await device.launchApp({ url, permissions: { notifications: 'YES' }, newInstance: true })

      await toBeVisible(AuthEmailConfirmScreen.root)
      await toHaveValue(AuthEmailConfirmScreen.form.confirmationCode, confirmationCode)
    })
  })
})
