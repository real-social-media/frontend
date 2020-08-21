import {generateUsername} from './../../helpers/utils'

// Registered user credentials
export const credentials = {
  inboxId: '60752688-6875-40c2-a536-5cd7a96ffaed',
  username: 'detox.user.60752688',
  email: '60752688-6875-40c2-a536-5cd7a96ffaed@mailslurp.com',
  password: '12345678',
}

export const valid = {
  username: generateUsername(),
  password: '12345678',
  email: 'valid@email.com',
}
