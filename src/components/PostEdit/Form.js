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
import dayjs from 'dayjs'
import HeaderRight from 'navigation/HeaderRight'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

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
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  const image = {
    url4k: values.uri,
    url64p: values.uri,
    url1080p: values.uri,
  }

  navigation.setOptions({
    headerRight: () => <HeaderRight onPress={handleSubmit} title="Update" />,
  })

  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <View style={styling.header}>
          {values.postType === 'IMAGE' ?
            <TouchableOpacity onPress={() => handlePostPress({ image })}>
              <Avatar
                size="bigger"
                thumbnailSource={{ uri: values.uri }}
                imageSource={{ uri: values.uri }}
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
        <DefaultButton label={t('Save')} onPress={handleSubmit} loading={loading} disabled={loading} />
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
    marginBottom: theme.spacing.base,
  },
  title: {
    marginBottom: theme.spacing.base,
  },
})

PostEditForm.propTypes = {
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  postEdit: PropTypes.any,
  t: PropTypes.any,
  values: PropTypes.any,
  loading: PropTypes.any,
  handlePostPress: PropTypes.any,
  setFieldValue: PropTypes.any,
  formLifetime: PropTypes.any,
  formAlbums: PropTypes.any,
  albumsGet: PropTypes.any,
}

export default withTranslation()(withTheme(({
  postsEdit,
  postsEditRequest,
  postsSingleGet,
  ...props
}) => (
  <Formik
    initialValues={{
      postType: postsSingleGet.data.postType,
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
)))
