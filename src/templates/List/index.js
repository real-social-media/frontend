import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'

const ListTemplate = ({
  children,
  items,
}) => {
  const styling = styles
  
  return (
    <View style={styling.root}>
      {items.map((item, key) => (
        <View style={styling.item} key={key}>
          {children(item, key)}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
  },
})

ListTemplate.defaultProps = {
  items: [],
  children: () => {},
}

ListTemplate.propTypes = {
  children: PropTypes.any,
  items: PropTypes.any,
}

export default ListTemplate
