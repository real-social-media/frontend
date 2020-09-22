import React from 'react'
import PropTypes from 'prop-types'
import RNActionSheet from 'react-native-actionsheet'
import has from 'ramda/src/has'

const hasVisible = has('isVisible')
const isVisible = item => hasVisible(item) && item.isVisible || !hasVisible(item)
const undefinedByDefault = (i) => (i === -1 ? undefined : i)

const ActionSheet = ({ actionSheetRef, testID, ...props }) => {
  const options = props.options.filter(isVisible)
  const destructiveButtonIndex = options.findIndex((i) => i.isDestructive)
  const cancelButtonIndex = options.findIndex((i) => i.isCancel)

  return (
    <RNActionSheet
      testID={testID}
      ref={actionSheetRef}
      options={options.map((i) => i.name)}
      cancelButtonIndex={undefinedByDefault(cancelButtonIndex)}
      destructiveButtonIndex={undefinedByDefault(destructiveButtonIndex)}
      onPress={(index) => options[index].onPress()}
    />
  )
}

ActionSheet.propTypes = {
  testID: PropTypes.string,
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
  testID: undefined,
  options: [],
}

export default ActionSheet
