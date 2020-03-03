# REAL Frontend
REAL is the healthier social media movement. 
It’s a camera app and social media platform designed with mental health in mind. No ads, no filters and no likes.

|home   |profile   |create   |
|---|---|---|
|![home](https://raw.githubusercontent.com/real-social-media/frontend/readme/docs/assets/home.png)|![home](https://raw.githubusercontent.com/real-social-media/frontend/readme/docs/assets/profile.png)   |![home](https://raw.githubusercontent.com/real-social-media/frontend/readme/docs/assets/create.png)   |

## Setup Development Environment
- execute `yarn install` from `[root]` folder to get npm dependencies
- execute `pod install` from `/ios` folder to get cocoapods dependencies
- create `.env.development` file with environment variables as in example
- setup sentry config by
  - manually creating `ios/sentry.properties` file with sentry config
  - executing `yarn sentry-wizard -i reactNative -p ios android` from `[root]`

## Staging Deployment
- execute `fastlane beta --env development` from `/ios` folder

## Appstore Release
- manually create next application version tag
- execute `fastlane beta --env production` from `/ios` folder
- manually submit next version at `https://appstoreconnect.apple.com/`
