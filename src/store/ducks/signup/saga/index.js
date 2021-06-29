import signupCreate from 'store/ducks/signup/saga/signupCreate'
import signupConfirm from 'store/ducks/signup/saga/signupConfirm'
import signupPassword from 'store/ducks/signup/saga/signupPassword'
import signupUsername from 'store/ducks/signup/saga/signupUsername'

export default () =>
  []
    .concat(signupCreate())
    .concat(signupConfirm())
    .concat(signupPassword())
    .concat(signupUsername())

