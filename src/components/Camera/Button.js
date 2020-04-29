import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import useInterval from 'react-use/lib/useInterval'
import useBoolean from 'react-use/lib/useBoolean'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Button = ({
  t,
  theme,
  handleCameraRecordStart,
  handleCameraRecordStop,
}) => {
  const styling = styles(theme)
  

  const [count, setCount] = React.useState(0)
  const [isRunning, toggleIsRunning] = useBoolean(false)

  useInterval(
    () => {
      setCount(count + 0.1)

      if (count >= 15) {
        handleCameraRecordStop()
      }
    },
    isRunning ? 100 : null
  )

  const handlePress = () => {
    handleCameraRecordStart()
    toggleIsRunning()
  }

  return (
    <TouchableOpacity style={styling.capture} onPress={handlePress}>
      <AnimatedCircularProgress
        size={90}
        width={6}
        fill={Math.ceil(count / 15 * 100)}
        tintColor={theme.colors.primary}
        backgroundColor={theme.colors.primaryIcon}
      />
    </TouchableOpacity>
  )
}

const styles = theme => StyleSheet.create({
  capture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 20,
    backgroundColor: theme.colors.primaryIcon,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

Button.propTypes = {
  theme: PropTypes.any,
  handleCameraRecordStart: PropTypes.any,
  handleCameraRecordStop: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withTheme(Button))
