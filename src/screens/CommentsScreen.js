import React from 'react'
import CommentsComponent from 'components/Comments'
import CommentsServiceComponent from 'components/Comments/index.service'

class Comments extends React.Component {
  render() {
    return (
      <CommentsServiceComponent>
        {(props) => (
          <CommentsComponent
            {...props}
          />
        )}
      </CommentsServiceComponent>
    )
  }
}

export default Comments