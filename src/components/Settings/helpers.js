import { Alert } from 'react-native'
import pathOr from 'ramda/src/pathOr'
import includes from 'ramda/src/includes'
import compose from 'ramda/src/compose'

export const isAvatarEmpty = compose(includes('placeholder-photos/'), pathOr('', ['photo', 'url']))

export const confirm = ({ title, desc, onConfirm }) => {
  const actions = [
    {
      text: 'Confirm',
      onPress: onConfirm,
    },
    {
      text: 'Cancel',
      style: 'cancel',
      onPress: () => {},
    },
  ]

  Alert.alert(title, desc, actions, { cancelable: true })
}
