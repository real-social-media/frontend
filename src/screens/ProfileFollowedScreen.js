import React from 'react'
import ProfileFollowedComponent from 'components/ProfileFollowed'
import ProfileFollowedServiceComponent from 'components/ProfileFollowed/index.service'
import ThemeServiceProvider from 'services/providers/Theme'
import { Provider as PaperProvider } from 'react-native-paper'

class ProfileFollowed extends React.Component {
  render() {
    return (
      <ThemeServiceProvider themeCode={this.props.route.params.user.themeCode}>
        {((themeProps) => (
          <PaperProvider theme={themeProps.activeTheme}>
            <ProfileFollowedServiceComponent>
              {(props) => (
                <ProfileFollowedComponent
                  {...props}
                />
              )}
            </ProfileFollowedServiceComponent>
          </PaperProvider>
        ))}
      </ThemeServiceProvider>
    )
  }
}

export default ProfileFollowed