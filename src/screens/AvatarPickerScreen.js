import React from 'react'
import { SafeAreaView } from 'react-native'
import AvatarPickerComponent from 'components/AvatarPicker'
import AvatarPickerServiceComponent from 'components/AvatarPicker/index.service'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class AvatarPickerScreen extends React.Component {
  render() {
    return (
      <AvatarPickerServiceComponent>
        {(props) => (
          <SafeAreaView style={{ flex: 1 }}>
            <Translation>
              {(t) => (
                <NavigationSecondary
                  title={t('Upload Profile Photo')}
                />
              )}
            </Translation>            

            <AvatarPickerComponent
              {...props}
            />
          </SafeAreaView>
        )}
      </AvatarPickerServiceComponent>
    )
  }
}

export default AvatarPickerScreen