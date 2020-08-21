import * as actions from './actions'
import {generatePassword, toBeVisible, tap, typeText, toHaveValue, waitForElement} from '../../helpers/utils'
import * as emailHelpers from '../../helpers/email'
import {AuthSigninEmail, AuthForgotConfirmScreen, AuthForgotEmailScreen, AuthPhotoScreen} from './../../helpers/screens'

describe('Feature: Password Recovery', () => {
  let user

  beforeAll(async () => {
    await device.launchApp({permissions: {notifications: 'YES'}, newInstance: true})
    user = await actions.signUp()

    await device.launchApp({permissions: {notifications: 'YES'}, delete: true, newInstance: true})
  })

  afterAll(async () => {
    await emailHelpers.deleteInbox(user.inbox.id)
  })

  describe('As a user I want to recovery my password', () => {
    const newPassword = generatePassword()

    it('Given: Unauthorized user on signin screen', async () => {
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
      await emailHelpers.emptyInbox(user.inbox.id)
      const confirmationCode = await emailHelpers.extractCodeFromLatestEmail(user.inbox.id)

      await typeText(AuthForgotConfirmScreen.form.confirmationCode, confirmationCode)
      await typeText(AuthForgotConfirmScreen.form.password, newPassword)

      await tap(AuthForgotConfirmScreen.form.submitBtn)
    })

    it('When sign in by email screen open', async () => {
      await toBeVisible(AuthSigninEmail.root)
    })

    it('Then user successfully sign in with new credentials', async () => {
      await actions.submitSignInForm({email: user.email, password: newPassword})
      await waitForElement(AuthPhotoScreen.root)
    })
  })
})
