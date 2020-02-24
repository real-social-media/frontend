import React from 'react'
import PostMediaViewsComponent from 'components/PostMediaViews'
import PostMediaViewsServiceComponent from 'components/PostMediaViews/index.service'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'
import UserServiceProvider from 'services/providers/User'

class PostMediaViews extends React.Component {
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

        <PostMediaViewsServiceComponent>
          {(props) => (
            <UserServiceProvider navigation={this.props.navigation}>
              {((userProps) => (
                <PostMediaViewsComponent
                  {...props}
                  {...userProps}
                />
              ))}
            </UserServiceProvider>
          )}
        </PostMediaViewsServiceComponent>
      </>
    )
  }
}

export default PostMediaViews