import React from 'react'
import FeedComponent from 'components/Feed'
import FeedServiceComponent from 'components/Feed/index.service'

class FeedScreen extends React.Component {
  render() {
    return (
      <FeedServiceComponent>
        {(postsProps) => (
          <FeedComponent
            {...postsProps}
          />
        )}
      </FeedServiceComponent>
    )
  }
}

export default FeedScreen