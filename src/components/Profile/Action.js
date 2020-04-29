import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import path from 'ramda/src/path'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ProfileAction = ({
  t,
  theme,
  self,
  usersGetProfile,
  usersBlock,
  usersBlockRequest,
  usersUnblock,
  usersUnblockRequest,
  usersFollow,
  usersFollowRequest,
  usersUnfollow,
  usersUnfollowRequest,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <View style={styling.root}>
      {self ?
        <View style={styling.item}>
          <DefaultButton label={t('Settings')} onPress={navigationActions.navigateSettings(navigation)} mode="outlined" size="compact" />
        </View>
      : null}

      {!self ?
        <React.Fragment>
          <View style={styling.item}>
            {!path(['data', 'followedStatus'])(usersGetProfile) ?
              <DefaultButton
                label=""
                onPress={() => {}}
                loading={false}
                disabled={true}
                mode="outlined"
                size="compact"
              />
            : null}
            {path(['data', 'followedStatus'])(usersGetProfile) === 'NOT_FOLLOWING' ?
              <DefaultButton
                label={t('Follow User')}
                onPress={() => usersFollowRequest({ userId: path(['data', 'userId'])(usersGetProfile) })}
                loading={path(['status'])(usersFollow) === 'loading'}
                disabled={
                  path(['data', 'blockedStatus'])(usersGetProfile) === 'BLOCKING' ||
                  path(['data', 'blockerStatus'])(usersGetProfile) === 'BLOCKING'
                }
                mode="outlined"
                size="compact"
              />
            : null}
            {path(['data', 'followedStatus'])(usersGetProfile) === 'FOLLOWING' ?
              <DefaultButton
                label={t('Unfollow User')}
                onPress={() => usersUnfollowRequest({ userId: path(['data', 'userId'])(usersGetProfile) })}
                loading={path(['status'])(usersUnfollow) === 'loading'}
                mode="outlined"
                size="compact"
              />
            : null}
            {path(['data', 'followedStatus'])(usersGetProfile) === 'REQUESTED' ?
              <DefaultButton
                label={t('Cancel Request')}
                onPress={() => usersUnfollowRequest({ userId: path(['data', 'userId'])(usersGetProfile) })}
                loading={path(['status'])(usersUnfollow) === 'loading'}
                mode="outlined"
                size="compact"
              />
            : null}
          </View>

          <View style={styling.item}>
            {path(['data', 'blockedStatus'])(usersGetProfile) === 'NOT_BLOCKING' ?
              <DefaultButton
                label={t('Block User')}
                onPress={() => usersBlockRequest({ userId: path(['data', 'userId'])(usersGetProfile) })}
                loading={path(['status'])(usersBlock) === 'loading'}
                mode="outlined"
                size="compact"
              />
            :
              <DefaultButton
                label={t('Unblock User')}
                onPress={() => usersUnblockRequest({ userId: path(['data', 'userId'])(usersGetProfile) })}
                loading={path(['status'])(usersUnblock) === 'loading'}
                mode="outlined"
                size="compact"
              />
            }
          </View>
        </React.Fragment>
      : null}
    </View>
  )
}
  

const styles = theme => StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: -6,
    paddingHorizontal: theme.spacing.base,
    marginBottom: theme.spacing.base,
  },
  item: {
    flex: 1,
    marginHorizontal: 6,
  },
  itemTitle: {
  },
  itemText: {
  },
})

ProfileAction.propTypes = {
  theme: PropTypes.any,
  self: PropTypes.any,
  usersGetProfile: PropTypes.any,
  usersBlock: PropTypes.any,
  usersBlockRequest: PropTypes.any,
  usersUnblock: PropTypes.any,
  usersUnblockRequest: PropTypes.any,
  usersFollow: PropTypes.any,
  usersFollowRequest: PropTypes.any,
  usersUnfollow: PropTypes.any,
  usersUnfollowRequest: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withTheme(ProfileAction))
