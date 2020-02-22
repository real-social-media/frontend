import React from 'react'
import PostShareServiceComponent from 'components/PostShare/index.service'
import PostShareComponent from 'components/PostShare'

class PostShareScreen extends React.Component {
  static navigationOptions = ({ screenProps }) => ({
    headerShown: false,
  })
  
  render() {
    return (
      <>
        <PostShareServiceComponent>
          {((shareProps) => (
            <PostShareComponent
              {...shareProps}
            />
          ))}
        </PostShareServiceComponent>
      </>
    )
  }
}

export default PostShareScreen