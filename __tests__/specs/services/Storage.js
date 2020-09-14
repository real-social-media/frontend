import Storage, { STORAGE_PROVIDER } from 'services/Storage'
import AsyncStorage from '@react-native-community/async-storage'
import * as Logger from 'services/Logger'

const value = 123
const key = 'key'
const error = new Error('Async error')

describe('Storage service', () => {
  beforeEach(() => {
    AsyncStorage.getItem.mockClear()
    AsyncStorage.removeItem.mockClear()
    AsyncStorage.setItem.mockClear()
    Logger.captureException.mockClear()
  })

  it('STORAGE_PROVIDER', () => {
    expect(STORAGE_PROVIDER).toBe(AsyncStorage)
  })

  describe('setItem', () => {
    it('success', async () => {
      await Storage.setItem(key, value)

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(key, value)
    })

    it('catch an error', async () => {
      AsyncStorage.setItem.mockRejectedValueOnce(error)

      await Storage.setItem(key, value)
      expect(Logger.captureException).toHaveBeenCalledWith(error)
    })
  })

  describe('getItem', () => {
    it('success', async () => {
      await Storage.getItem(key)

      expect(AsyncStorage.getItem).toHaveBeenCalledWith(key)
    })

    it('catch an error', async () => {
      AsyncStorage.getItem.mockRejectedValueOnce(error)

      await Storage.getItem(key)
      expect(Logger.captureException).toHaveBeenCalledWith(error)
    })
  })

  describe('removeItem', () => {
    it('success', async () => {
      await Storage.removeItem(key)

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith(key)
    })

    it('catch an error', async () => {
      AsyncStorage.removeItem.mockRejectedValueOnce(error)

      await Storage.removeItem(key)
      expect(Logger.captureException).toHaveBeenCalledWith(error)
    })
  })
})
