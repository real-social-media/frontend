import {credentials} from './data.mock'

export async function signIn() {
  await element(by.id('components/AuthHome/BottomAction')).tap()
  await element(by.id('navigation/AuthNavigator/Signin/email')).tap()
  await element(by.id('components/AuthSignin/Form/username')).typeText(credentials.username)
  await element(by.id('components/AuthSignin/Form/password')).typeText(credentials.password)
  await element(by.id('components/AuthSignin/Form/submit')).tap()
}

export async function skipUploadProfilePicture() {
  await expect(element(by.id('components/AuthPhoto/HeaderRight/SkipBtn'))).toBeVisible()
  await element(by.id('components/AuthPhoto/HeaderRight/SkipBtn')).tap()
  await expect(element(by.id('components/Feed'))).toBeVisible()
}
