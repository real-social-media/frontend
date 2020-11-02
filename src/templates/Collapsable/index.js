import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { Title } from 'react-native-paper'
import useToggle from 'react-use/lib/useToggle'
import UpIcon from 'assets/svg/collapsable/Up'
import DownIcon from 'assets/svg/collapsable/Down'
import SuccessIcon from 'assets/svg/collapsable/Success'
import ErrorIcon from 'assets/svg/collapsable/Error'
import { Caption } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const Collapsable = ({
  children,
  theme,
  style,
  title,
  active,
  success,
  error,
  helper,
}) => {
  const styling = styles(theme)
  const [visible, setVisible] = useToggle(active)

  const upIconVisibility = !error && !success && visible
  const downIconVisibility = !error && !success && !visible
  const successIconVisibility = !error && success
  const errorIconVisibility = error

  useEffect(() => {
    if (error && !visible) setVisible()
  }, [error, visible])

  const handlePress = () => {
    if (!error) setVisible()
  }

  return (
    <View style={[styling.root, style]}>
      <TouchableOpacity onPress={handlePress} style={styling.spacing}>
        <View style={styling.header}>
          <Title style={styling.title}>{title}</Title>

          <View style={styling.icon}>
            {downIconVisibility ?
              <DownIcon fill={theme.colors.text} />
            : null}
            {upIconVisibility ?
              <UpIcon fill={theme.colors.text} />
            : null}
            {successIconVisibility ?
              <SuccessIcon fill={theme.colors.primary} />
            : null}
            {errorIconVisibility ?
              <ErrorIcon fill={'red'} />
            : null}
          </View>
        </View>

        {!visible ?
          <Caption style={error ? styling.error : null}>{helper}</Caption>
        : null}
      </TouchableOpacity>

      {visible ? children : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spacing: {
    paddingBottom: theme.spacing.base,
  },
  icon: {
  },
  title: {
    fontSize: 18,
  },
  error: {
    color: 'red',
  },
})

Collapsable.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.any,
  style: PropTypes.any,
  title: PropTypes.any,
  active: PropTypes.any,
  success: PropTypes.any,
  error: PropTypes.any,
  helper: PropTypes.any,
}

export default withTranslation()(withTheme(Collapsable))
