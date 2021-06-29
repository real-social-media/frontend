import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'

const RowsItemTemplate = ({
  children,
  hasBorders,
  testID,
}) => {
  const rootStyle = hasBorders ? styles.rootBorder : styles.rootDefault

  return (
    <View testID={testID} style={rootStyle}>
      <View style={styles.component}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  rootDefault: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 1,
    paddingVertical: 6,
  },
  rootBorder: {
    borderBottomColor: '#33333340',
    borderBottomWidth: 1,
    paddingVertical: 6,
  },
  component: {
    height: 42,
    justifyContent: 'center',
  },
})

RowsItemTemplate.defaultProps = {
  testID: null,
}

RowsItemTemplate.propTypes = {
  testID: PropTypes.string,
  children: PropTypes.any,
  hasBorders: PropTypes.any,
}

export default RowsItemTemplate
