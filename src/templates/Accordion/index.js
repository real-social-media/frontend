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
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

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
          <View key={key} style={style}>
            <TouchableOpacity style={styling.accordionItem} onPress={item.onPress}>
              <Text style={styling.text}>{item.text}</Text>

              {item.loading ?
                <ActivityIndicator size={8} style={styling.icon} />
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
  items: PropTypes.any,
}

export default withTheme(Accordion)
