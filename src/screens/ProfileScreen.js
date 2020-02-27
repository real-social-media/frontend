import React from 'react'
import PostsGridServiceComponent from 'components/PostsGrid/index.service'
import ProfileServiceComponent from 'components/Profile/index.service'
import ProfileComponent from 'components/Profile'
import ThemeServiceProvider from 'services/providers/Theme'
import { Provider as PaperProvider } from 'react-native-paper'

class ProfileScreen extends React.Component {
  render() {
    return (
      <ThemeServiceProvider themeCode={this.props.route.params.user.themeCode}>
        {((themeProps) => (
          <ProfileServiceComponent>
            {(profileProps) => (
              <PaperProvider theme={themeProps.activeTheme}>
                <PostsGridServiceComponent>
                  {(postsProps) => (
                    <ProfileComponent
                      {...profileProps}
                      {...postsProps}
                    />
                  )}
                </PostsGridServiceComponent>
              </PaperProvider>
            )}
          </ProfileServiceComponent>
        ))}
      </ThemeServiceProvider>
    )
  }
}

export default ProfileScreen