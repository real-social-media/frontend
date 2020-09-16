import AsyncStorage from '@react-native-community/async-storage'

const MEMORY_KEY_PREFIX = '@RealStorageService:'

let dataMemory = {}

/** @class */
export class MemoryStorage {
  /**
   * This is used to set a specific item in storage
   * @param {string} key - the key for the item
   * @param {object} value - the value
   * @returns {string} value that was set
   */
  static setItem(key, value) {
    AsyncStorage.setItem(MEMORY_KEY_PREFIX + key, value)
    dataMemory[key] = value
    return dataMemory[key]
  }

  /**
   * This is used to get a specific key from storage
   * @param {string} key - the key for the item
   * This is used to clear the storage
   * @returns {string} the data item
   */
  static getItem(key) {
    return Object.prototype.hasOwnProperty.call(dataMemory, key)
      ? dataMemory[key]
      : undefined
  }

  /**
   * This is used to remove an item from storage
   * @param {string} key - the key being set
   * @returns {string} value - value that was deleted
   */
  static removeItem(key) {
    AsyncStorage.removeItem(MEMORY_KEY_PREFIX + key)
    return delete dataMemory[key]
  }

  /**
   * This is used to clear the storage
   * @returns {string} nothing
   */
  static clear() {
    dataMemory = {}
    return dataMemory
  }

  /**
   * Will sync the MemoryStorage data from AsyncStorage to storageWindow MemoryStorage
   * @returns {void}
   */
  static sync() {
    if (!MemoryStorage.syncPromise) {
      MemoryStorage.syncPromise = new Promise((res, rej) => {
        AsyncStorage.getAllKeys((errKeys, keys) => {
          if (errKeys) rej(errKeys)
          const memoryKeys = keys.filter(key =>
            key.startsWith(MEMORY_KEY_PREFIX),
          )
          AsyncStorage.multiGet(memoryKeys, (err, stores) => {
            if (err) rej(err)
            stores.map((result, index, store) => {
              const key = store[index][0]
              const value = store[index][1]
              const memoryKey = key.replace(MEMORY_KEY_PREFIX, '')
              dataMemory[memoryKey] = value
            })
            res()
          })
        })
      })
    }
    return MemoryStorage.syncPromise
  }
}

MemoryStorage.syncPromise = null

/** @class */
export default class StorageHelper {
  /**
   * This is used to get a storage object
   * @returns {object} the storage
   */
  constructor() {
    this.storageWindow = MemoryStorage
  }

  /**
   * This is used to return the storage
   * @returns {object} the storage
   */
  getStorage() {
    return this.storageWindow
  }
}