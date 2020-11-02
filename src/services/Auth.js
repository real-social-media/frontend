import Storage, { STORAGE_KEYS } from 'services/Storage'

/**
 *
 */
export const resetAuthUserPersist = async () => {
	await Storage.removeItem(STORAGE_KEYS.AUTH_USER)
}

export const saveAuthUserPersist = async (payload) => {
	await Storage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(payload))
}

export const getAuthUserPersist = async () => {
	try {
		const response = await Storage.getItem(STORAGE_KEYS.AUTH_USER)
		return JSON.parse(response)
	} catch (error) {
		return {}
	}
}
