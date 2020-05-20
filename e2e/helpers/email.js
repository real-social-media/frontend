const EMAIL_SERVICE_API_TOKEN = `611a0ddc8dec098c2e32055eaf20e7a2`

/**
 *
 */
const fetchAllInboxes = async () => {
	const request = fetch(`https://mailtrap.io/api/v1/inboxes?api_token=${EMAIL_SERVICE_API_TOKEN}`)
	return request.json()
}

/**
 *
 */
const fetchInboxMessages = async (inboxId) => {
	const request = fetch(`https://mailtrap.io/api/v1/inboxes/${inboxId}/messages?api_token=${EMAIL_SERVICE_API_TOKEN}`)
	return request.json()
}

/**
 *
 */
const getActiveInboxFromList = (inboxes) => {
	const activeInbox = inboxes[0]
	return activeInbox
}

/**
 *
 */
const getActiveInboxEmailAddress = (inbox) => {
	return `${inbox.email_username}@inbox.mailtrap.io`
}

/**
 *
 */
const getActiveInboxId = (inbox) => {
	return inbox.id
}


// export const getConfirmationCode = async () => {
// 	const inboxes = await fetchAllInboxes()
// 	const activeInbox = getActiveInboxFromList(inboxes)
// 	const inboxAddress = getActiveInboxEmailAddress(activeInbox)

// 	console.log(inboxAddress)
// }

export const getConfirmationInbox = async () => {
	const inboxes = await fetchAllInboxes()
	const activeInbox = getActiveInboxFromList(inboxes)
	const inboxAddress = getActiveInboxEmailAddress(activeInbox)

	return inboxAddress
}

export const getConfirmationCode = async (inboxId) => {
	const messages = fetchInboxMessages(inboxId)
}