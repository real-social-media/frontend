import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native'
import QualityIcon from 'assets/svg/camera/Quality'
import { Text } from 'react-native-paper'
import useToggle from 'react-use/lib/useToggle'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const usePulse = (fromValue, toValue) => {
  const width = new Animated.Value(fromValue)
  const pulse = () => Animated.timing(width, { toValue, duration: 300 }).start()
  useEffect(pulse, [toValue])
  return width
}

const Quality = ({
  theme,
  photoQuality,
  setPhotoQuality,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const [visibility, setVisibility] = useToggle()

  const opacity = usePulse(!visibility ? 1 : 0, visibility ? 1 : 0)

  return (
    <View style={styling.root}>
      <TouchableOpacity style={styling.item} onPress={setVisibility}>
        <QualityIcon
          fill="#ffffff"
        />
      </TouchableOpacity>

      <Animated.View style={[styling.root, { opacity }]}>
        <TouchableOpacity style={styling.text} onPress={() => { setPhotoQuality('default'); setVisibility(); }}>
          <Text style={[photoQuality === 'default' ? styling.selected : styling.notSelected]} numberOfLines={1}>Fast</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styling.text} onPress={() => { setPhotoQuality('maximum'); setVisibility(); }}>
          <Text style={[photoQuality === 'maximum' ? styling.selected : styling.notSelected]} numberOfLines={1}>Slow</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    marginRight: 24,
    flexDirection: 'row',
  },
  text: {
    marginRight: 24,
  },
  notSelected: {
    opacity: 0.5,
  },
  selected: {
    opacity: 1,
  },
})

Quality.propTypes = {
  theme: PropTypes.any,
  content: PropTypes.any,
}

export default withTheme(Quality)
