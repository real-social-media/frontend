import { Alert } from 'react-native'

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
