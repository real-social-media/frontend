import React, { useRef, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  TouchableWithoutFeedback,
} from 'react-native'
import {
  FlingGestureHandler,
  Directions,
} from 'react-native-gesture-handler'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const Swipeable = ({ children }) => {
  const [flingPosition, setFlingPosition] = useState('DOWN')

  const STATIC_VIEW_HEIGHT_MIN = 152
  const STATIC_VIEW_HEIGHT_MAX = 1000

  const animatedHeight = new Animated.Value(STATIC_VIEW_HEIGHT_MIN)
  const animatedHeightRef = useRef(animatedHeight)

  /**
   * Expand handler
   */
  const onUpFlingHandlerStateChange = useCallback(() => {
    Animated.timing(animatedHeight, {
      toValue: STATIC_VIEW_HEIGHT_MAX,
      duration: 300,
    }).start()
    setFlingPosition('UP')
  }, [])

  /**
   * Shrink handler
   */
  const onDownFlingHandlerStateChange = useCallback(() => {
    Animated.timing(animatedHeight, {
      toValue: STATIC_VIEW_HEIGHT_MIN,
      duration: 300,
    }).start()
    setFlingPosition('DOWN')
  }, [])

  const onToggleFlingHandlerStateChange = useCallback(() => {
    if (flingPosition === 'DOWN') {
      onUpFlingHandlerStateChange()
    }

    if (flingPosition === 'UP') {
      onDownFlingHandlerStateChange()
    }
  }, [flingPosition])

  return (
    <TouchableWithoutFeedback>
      <FlingGestureHandler
        direction={Directions.UP}
        onHandlerStateChange={onUpFlingHandlerStateChange}
      >
        <FlingGestureHandler
          direction={Directions.DOWN}
          onHandlerStateChange={onDownFlingHandlerStateChange}
        >
          {children({
            animatedHeightRef,
            onUpFlingHandlerStateChange,
            onDownFlingHandlerStateChange,
            onToggleFlingHandlerStateChange,
            flingPosition,
          })}
        </FlingGestureHandler>
      </FlingGestureHandler>
    </TouchableWithoutFeedback>
  )
}

Swipeable.propTypes = {
  children: PropTypes.any,
}

export default withTranslation()(withTheme(Swipeable))
