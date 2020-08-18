import { MailSlurp } from 'mailslurp-client'
const mailslurp = new MailSlurp({ apiKey: '12fd066a8ebaf063cfaf52093109d665a5bbae8793c9dad8a273aeec71787451' })

export const createInbox = async () => {
	const inbox = await mailslurp.createInbox()
	return inbox
}

export const getLatestEmail = async (inbox) => {
	const latestEmail = await mailslurp.waitForLatestEmail(inbox.id)
	return latestEmail
}

export const extractConfirmationCode = (email) => {
	return email.body.split('confirmation code is ').pop().split('.')[0]
}