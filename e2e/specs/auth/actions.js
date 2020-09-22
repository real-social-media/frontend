import * as emailHelpers from '../../helpers/email'
import { generatePassword, generateUsername, typeText, tap, toBeVisible } from './../../helpers/utils'
import {
  AuthHomeScreen,
  Navigation,
  ProfileScreen,
  SettingsScreen,
  AuthUsernameScreen,
  AuthSigninEmail,
  AuthEmailConfirmScreen,
  AuthEmailScreen,
  AuthPasswordScreen,
} from './../../helpers/screens'

export async function openSignInForm() {
  await toBeVisible(AuthHomeScreen.root)
  await tap(AuthHomeScreen.footer.signInBtn)
  await tap(Navigation.authNavigator.signIn.email)
}

export async function submitSignInForm(credentials) {
  await typeText(AuthSigninEmail.form.username, credentials.email)
  await typeText(AuthSigninEmail.form.password, credentials.password)
  await tap(AuthSigninEmail.form.submitBtn)
}

export async function signIn(credentials) {
  await openSignInForm()
  await submitSignInForm(credentials)
}

export async function signUp() {
  const username = generateUsername()
  const password = generatePassword()
  const inbox = await emailHelpers.createInbox()
  const email = inbox.emailAddress

  await tap(AuthHomeScreen.actions.signUpBtn)
  await typeText(AuthUsernameScreen.form.username, username)
  await tap(AuthUsernameScreen.form.submitBtn)

  await typeText(AuthPasswordScreen.form.password, password)
  await tap(AuthPasswordScreen.form.submitBtn)

  await tap(Navigation.authNavigator.signUp.email)
  await typeText(AuthEmailScreen.form.email, email)
  await tap(AuthEmailScreen.form.submitBtn)

  const confirmationCode = await emailHelpers.extractCodeFromLatestEmail(inbox.id)
  await typeText(AuthEmailConfirmScreen.form.confirmationCode, confirmationCode)

  return { username, password, inbox, email }
}

export async function signOut() {
  await toBeVisible(Navigation.tabNavigation.profile)
  await tap(Navigation.tabNavigation.profile)
  await toBeVisible(ProfileScreen.root)

  await tap(ProfileScreen.actions.settingsBtn)
  await toBeVisible(SettingsScreen.root)

  await tap(SettingsScreen.actions.signOutBtn)
}
