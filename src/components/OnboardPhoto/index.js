import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import { Subheading } from 'react-native-paper'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import * as navigationActions from 'navigation/actions'
import UploadingComponent from 'components/PostsList/Uploading'
import FeatureComponent from 'templates/Feature'
import path from 'ramda/src/path'
import Avatar from 'templates/Avatar'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const OnboardPhoto = ({
  t,
  theme,
  user,
  cameraCapture,
  cameraCaptureIdle,
  postsCreateRequest,
  postsCreateIdle,
  postsCreateQueue,
  usersEditProfile,
  profileEditing,
  handleLibrarySnap,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  
  const handleRetake = () => {
    cameraCaptureIdle({ uri: path(['data', 0, 'uri'])(cameraCapture) })
    navigationActions.navigateOnboardCamera(navigation, { nextRoute: 'OnboardPhoto' })()
  }

  const postsCreateQueueFiltered = Object.values(postsCreateQueue)
    .filter(item => item.status === 'loading')

  const helperVisiblity = (
    !path(['data', 0, 'uri'])(cameraCapture) &&
    !postsCreateQueueFiltered.length &&
    usersEditProfile.status === 'idle'
  )

  const progressVisibility = (
    !path(['data', 0, 'uri'])(cameraCapture) &&
    postsCreateQueueFiltered.length
  )

  const uploadVisibility = (
    path(['data', 0, 'uri'])(cameraCapture) &&
    !postsCreateQueueFiltered.length
  )

  const failureVisibility = (
    usersEditProfile.status === 'failure' &&
    !path(['data', 0, 'uri'])(cameraCapture) &&
    !postsCreateQueueFiltered.length
  )

  // const processingVisibility = (
  //   usersEditProfile.status === 'idle' &&
  //   !path(['data', 0, 'uri'])(cameraCapture) &&
  //   !postsCreateQueueFiltered.length
  // )

  return (
    <View style={styling.root}>
      {failureVisibility && profileEditing ?
        <View style={[styling.content, styling.padding]}>
          <Subheading style={styling.subheading}>{t('Processing.')}</Subheading>
        </View>
      : null}

      {failureVisibility && !profileEditing ?
        <View style={[styling.content, styling.padding]}>
          <Subheading style={styling.subheading}>{t('Your photo verification has failed.')}</Subheading>

          <View style={styling.action}>
            <FeatureComponent active>{t('The Photo must be uncropped')}</FeatureComponent>
            <FeatureComponent active>{t('The Photo must be unrotated')}</FeatureComponent>
            <FeatureComponent active>{t('The Photo must have been taken on this phone (not sent to you)')}</FeatureComponent>
            <FeatureComponent active>{t('If you’re still having trouble, photos taken using the camera inside the REAL app will always pass verification')}</FeatureComponent>
          </View>

          <View style={styling.action}>
            <DefaultButton label={t('Take new Photo')} onPress={navigationActions.navigateOnboardCamera(navigation, { nextRoute: 'OnboardPhoto' })} />
          </View>
        </View>
      : null}

      {helperVisiblity && !profileEditing ?
        <View style={[styling.content, styling.padding]}>
          <Subheading style={styling.subheading}>{t('Please choose a profile picture to get started!')}</Subheading>

          <View style={styling.action}>
            <DefaultButton label={t('Take a Photo')} onPress={navigationActions.navigateOnboardCamera(navigation, { nextRoute: 'OnboardPhoto' })} />
          </View>

          <View style={styling.action}>
            <DefaultButton label={t('Choose From Gallery')} onPress={handleLibrarySnap} />
          </View>
        </View>
      : null}

      {progressVisibility ?
        <View style={styling.content}>
          <View style={styling.uploading}>
            {postsCreateQueueFiltered.map((post, key) => (
              <UploadingComponent
                key={key}
                user={user}
                post={post}
                postsCreateRequest={postsCreateRequest}
                postsCreateIdle={postsCreateIdle}
              />
            ))}
          </View>
        </View>
      : null}

      {uploadVisibility ?
        <View style={[styling.content, styling.padding]}>
          <View style={styling.action}>
            <Avatar
              thumbnailSource={{ uri: path(['data', 0, 'uri'])(cameraCapture) }}
              imageSource={{ uri: path(['data', 0, 'uri'])(cameraCapture) }}
              size="large"
            />
          </View>

          <Subheading style={styling.subheading}>{t('Please choose a profile picture to get started!')}</Subheading>

          <View style={styling.action}>
            <DefaultButton label={t('Upload this photo')} onPress={() => postsCreateRequest({
              images: [path(['data', 0, 'uri'])(cameraCapture)],
              takenInReal: path(['data', 0, 'takenInReal'])(cameraCapture),
              originalFormat: path(['data', 0, 'originalFormat'])(cameraCapture),
            })} />
          </View>

          <View style={styling.action}>
            <DefaultButton label={t('Retake')} onPress={handleRetake} mode="outlined" />
          </View>
        </View>
      : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  padding: {
    paddingHorizontal: 48,
  },
  action: {
    justifyContent: 'center',
    paddingVertical: 12,
  },
  subheading: {
    textAlign: 'center',
  },
})

OnboardPhoto.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  user: PropTypes.any,
  cameraCapture: PropTypes.any,
  cameraCaptureIdle: PropTypes.any,
  postsCreateRequest: PropTypes.any,
  postsCreateIdle: PropTypes.any,
  postsCreateQueue: PropTypes.any,
  usersEditProfile: PropTypes.any,
  profileEditing: PropTypes.any,
}

export default withTranslation()(withTheme(OnboardPhoto))
