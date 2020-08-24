# REAL Frontend
REAL is the healthier social media movement. 
It’s a camera app and social media platform designed with mental health in mind. No ads, no filters and no likes.

|home   |profile   |create   |
|---|---|---|
|![home](https://raw.githubusercontent.com/real-social-media/frontend/master/docs/assets/home.png)|![home](https://raw.githubusercontent.com/real-social-media/frontend/master/docs/assets/profile.png)   |![home](https://raw.githubusercontent.com/real-social-media/frontend/master/docs/assets/create.png)   |

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

## E2E tests
To make our releases stable we cover code by e2e-tests. We use [`Detox`](https://github.com/wix/Detox) it is a gray box end-to-end testing and automation library for mobile apps.

Currently, we support e2e-tests only for iOS platform.

#### Getting Started
- Install Node 8.3.0 or above
- Setting Up an [`iOS Environment`](https://github.com/wix/Detox/blob/master/docs/Introduction.IosDevEnv.md):
- Add env variables from `.env.example` with prefix `E2E_` to the `.env.development` file
- Create an [`Mailslurp`](https://www.mailslurp.com/) account and add your API-key as a `MAIL_SLURP_API_KEY` variable to the `.env.development` file
- execute `yarn tests:e2e` from `[root]` folder to run tests

#### Writing tests
Tests are located in `/e2e/specs` folder and have `*.e2e.js` file extension. Each file represents tests for a one single feature. 

As a test runner we use `jest` it provided `describe` and `it` blocks for organizing tests. We use a mix of [`User Stories`](https://en.wikipedia.org/wiki/User_story) and [`Gherkin`](https://cucumber.io/docs/gherkin/reference/) syntaxis to make our tests readable and supportable. Use user story in a describe section for `describe` section for describe testing functionality from a user perspective and use `Given, Then, When` syntaxis for describing each single test step.



