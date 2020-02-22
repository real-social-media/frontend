import React from 'react'
import PostMediaLikesComponent from 'components/PostMediaLikes'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class PostMediaLikesScreen extends React.Component {
  static navigationOptions = ({ screenProps }) => ({
    headerShown: false,
  })
  
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

        <PostMediaLikesComponent />
      </>
    )
  }
}

export default PostMediaLikesScreen