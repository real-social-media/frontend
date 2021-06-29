import authMessages from 'store/ducks/auth/messages'
import signupMessages from 'store/ducks/signup/messages'
import usersMessages from 'store/ducks/users/messages'
import datingMessages from 'store/ducks/dating/messages'
import contactsMessages from 'store/ducks/contacts/messages'
import themesMessages from 'store/ducks/themes/messages'
import promocodesMessages from 'store/ducks/promocodes/messages'
import purchasesMessages from 'store/ducks/purchases/messages'
import chatMessages from 'store/ducks/chat/messages'

export default Object.assign(
  authMessages,
  signupMessages,
  usersMessages,
  datingMessages,
  contactsMessages,
  themesMessages,
  promocodesMessages,
  purchasesMessages,
  chatMessages,
)
