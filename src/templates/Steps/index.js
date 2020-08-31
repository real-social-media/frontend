import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import { withTheme } from 'react-native-paper'

const StepsTemplate = ({ theme, steps, currentStep }) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <View style={styling.progress}>
        {Array.from(Array(steps).keys()).map((key) => {
          const stepStyle = currentStep === key ? styling.progressItemActive : styling.progressItem
          return <View style={stepStyle} key={key} />
        })}
      </View>
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: 'center',
      padding: 8,
    },
    progress: {
      flexDirection: 'row',
    },
    progressItemActive: {
      flex: 1,
      height: 2,
      backgroundColor: theme.colors.button,
      marginHorizontal: 4,
    },
    progressItem: {
      flex: 1,
      height: 2,
      backgroundColor: theme.colors.primaryIcon,
      marginHorizontal: 4,
    },
  })

StepsTemplate.defaultProps = {
  items: [],
  children: () => {},
}

StepsTemplate.propTypes = {
  theme: PropTypes.any,
  steps: PropTypes.any,
  currentStep: PropTypes.any,
}

export default withTheme(StepsTemplate)
