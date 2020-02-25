import React from 'react'
import PostCreateComponent from 'components/PostCreate'
import PostCreateServiceComponent from 'components/PostCreate/index.service'
import PostsPreviewComponent from 'components/PostsPreview/'
import PostsPreviewServiceComponent from 'components/PostsPreview/index.service'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'
import * as navigationActions from 'navigation/actions'

class PostCreateScreen extends React.Component {
  render() {
    return (
      <>
        <Translation>
          {(t) => (
            <NavigationSecondary
              onClosePress={navigationActions.navigateCamera(this.props.navigation)}
              title={t('New Photo')}
            />
          )}
        </Translation>

        <PostsPreviewServiceComponent>
          {((previewProps) => (
            <PostCreateServiceComponent>
              {(props) => (
                <React.Fragment>
                  <PostsPreviewComponent
                    {...previewProps}
                  />
                  <PostCreateComponent
                    {...props}
                    {...previewProps}
                  />
                </React.Fragment>
              )}
            </PostCreateServiceComponent>
          ))}
        </PostsPreviewServiceComponent>
      </>
    )
  }
}

export default PostCreateScreen