import AsyncStorage from '@react-native-community/async-storage'

/**
 *
 */
export const resetPhotoValidation = async () => {
	await AsyncStorage.removeItem('@real:settings:photoValidation')
}

export const savePhotoValidation = async () => {
	await AsyncStorage.setItem('@real:settings:photoValidation', 'skip')
}

export const checkPhotoValidation = async () => {
	const response = await AsyncStorage.getItem('@real:settings:photoValidation')
	return response === 'skip'
}

/**
 *
 */
export const resetAppleSigninPersist = async () => {
	await AsyncStorage.removeItem('@real:auth:apple')
}

export const saveAppleSigninPersist = async (payload) => {
	await AsyncStorage.setItem('@real:auth:apple', JSON.stringify(payload))
}

export const getAppleSigninPersist = async () => {
	try {
		const response = await AsyncStorage.getItem('@real:auth:apple')
		return JSON.parse(response)
	} catch (error) {
		return {}
	}
}
