import React from 'react'
import PropTypes from 'prop-types'
import {
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import TextIcon from 'assets/svg/types/Text'
import PhotoIcon from 'assets/svg/types/Photo'
import GalleryIcon from 'assets/svg/types/Gallery'
import { Subheading } from 'react-native-paper'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const PostType = ({
  t,
  theme,
  handleLibrarySnap,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <View style={styling.root}>
      <TouchableOpacity style={styling.backdrop} onPress={navigationActions.navigateBack(navigation)} />
    
      <View style={styling.component}>
        <LinearGradient
          colors={['#0984e3', '#74b9ff']}
          style={styling.gradient}
        />

        <View style={styling.types}>
          <TouchableOpacity style={styling.type} onPress={() => {
            navigation.popToTop()
            navigationActions.navigateCamera(navigation)()
          }}>
            <View style={styling.icon}>
              <PhotoIcon fill="#000000" />
            </View>
            <Subheading style={styling.text}>{t('Photo')}</Subheading>
          </TouchableOpacity>
          <TouchableOpacity style={styling.type} onPress={() => {
            navigation.popToTop()
            handleLibrarySnap()
          }}>
            <View style={styling.icon}>
              <GalleryIcon fill="#000000" />
            </View>
            <Subheading style={styling.text}>{t('Gallery')}</Subheading>
          </TouchableOpacity>
          <TouchableOpacity style={styling.type} onPress={() => {
            navigation.popToTop()
            navigationActions.navigatePostCreate(navigation, { type: 'TEXT_ONLY', })()
          }}>
            <View style={styling.icon}>
              <TextIcon fill="#000000" />
            </View>
            <Subheading style={styling.text}>{t('Text')}</Subheading>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styling.close} onPress={() => {
          navigation.popToTop()
          navigationActions.navigateBack(navigation)()
        }}>
          <Subheading style={styling.closeText}>{t('x close')}</Subheading>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
  component: {
    height: 180,
    width: '100%',
    borderRadius: 38,
    overflow: 'hidden',
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
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontWeight: '500',
    alignSelf: 'center',
    fontSize: 14,
  },
  closeText: {
    color: '#eeeeee',
    fontSize: 14,
  },
})

PostType.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  handleLibrarySnap: PropTypes.any,
}

export default withTranslation()(withTheme(PostType))
