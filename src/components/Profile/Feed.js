import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import PostsGridComponent from 'components/PostsGrid'
import PostsGridServiceComponent from 'components/PostsGrid/index.service'
import path from 'ramda/src/path'
import PostsLoadingComponent from 'components/Feed/PostsLoading'
import ContextComponent from 'components/Cache/Context'

import { withTheme } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ProfileFeed = ({
  t,
  theme,
}) => {
  const styling = styles(theme)
  
  return (
    <PostsGridServiceComponent postsGetRequestOnMount={true}>
      {(postsProps) => (
        <View style={styling.root}>
          <ContextComponent.Consumer>
            {(contextProps) => (
              <PostsGridComponent
                postsGet={postsProps.postsGet}
                themeFetch={postsProps.themeFetch}
                themeCode={path(['data', 'themeCode'])(postsProps.user)}
                themes={postsProps.themes}
                priorityQueueInstance={contextProps.feedImages}
              />
            )}
          </ContextComponent.Consumer>

          {(path(['status'])(postsProps.postsGet) === 'loading' && !path(['data', 'length'])(postsProps.postsGet)) ?
            <PostsLoadingComponent />
          : null}
        </View>
      )}
    </PostsGridServiceComponent>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
})

ProfileFeed.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withTheme(ProfileFeed))
