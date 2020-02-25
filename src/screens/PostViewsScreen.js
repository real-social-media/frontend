import React from 'react'
import PostViewsComponent from 'components/PostViews'
import PostViewsServiceComponent from 'components/PostViews/index.service'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'
import UserServiceProvider from 'services/providers/User'
import * as navigationActions from 'navigation/actions'

class PostViews extends React.Component {
  render() {
    return (
      <>
        <Translation>
          {(t) => (
            <NavigationSecondary
              onClosePress={() => this.props.navigation.goBack(null)}
              title={t('Views')}
            />
          )}
        </Translation>        

        <PostViewsServiceComponent>
          {(props) => (
            <UserServiceProvider navigation={this.props.navigation}>
              {((userProps) => (
                <PostViewsComponent
                  {...props}
                  {...userProps}
                />
              ))}
            </UserServiceProvider>
          )}
        </PostViewsServiceComponent>
      </>
    )
  }
}

export default PostViews