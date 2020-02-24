import React from 'react'
import CommentsComponent from 'components/Comments'
import CommentsServiceComponent from 'components/Comments/index.service'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'
import UserServiceProvider from 'services/providers/User'

class Comments extends React.Component {
  render() {
    return (
      <>
        <Translation>
          {(t) => (
            <NavigationSecondary
              onClosePress={() => this.props.navigation.goBack(null)}
              title={t('Comments')}
            />
          )}
        </Translation>        

        <CommentsServiceComponent>
          {(props) => (
            <UserServiceProvider navigation={this.props.navigation}>
              {((userProps) => (
                <CommentsComponent
                  {...props}
                  {...userProps}
                />
              ))}
            </UserServiceProvider>
          )}
        </CommentsServiceComponent>
      </>
    )
  }
}

export default Comments