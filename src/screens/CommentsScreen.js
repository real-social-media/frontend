import React from 'react'
import CommentsComponent from 'components/Comments'
import CommentsServiceComponent from 'components/Comments/index.service'
import UserServiceProvider from 'services/providers/User'

class Comments extends React.Component {
  render() {
    return (
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
    )
  }
}

export default Comments