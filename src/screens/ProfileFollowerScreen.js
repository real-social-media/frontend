import React from 'react'
import ProfileFollowerComponent from 'components/ProfileFollower'
import ProfileFollowerServiceComponent from 'components/ProfileFollower/index.service'
import ThemeServiceProvider from 'services/providers/Theme'
import { Provider as PaperProvider } from 'react-native-paper'

class ProfileFollower extends React.Component {
  render() {
    return (
      <ThemeServiceProvider themeCode={this.props.route.params.user.themeCode}>
        {((themeProps) => (
          <PaperProvider theme={themeProps.activeTheme}>
            <ProfileFollowerServiceComponent>
              {(props) => (
                <ProfileFollowerComponent
                  {...props}
                />
              )}
            </ProfileFollowerServiceComponent>
          </PaperProvider>
        ))}
      </ThemeServiceProvider>
    )
  }
}

export default ProfileFollower