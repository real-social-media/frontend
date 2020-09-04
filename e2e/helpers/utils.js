export function generateUsername() {
  return `detox${Date.now()}`
}

export function generatePassword() {
  return `${Date.now()}`.slice(0, 8)
}

export function generateString({ length }) {
  return new Array(length).fill('a').join('')
}

export async function toBeVisible(selector) {
  await expect(element(by.id(selector))).toBeVisible()
}

export async function toBeNotVisible(selector) {
  await expect(element(by.id(selector))).not.toBeVisible()
}

export async function tap(selector) {
  await element(by.id(selector)).tap()
}

export async function typeText(selector, value) {
  await element(by.id(selector)).typeText(value)
}

export async function toHaveValue(selector, value) {
  await expect(element(by.id(selector))).toHaveValue(value)
}

export async function tapBackspaceKey(selector) {
  await element(by.id(selector)).tapBackspaceKey()
}

export async function waitForElement(selector, timeout = 2000) {
  await waitFor(element(by.id(selector))).toBeVisible().withTimeout(timeout)
}