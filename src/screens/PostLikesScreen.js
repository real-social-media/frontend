import React from 'react'
import PostLikesComponent from 'components/PostLikes'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'
import * as navigationActions from 'navigation/actions'

class PostLikesScreen extends React.Component {
  render() {
    return (
      <>
        <Translation>
          {(t) => (
            <NavigationSecondary
              title={t('REAL Likes')}
              onClosePress={() => this.props.navigation.goBack(null)}
            />
          )}
        </Translation>

        <PostLikesComponent />
      </>
    )
  }
}

export default PostLikesScreen