import Storage, { STORAGE_KEYS } from 'services/Storage'

const SKIP_STATE = 'skip'

export const skipNextTime = async () => {
  await Storage.setItem(STORAGE_KEYS.VERIFICATION_SCREEN, SKIP_STATE)
}

export const isSkipped = async () => {
  return (await Storage.getItem(STORAGE_KEYS.VERIFICATION_SCREEN)) === SKIP_STATE
}
