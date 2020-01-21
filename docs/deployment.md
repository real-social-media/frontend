# Deployment

## OTA Updates
For production build
```
code-push release-react REAL ios -m --description "build description" -d Production
```

For beta build
```
code-push release-react REAL ios -m --description "build description" -d Production
```

To see available options
```
code-push deployment ls REAL -k
```

## Appstore Release
For production build
```
fastlane beta --env production
```

For staging build
```
fastlane beta --env staging
```

For development build
```
fastlane beta --env development
```