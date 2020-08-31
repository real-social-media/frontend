import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, SafeAreaView, StyleSheet, View } from 'react-native'
import TextIcon from 'assets/svg/types/Text'
import PhotoIcon from 'assets/svg/types/Photo'
import GalleryIcon from 'assets/svg/types/Gallery'
import { Subheading } from 'react-native-paper'
import color from 'color'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'
import testIDs from './test-ids'

const PostType = ({ t, theme, handleLibrarySnap, handlePhotoTab, handleTextPostTab, handleClose }) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <TouchableOpacity testID={testIDs.backdrop} style={styling.backdrop} onPress={handleClose} />

      <SafeAreaView style={styling.component}>
        <View style={styling.types}>
          <TouchableOpacity style={styling.type} onPress={handlePhotoTab}>
            <View style={styling.icon}>
              <PhotoIcon fill={color(theme.colors.text).negate().string()} />
            </View>
            <Subheading style={styling.text}>{t('Photo')}</Subheading>
          </TouchableOpacity>
          <TouchableOpacity style={styling.type} onPress={handleLibrarySnap}>
            <View style={styling.icon}>
              <GalleryIcon fill={color(theme.colors.text).negate().string()} />
            </View>
            <Subheading style={styling.text}>{t('Gallery')}</Subheading>
          </TouchableOpacity>
          <TouchableOpacity style={styling.type} onPress={handleTextPostTab}>
            <View style={styling.icon}>
              <TextIcon fill={color(theme.colors.text).negate().string()} />
            </View>
            <Subheading style={styling.text}>{t('Text')}</Subheading>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styling.close} onPress={handleClose}>
          <Subheading style={styling.closeText}>{t('x close')}</Subheading>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdrop: {
      ...StyleSheet.absoluteFill,
    },
    gradient: {
      ...StyleSheet.absoluteFill,
    },
    component: {
      height: 180,
      borderRadius: 24,
      backgroundColor: theme.colors.backgroundSecondary,
    },
    types: {
      zIndex: 2,
      maxWidth: 300,
      flexDirection: 'row',
      alignSelf: 'center',
      paddingTop: theme.spacing.base * 2,
      paddingBottom: theme.spacing.base,
    },
    type: {
      paddingHorizontal: theme.spacing.base,
    },
    close: {
      zIndex: 2,
      alignSelf: 'center',
      paddingHorizontal: theme.spacing.base * 2,
    },
    icon: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: theme.colors.text,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    text: {
      color: theme.colors.text,
      fontWeight: '500',
      alignSelf: 'center',
      fontSize: 14,
    },
    closeText: {
      color: theme.colors.text,
      fontSize: 14,
    },
  })

PostType.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  handleLibrarySnap: PropTypes.func,
  handlePhotoTab: PropTypes.func,
  handleTextPostTab: PropTypes.func,
  handleClose: PropTypes.func,
}

export default withTranslation()(withTheme(PostType))
