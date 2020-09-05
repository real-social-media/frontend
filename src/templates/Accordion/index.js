import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import testIDs from './test-ids'

const Accordion = ({
  theme,
  items,
}) => {
  const styling = styles(theme)
  const list = items.filter(item => !item.disabled)

  return (
    <View style={styling.accordion}>
      {list.map((item, key) => {
        const style = (key + 1 !== list.length) ?
          [styling.divider] :
          null

        return (
          <View testID={testIDs.item} key={key} style={style}>
            <TouchableOpacity accessibilityRole="button" style={styling.accordionItem} onPress={item.onPress}>
              <Text accessibilityRole="text" style={styling.text}>{item.text}</Text>

              {item.loading ?
                <ActivityIndicator accessibilityRole="progressbar" size={8} style={styling.icon} />
              : null}
            </TouchableOpacity>
          </View>
        )
      })}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  text: {
    fontSize: 16,
  },
  accordion: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 4,
  },
  accordionItem: {
    padding: theme.spacing.base,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    borderBottomColor: `${theme.colors.border}20`,
    borderBottomWidth: 0.5,
  },
  icon: {
    paddingHorizontal: theme.spacing.base,
  },
})

Accordion.propTypes = {
  theme: PropTypes.any,
  items: PropTypes.arrayOf(PropTypes.shape({
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
  })),
}

Accordion.defaultProps = {
  items: []
}

export default withTheme(Accordion)
