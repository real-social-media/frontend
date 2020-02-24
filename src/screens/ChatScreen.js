import React from 'react'
import ChatComponent from 'components/Chat'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class ChatScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Translation>
          {(t) => (
            <NavigationSecondary
              title={t('Chat')}
            />
          )}
        </Translation>

        <ChatComponent />
      </React.Fragment>
    )
  }
}

export default ChatScreen