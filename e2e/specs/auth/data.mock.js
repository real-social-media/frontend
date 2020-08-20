import {generateUsername} from './../../helpers/utils'

// Registered user credentials
export const credentials = {
  inboxId: 'f62b5bf8-e9e2-4ff0-82bf-5d4689a92716',
  username: 'detox.user.f62b5bf8',
  email: 'f62b5bf8-e9e2-4ff0-82bf-5d4689a92716@mailslurp.com',
  password: '12345678',
}

export const valid = {
  username: generateUsername(),
  password: '12345678',
  email: 'valid@email.com',
}
