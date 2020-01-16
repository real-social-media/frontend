import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { Text, Caption } from 'react-native-paper'
import CloseIcon from 'assets/svg/post/Close'
import PendingIcon from 'assets/svg/post/Pending'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const PendingRequests = ({
  theme,
  navigation,
  usersGetPendingFollowers,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <View style={styling.avatar}>
        <PendingIcon fill="#ffffff" />
      </View>

      <View style={styling.status}>
        {usersGetPendingFollowers.data.length === 1 ?
          <TouchableOpacity style={styling.content} onPress={() => navigation.navigate('ProfileRequests')}>
            <Text style={styling.title}>{t('You have {{number}} new request', { number: usersGetPendingFollowers.data.length })}</Text>
            <View style={styling.caption}>
              <Caption style={styling.subtitle}>{t('Follower request from')} {usersGetPendingFollowers.data.map(user => user.username)}</Caption>
            </View>
          </TouchableOpacity>
        : null}

        {usersGetPendingFollowers.data.length > 1 ?
          <TouchableOpacity style={styling.content} onPress={() => navigation.navigate('ProfileRequests')}>
            <Text style={styling.title}>{t('You have {{number}} new requests', { number: usersGetPendingFollowers.data.length })}</Text>
            <View style={styling.caption}>
              <Caption style={styling.subtitle}>{t('Follower requests from')} {usersGetPendingFollowers.data.map(user => user.username)} {t('and others')}</Caption>
            </View>
          </TouchableOpacity>
        : null}
        {/* <TouchableOpacity style={styling.icon} onPress={() => {}}>
          <CloseIcon fill="#ffffff" />
        </TouchableOpacity> */}
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.base,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  avatar: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  content: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 38,
    width: 38,
  },
  title: {
  },
  subtitle: {
    color: '#676767',
    marginRight: 4,
  },
  caption: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})

PendingRequests.propTypes = {
  theme: PropTypes.any,
  navigation: PropTypes.any,
  authUser: PropTypes.any,
  post: PropTypes.any,
  handleEditPress: PropTypes.any,
  postsArchiveRequest: PropTypes.any,
  postsFlagRequest: PropTypes.any,
  postsDeleteRequest: PropTypes.any,
}

export default withNavigation(
  withTheme(PendingRequests)
)
