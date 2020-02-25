import React from 'react'
import PostMediaComponent from 'components/PostMedia'
import PostMediaServiceComponent from 'components/PostMedia/index.service'
import UserServiceProvider from 'services/providers/User'
import PostsListServiceComponent from 'components/PostsList/index.service'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'
import { Provider as PaperProvider } from 'react-native-paper'
import * as navigationActions from 'navigation/actions'

class FeedScreen extends React.Component {
  render() {
    return (
      <>
        <PaperProvider theme={this.props.route.params.theme}>
          <Translation>
            {(t) => (
              <NavigationSecondary
                onClosePress={() => this.props.navigation.goBack(null)}
                title={t('Photo')}
              />
            )}
          </Translation>
          <PostsListServiceComponent>
            {(postsProps) => (
              <PostMediaServiceComponent {...postsProps}>
                {(postsProps) => (
                  <UserServiceProvider navigation={this.props.navigation}>
                    {((userProps) => (
                      <PostMediaComponent
                        {...postsProps}
                        {...userProps}
                      />
                    ))}
                  </UserServiceProvider>
                )}
              </PostMediaServiceComponent>
            )}
          </PostsListServiceComponent>
        </PaperProvider>
      </>
    )
  }
}

export default FeedScreen