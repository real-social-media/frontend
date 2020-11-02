import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Animated,
} from 'react-native'
import { Text } from 'react-native-paper'
import InfoIcon from 'assets/svg/dating/Info'
import DownIcon from 'assets/svg/dating/Down'
import dayjs from 'dayjs'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const About = ({
  t,
  theme,
  user,
  flingPosition,
}) => {
  const styling = styles(theme)
  const age = user.dateOfBirth ? `, ${dayjs().diff(user.dateOfBirth, 'year')}` : null

  return (
    <Animated.View style={styling.root}>
      <View style={styling.title}>
        <Text style={styling.name} numberOfLines={1} ellipsizeMode="tail">{user.fullName} {age}</Text>
          
        {flingPosition === 'DOWN' ?
          <InfoIcon fill={theme.colors.text} />
        : null}

        {flingPosition === 'UP' ?
          <DownIcon fill={theme.colors.primary} />
        : null}
      </View>
      <Text style={styling.bio} numberOfLines={3} ellipsizeMode="tail">{user.bio}</Text>
      <Text style={styling.joined} numberOfLines={1} ellipsizeMode="tail">{t('Joined')} {dayjs(user.signedUpAt).from(dayjs())}</Text>
    </Animated.View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    backgroundColor: theme.colors.backgroundSecondary,
    padding: theme.spacing.base,
    height: 152,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    paddingBottom: theme.spacing.base,
  },
  bio: {
    fontSize: 16,
    fontWeight: '400',
    paddingBottom: theme.spacing.base / 2,
  },
  joined: {
    fontSize: 16,
    fontWeight: '400',
    color: theme.colors.border,
  },
})

About.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  user: PropTypes.any,
  flingPosition: PropTypes.oneOf(['DOWN', 'UP']),
}

export default withTranslation()(withTheme(About))
