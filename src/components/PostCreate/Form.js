import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import TextDemo from 'components/Formik/TextDemo'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import Avatar from 'templates/Avatar'
import path from 'ramda/src/path'
import RowsComponent from 'templates/Rows'
import RowsItemComponent from 'templates/RowsItem'
import UserRowComponent from 'templates/UserRow'
import CollapsableComponent from 'templates/Collapsable'
import { Text, Caption, Switch } from 'react-native-paper'
import HeaderRight from 'navigation/HeaderRight'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  lifetime: Yup.string().nullable(),
  text: Yup.string().nullable(),
})

const PostCreateForm = ({
  t,
  theme,
  handleSubmit,
  values,
  loading,
  handlePostPress,
  setFieldValue,
  formLifetime: FormLifetime,
  formAlbums: FormAlbums,
  albumsGet,
  cameraCaptureLength,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  const image = {
    url4k: values.images[0],
    url64p: values.images[0],
    url1080p: values.images[0],
  }

  navigation.setOptions({
    headerRight: () => <HeaderRight onPress={handleSubmit} title="Post" />,
  })

  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <View style={styling.header}>
          {values.postType === 'IMAGE' ?
            <TouchableOpacity onPress={() => handlePostPress({ image })}>
              <Avatar
                key={values.images[0]}
                size="bigger"
                thumbnailSource={{ uri: values.images[0] }}
                imageSource={{ uri: values.images[0] }}
              />
            </TouchableOpacity>
          : null}

          <View style={styling.text}>
            <Field name="text" component={TextDemo} placeholder={t('Write a caption')} multiline={true} />
          </View>
        </View>
      </View>

      <CollapsableComponent
        style={styling.input}
        title="Lifetime"
        helper="Change post expiry, set expiry to 1 day to post story"
        active
      >
        <FormLifetime
          values={values}
          setFieldValue={setFieldValue}
        />
      </CollapsableComponent>

      <CollapsableComponent
        style={styling.input}
        title="Albums"
        helper="Add this post to an album"
      >
        <FormAlbums
          values={values}
          setFieldValue={setFieldValue}
          albumsGet={albumsGet}
        />
      </CollapsableComponent>

      <CollapsableComponent
        style={styling.input}
        title="Privacy"
        helper="Allow others to comment, like, and share your post"
      >
        <RowsComponent items={[{
          label: t('Comments'),
          caption: t('Followers can comment on posts'),
          onPress: () => setFieldValue('commentsDisabled', !values.commentsDisabled),
          type: 'action',
          enabled: !values.commentsDisabled,
        }, {
          label: t('Likes'),
          caption: t('Followers can like your post'),
          onPress: () => setFieldValue('likesDisabled', !values.likesDisabled),
          type: 'action',
          enabled: !values.likesDisabled,
        }, {
          label: t('Sharing'),
          caption: t('Followers can share posts'),
          onPress: () => setFieldValue('sharingDisabled', !values.sharingDisabled),
          type: 'action',
          enabled: !values.sharingDisabled,
        }]}>
          {(settings) => (
            <RowsItemComponent hasBorders>
              <UserRowComponent
                onPress={path(['onPress'])(settings)}
                content={
                  <View style={styling.user}>
                    <Text style={styling.username}>{path(['label'])(settings)}</Text>
                    <Caption>{path(['caption'])(settings)}</Caption>
                  </View>
                }
                action={
                  <Switch
                    value={path(['enabled'])(settings)}
                    onValueChange={settings.onPress}
                  />
                }
              />
            </RowsItemComponent>
          )}
        </RowsComponent>
      </CollapsableComponent>

      <View style={styling.input}>
        <DefaultButton label={t('Create Post')} onPress={handleSubmit} loading={loading} disabled={loading} />
      </View>

      {cameraCaptureLength > 1 ?
        <View style={styling.helper}>
          <Caption>{cameraCaptureLength - 1} more post left to be uploaded</Caption>
        </View>
      : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  header: {
    flexDirection: 'row',
  },
  text: {
    flex: 1,
  },
  input: {
    marginBottom: theme.spacing.base,
  },
  title: {
    marginBottom: theme.spacing.base,
  },
  helper: {
    alignItems: 'center',
  },
})

PostCreateForm.propTypes = {
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  postsCreate: PropTypes.any,
  t: PropTypes.any,
  values: PropTypes.any,
  loading: PropTypes.any,
  handlePostPress: PropTypes.any,
  setFieldValue: PropTypes.any,
  formLifetime: PropTypes.any,
  formAlbums: PropTypes.any,
  albumsGet: PropTypes.any,
  cameraCaptureLength: PropTypes.any,
}

const FormWrapper = ({
  postsCreate,
  postsCreateRequest,
  cameraCapture,
  ...props
}) => (
  <Formik
    initialValues={{
      lifetime: null,
      postType: props.postType,
      likesDisabled: props.user.likesDisabled,
      commentsDisabled: props.user.commentsDisabled,
      sharingDisabled: props.user.sharingDisabled,
      verificationHidden: props.user.verificationHidden,
      text: '',
      images: [path(['uri'])(cameraCapture)],
      takenInReal: path(['takenInReal'])(cameraCapture),
      originalFormat: path(['originalFormat'])(cameraCapture),
      originalMetadata: path(['originalMetadata'])(cameraCapture),
    }}
    validationSchema={formSchema}
    onSubmit={postsCreateRequest}
    enableReinitialize
  >
    {(formikProps) => (
      <PostCreateForm
        {...formikProps}
        {...props}
      />
    )}
  </Formik>
)

export default withTranslation()(withTheme(FormWrapper))
