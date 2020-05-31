import React from 'react'
import ChatComponent from 'components/Chat'
import ChatServiceComponent from 'components/Chat/index.service'
import CardsComponent from 'components/Cards'
import CardsServiceComponent from 'components/Cards/index.service'

class ChatScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CardsServiceComponent>
          {(props) => (
            <CardsComponent
              {...props}
            />
          )}
        </CardsServiceComponent>
        <ChatServiceComponent>
          {(props) => (
            <ChatComponent
              {...props}
            />
          )}
        </ChatServiceComponent>
      </React.Fragment>
    )
  }
}

export default ChatScreen