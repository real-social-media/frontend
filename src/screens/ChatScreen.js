import React from 'react'
import ChatComponent from 'components/Chat'
import ChatServiceComponent from 'components/Chat/index.service'

class ChatScreen extends React.Component {
  render() {
    return (
      <ChatServiceComponent>
        {(props) => (
          <ChatComponent
            {...props}
          />
        )}
      </ChatServiceComponent>
    )
  }
}

export default ChatScreen