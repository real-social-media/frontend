import React from 'react'
import ChatDirectComponent from 'components/ChatDirect'
import ChatDirectServiceComponent from 'components/ChatDirect/index.service'

class ChatDirectScreen extends React.Component {
  render() {
    return (
      <ChatDirectServiceComponent>
        {(props) => (
          <ChatDirectComponent
            {...props}
          />
        )}
      </ChatDirectServiceComponent>
    )
  }
}

export default ChatDirectScreen