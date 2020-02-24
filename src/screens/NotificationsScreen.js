import React from 'react'
import NotificationsComponent from 'components/Notifications'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class NotificationsScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Translation>
          {(t) => (
            <NavigationSecondary
              title={t('Notifications')}
            />
          )}
        </Translation>

        <NotificationsComponent />
      </React.Fragment>
    )
  }
}

export default NotificationsScreen