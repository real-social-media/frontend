import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import usePrevious from 'react-use/lib/usePrevious'

const NativeError = ({
  titleText,
  messageText,
  actionText,
  triggerOn,
  status,
  handleCancelPress,
  hidden,
  skipCondition,
}) => {
  const prevStatus = usePrevious(status)
  const condition = (() => {
    if (skipCondition) {
      return true
    }

    if (triggerOn === 'failure') {
      return prevStatus !== 'failure' && status === 'failure'
    }

    if (triggerOn === 'success') {
      return prevStatus !== 'success' && status === 'success'
    }

    return false
  })()

  if (condition && messageText && !hidden) {
    Alert.alert(
      titleText,
      messageText,
      [
        {
          text: actionText,
          onPress: handleCancelPress,
          style: 'cancel',
        },
      ],
      { cancelable: false },
    )
  }

  return null
}

NativeError.propTypes = {
  titleText: PropTypes.any,
  messageText: PropTypes.any,
  actionText: PropTypes.any,
  triggerOn: PropTypes.any,
  status: PropTypes.any,
  handleCancelPress: PropTypes.any,
}

export default NativeError
