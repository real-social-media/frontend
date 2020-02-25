import React from 'react'
import ThemeComponent from 'components/Theme'
import ThemeServiceComponent from 'components/Theme/index.service'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import ThemeModalComponent from 'components/ThemeModal'
import FeedScreen from 'screens/FeedScreen'
import { Provider as PaperProvider } from 'react-native-paper'
import { Translation } from 'react-i18next'
import * as navigationActions from 'navigation/actions'

class ThemeScreen extends React.Component {
  render() {
    return (
      <ThemeServiceComponent>
        {(props) => (
          <React.Fragment>
            {props.themePreview.status === 'success' ?
              <ThemeModalComponent
                isVisible={props.themePreview.status === 'success'}
                onApplyClick={() => {
                  props.usersEditProfileRequest()
                  props.themePreviewIdle()
                }}
                onDiscardClick={() => props.themePreviewIdle()}
              >
                <PaperProvider theme={props.themePreview.data.theme}>
                  <FeedScreen />
                </PaperProvider>
              </ThemeModalComponent>
            : null}

            <Translation>
              {(t) => (
                <NavigationSecondary
                  onNavLeftPress={() => this.props.navigation.goBack(null)}
                  title={t('Choose Theme')}
                />
              )}
            </Translation>            

            <ThemeComponent
              {...props}
            />
          </React.Fragment>
        )}
      </ThemeServiceComponent>
    )
  }
}

export default ThemeScreen