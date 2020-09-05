import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import AlbumCreateForm from 'components/AlbumCreate/Form'
import { withTheme } from 'react-native-paper'

const AlbumCreateComponent = ({ theme, albumsCreateRequest, isSubmitting }) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <View style={styling.form}>
        <AlbumCreateForm albumsCreateRequest={albumsCreateRequest} isSubmitting={isSubmitting} />
      </View>
    </View>
  )
}

AlbumCreateComponent.propTypes = {
  theme: PropTypes.any,
  albumsCreateRequest: PropTypes.func,
  isSubmitting: PropTypes.bool,
}

AlbumCreateComponent.defaultProps = {
  isSubmitting: false,
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.backgroundPrimary,
    },
    form: {
      padding: theme.spacing.base,
    },
  })

export default withTheme(AlbumCreateComponent)
