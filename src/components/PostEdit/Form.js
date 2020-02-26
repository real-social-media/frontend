import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
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
import dayjs from 'dayjs'
import Layout from 'constants/Layout'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  text: Yup.string().nullable(),
})

const getInitialLifetime = (expiresAt) => {
  if (!expiresAt) {
    return null
  }

  if (dayjs(expiresAt).isBefore(dayjs().add(1, 'day'))) {
    return 'P1D'
  } else if (dayjs(expiresAt).isBefore(dayjs().add(7, 'day'))) {
    return 'P7D'
  } else if (dayjs(expiresAt).isBefore(dayjs().add(1, 'month'))) {
    return 'P1M'
  } else if (dayjs(expiresAt).isBefore(dayjs().add(1, 'year'))) {
    return 'P1Y'
  }
}

const PostEditForm = ({
  theme,
  navigation,
  handleSubmit,
  values,
  loading,
  setFieldValue,
  formLifetime: FormLifetime,
  formAlbums: FormAlbums,
  albumsGet,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <View style={styling.header}>
          <View style={styling.avatar}>
            <Avatar
              size="bigger"
              thumbnailSource={{ uri: values.uri }}
              imageSource={{ uri: values.uri }}
            />
          </View>

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
          label: t('Share'),
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
        <DefaultButton label={t('Edit Post')} onPress={handleSubmit} loading={loading} />
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

PostEditForm.propTypes = {
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  postEdit: PropTypes.any,
}

export default withTheme(({
  postsEdit,
  postsEditRequest,
  postsSingleGet,
  ...props
}) => (
  <Formik
    initialValues={{
      postId: postsSingleGet.data.postId,
      uri: path(['image', 'url1080p'])(postsSingleGet.data),
      text: postsSingleGet.data.text,
      expiresAt: postsSingleGet.data.expiresAt,
      commentsDisabled: postsSingleGet.data.commentsDisabled,
      likesDisabled: postsSingleGet.data.likesDisabled,
      sharingDisabled: postsSingleGet.data.sharingDisabled,
      lifetime: getInitialLifetime(postsSingleGet.data.expiresAt),
      albumId: path(['album', 'albumId'])(postsSingleGet.data),
    }}
    validationSchema={formSchema}
    onSubmit={postsEditRequest}
    enableReinitialize
  >
    {(formikProps) => (
      <PostEditForm
        {...formikProps}
        {...props}
        loading={postsEdit.status === 'loading'}
      />
    )}
  </Formik>
))
