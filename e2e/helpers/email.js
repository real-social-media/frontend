import {MailSlurp} from 'mailslurp-client'

const mailslurp = new MailSlurp({apiKey: '17377c7676c161d6ceb75319230e333c81f086392e2b8e521fabcc7548cc295b'})

export const createInbox = async () => {
  return await mailslurp.createInbox()
}

export const getLatestEmail = async (inboxId) => {
  return await mailslurp.waitForLatestEmail(inboxId)
}

export const emptyInbox = async (inboxId) => {
  await mailslurp.emptyInbox(inboxId)
}

export const deleteInbox = async (inboxId) => {
  await mailslurp.deleteInbox(inboxId)
}

function extractCode(text) {
  return text.match(/\d{6}/).pop()
}

export async function extractCodeFromLatestEmail(inboxId) {
  const email = await getLatestEmail(inboxId)

  return extractCode(email.body)
}
