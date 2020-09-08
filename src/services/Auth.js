import Storage, { STORAGE_KEYS } from 'services/Storage'

/**
 *
 */
export const resetPhotoValidation = async () => {
	await Storage.removeItem(STORAGE_KEYS.SETTINGS_PHOTO_VALIDATION)
}

const SKIP_PHOTO_VALIDATION = 'skip'

export const savePhotoValidation = async () => {
	await Storage.setItem(STORAGE_KEYS.SETTINGS_PHOTO_VALIDATION, SKIP_PHOTO_VALIDATION)
}

export const checkPhotoValidation = async () => {
	const response = await Storage.getItem(STORAGE_KEYS.SETTINGS_PHOTO_VALIDATION)
	return response === SKIP_PHOTO_VALIDATION
}

/**
 *
 */
export const resetAppleSigninPersist = async () => {
	await Storage.removeItem(STORAGE_KEYS.AUTH_APPLE)
}

export const saveAppleSigninPersist = async (payload) => {
	await Storage.setItem(STORAGE_KEYS.AUTH_APPLE, JSON.stringify(payload))
}

export const getAppleSigninPersist = async () => {
	try {
		const response = await Storage.getItem(STORAGE_KEYS.AUTH_APPLE)
		return JSON.parse(response)
	} catch (error) {
		return {}
	}
}

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
