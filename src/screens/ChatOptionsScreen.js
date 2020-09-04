import React from 'react'
import ChatOptionsComponent from 'components/ChatOptions'
import ChatOptionsServiceComponent from 'components/ChatOptions/index.service'

class ChatOptionsScreen extends React.Component {
  render() {
    return (
      <ChatOptionsServiceComponent>
        {(props) => (
          <ChatOptionsComponent
            {...props}
          />
        )}
      </ChatOptionsServiceComponent>
    )
  }
}

export default ChatOptionsScreen