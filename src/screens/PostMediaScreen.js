import React from 'react'
import PostMediaComponent from 'components/PostMedia'
import PostMediaServiceComponent from 'components/PostMedia/index.service'
import ThemeServiceProvider from 'services/providers/Theme'
import PostsListServiceComponent from 'components/PostsList/index.service'
import { Provider as PaperProvider } from 'react-native-paper'

class PostMediaScreen extends React.Component {
  render() {
    return (
      <ThemeServiceProvider themeCode={this.props.route.params.post.postedBy.themeCode}>
        {((themeProps) => (
          <PaperProvider theme={themeProps.activeTheme}>
            <PostsListServiceComponent>
              {(postsProps) => (
                <PostMediaServiceComponent {...postsProps}>
                  {(postsProps) => (
                    <PostMediaComponent
                      {...postsProps}
                    />
                  )}
                </PostMediaServiceComponent>
              )}
            </PostsListServiceComponent>
          </PaperProvider>
        ))}
      </ThemeServiceProvider>
    )
  }
}

export default PostMediaScreen