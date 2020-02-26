import React from 'react'
import PostMediaComponent from 'components/PostMedia'
import PostMediaServiceComponent from 'components/PostMedia/index.service'
import UserServiceProvider from 'services/providers/User'
import PostsListServiceComponent from 'components/PostsList/index.service'
import { Provider as PaperProvider } from 'react-native-paper'

class FeedScreen extends React.Component {
  render() {
    return (
      <PaperProvider theme={this.props.route.params.theme}>
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
    )
  }
}

export default FeedScreen