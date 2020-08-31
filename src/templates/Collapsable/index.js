import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Title } from 'react-native-paper'
import useToggle from 'react-use/lib/useToggle'
import UpIcon from 'assets/svg/collapsable/Up'
import DownIcon from 'assets/svg/collapsable/Down'
import { Caption } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const Collapsable = ({ children, theme, style, title, active, helper }) => {
  const styling = styles(theme)
  const [visible, setVisible] = useToggle(active)

  return (
    <View style={[styling.root, style]}>
      <TouchableOpacity onPress={setVisible} style={styling.spacing}>
        <View style={styling.header}>
          <Title style={styling.title}>{title}</Title>

          <View style={styling.icon}>
            {!visible ? <DownIcon fill={theme.colors.text} /> : <UpIcon fill={theme.colors.text} />}
          </View>
        </View>

        {!visible ? <Caption>{helper}</Caption> : null}
      </TouchableOpacity>

      {visible ? children : null}
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {},
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    spacing: {
      paddingBottom: theme.spacing.base,
    },
    icon: {},
    title: {
      fontSize: 18,
    },
  })

Collapsable.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.any,
  style: PropTypes.any,
  title: PropTypes.any,
  active: PropTypes.any,
  helper: PropTypes.any,
}

export default withTranslation()(withTheme(Collapsable))
