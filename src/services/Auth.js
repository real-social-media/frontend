import AsyncStorage from '@react-native-community/async-storage'
import * as Logger from 'services/Logger'

const AUTH_USER = '@real:auth:user'
const AUTH_APPLE = '@real:auth:apple'

/**
 *
 */
export const resetAppleSigninPersist = async () => {
	try {
		await AsyncStorage.removeItem(AUTH_APPLE)
	} catch (error) {
		Logger.captureException(error)
	}
}

export const saveAppleSigninPersist = async (payload) => {
	await AsyncStorage.setItem(AUTH_APPLE, JSON.stringify(payload))
}

export const getAppleSigninPersist = async () => {
	try {
		const response = await AsyncStorage.getItem(AUTH_APPLE)
		return JSON.parse(response)
	} catch (error) {
		return {}
	}
}

/**
 *
 */
export const resetAuthUserPersist = async () => {
	try {
		await AsyncStorage.removeItem(AUTH_USER)
	} catch (error) {
		Logger.captureException(error)
	}
}

export const saveAuthUserPersist = async (payload) => {
	await AsyncStorage.setItem(AUTH_USER, JSON.stringify(payload))
}

export const getAuthUserPersist = async () => {
	try {
		const response = await AsyncStorage.getItem(AUTH_USER)
		return JSON.parse(response)
	} catch (error) {
		return {}
	}
}
