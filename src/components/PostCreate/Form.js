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
import { Text, Caption, Title, Switch } from 'react-native-paper'
import NextIcon from 'assets/svg/settings/Next'
import Layout from 'constants/Layout'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  lifetime: Yup.string().nullable(),
  text: Yup.string().nullable(),
})

const PostCreateForm = ({
  theme,
  handleSubmit,
  values,
  loading,
  handlePostPress,
  setFieldValue,
  formLifetime: FormLifetime,
  formAlbums: FormAlbums,
  albumsGet,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const image = {
    url4k: values.images[0],
    url64p: values.images[0],
    url1080p: values.images[0],
  }

  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <View style={styling.header}>
          {values.postType === 'IMAGE' ?
            <TouchableOpacity onPress={() => handlePostPress({ image })}>
              <Avatar
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

      <View style={styling.input}>
        <Title style={styling.title}>Albums</Title>

        <FormAlbums
          values={values}
          setFieldValue={setFieldValue}
          albumsGet={albumsGet}
        />
      </View>

      <View style={styling.input}>
        <Title style={styling.title}>Privacy</Title>

        <RowsComponent items={[{
          label: t('Comments'),
          caption: t('Followers can comment on posts'),
          onPress: () => setFieldValue('commentsDisabled', !values.commentsDisabled),
          type: 'action',
          enabled: !values.commentsDisabled,
        }, {
          label: t('First Like'),
          caption: t('See the first user to like your post'),
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
                  path(['type'])(settings) === 'navigation' ? (
                    <NextIcon fill={theme.colors.text} />
                  ) : (
                    <Switch
                      value={path(['enabled'])(settings)}
                      onValueChange={settings.onPress}
                    />
                  )
                }
              />
            </RowsItemComponent>
          )}
        </RowsComponent>
      </View>

      <View style={styling.input}>
        <Title style={styling.title}>Lifetime</Title>

        <FormLifetime
          values={values}
          setFieldValue={setFieldValue}
        />
      </View>

      <View style={styling.input}>
        <DefaultButton label={t('Create Post')} onPress={handleSubmit} loading={loading} />
      </View>
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
    marginBottom: 24,
  },
  title: {
    marginBottom: theme.spacing.base,
  },
})

PostCreateForm.propTypes = {
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  postsCreate: PropTypes.any,
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
      originalFormat: path(['originalFormat'])(cameraCapture)
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

export default withTheme(FormWrapper)
