import React from 'react'
import PropTypes from 'prop-types'
import RNActionSheet from 'react-native-actionsheet'

const ActionSheet = ({ actionSheetRef, showDestructive, ...props }) => {
  const options = showDestructive ? props.options : props.options.filter((i) => !i.isDestructive)
  const destructiveButtonIndex = options.findIndex((i) => i.isDestructive)
  const cancelButtonIndex = options.findIndex((i) => i.isCancel)

  return (
    <RNActionSheet
      ref={actionSheetRef}
      options={options.map((i) => i.name)}
      cancelButtonIndex={cancelButtonIndex}
      destructiveButtonIndex={destructiveButtonIndex}
      onPress={(index) => options[index].onPress()}
    />
  )
}

ActionSheet.propTypes = {
  actionSheetRef: PropTypes.any,
  showDestructive: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired,
      isCancel: PropTypes.bool,
      isDestructive: PropTypes.bool,
    }),
  ),
}

ActionSheet.defaultProps = {
  showDestructive: false,
  options: [],
}

export default ActionSheet
