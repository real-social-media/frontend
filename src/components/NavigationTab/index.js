import React from 'react'
import { View, StyleSheet } from 'react-native'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const TabBarItemStyles = (theme, focused) => StyleSheet.create({
  container: {
    position: 'absolute',
    top: -1,
    left: 12,
    bottom: 0,
    right: 12,
    alignItems: 'center',
    paddingTop: 12,
  },
  component: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: theme.colors.navigation,
    opacity: focused ? 1 : 0,
  },
})

export const TabBarItem = withTheme(({ theme, focused, children }) => {
  const styling = TabBarItemStyles(theme, focused)
  return (
    <View style={styling.container}>
      <View style={styling.component} />
      {children}
    </View>
  )
})
