import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import RowsComponent from 'templates/Rows'
import RowsItemComponent from 'templates/RowsItem'
import UserRowComponent from 'templates/UserRow'
import ThemeRowActionComponent from 'templates/ThemeRowAction'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'

const Translation = ({ theme, user, usersEditProfileRequest, translationFetch }) => {
  const styling = styles(theme)

  return (
    <ScrollView>
      <View style={styling.root}>
        <RowsComponent items={Object.keys(path(['data'])(translationFetch))}>
          {(translation) => (
            <RowsItemComponent>
              <UserRowComponent
                avatar={null}
                content={
                  <View>
                    <Text style={styling.username}>{translation}</Text>
                  </View>
                }
                action={
                  <ThemeRowActionComponent
                    enabled={user.languageCode === translation}
                    onEnablePress={() => usersEditProfileRequest({ languageCode: translation })}
                    onDisablePress={() => usersEditProfileRequest({ languageCode: translation })}
                  />
                }
              />
            </RowsItemComponent>
          )}
        </RowsComponent>
      </View>
    </ScrollView>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.backgroundPrimary,
      padding: theme.spacing.base,
    },
    form: {
      padding: theme.spacing.base,
    },
  })

Translation.propTypes = {
  theme: PropTypes.any,
  initialValues: PropTypes.any,
  translationFetch: PropTypes.any,
  translationUpdate: PropTypes.any,
  translationUpdateRequest: PropTypes.any,
  user: PropTypes.any,
  usersEditProfileRequest: PropTypes.any,
}

export default withTheme(Translation)
