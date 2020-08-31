import React from 'react'
import StoryServiceComponent from 'components/Story/index.service'
import StoryComponent from 'components/Story'

class StoryScreen extends React.Component {
  render() {
    return <StoryServiceComponent>{(storyProps) => <StoryComponent {...storyProps} />}</StoryServiceComponent>
  }
}

export default StoryScreen
