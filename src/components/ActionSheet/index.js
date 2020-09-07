import React from 'react'
import PropTypes from 'prop-types'
import RNActionSheet from 'react-native-actionsheet'
import propOr from 'ramda/src/propOr'

const isVisible = propOr(true, 'isVisible')
const undefinedByDefault = i => i === -1 ? undefined : i

const ActionSheet = ({ actionSheetRef, ...props }) => {
  const options = props.options.filter(isVisible)
  const destructiveButtonIndex = options.findIndex((i) => i.isDestructive)
  const cancelButtonIndex = options.findIndex((i) => i.isCancel)

  return (
    <RNActionSheet
      ref={actionSheetRef}
      options={options.map((i) => i.name)}
      cancelButtonIndex={undefinedByDefault(cancelButtonIndex)}
      destructiveButtonIndex={undefinedByDefault(destructiveButtonIndex)}
      onPress={(index) => options[index].onPress()}
    />
  )
}

ActionSheet.propTypes = {
  actionSheetRef: PropTypes.any,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired,
      isCancel: PropTypes.bool,
      isDestructive: PropTypes.bool,
      isVisible: PropTypes.bool,
    }),
  ),
}

ActionSheet.defaultProps = {
  options: [],
}

export default ActionSheet
