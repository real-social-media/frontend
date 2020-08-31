import React from 'react'
import Config from 'react-native-config'

if (Config.ENVIRONMENT === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React, {
    trackAllPureComponents: false,
    trackHooks: false,
    // include: [/^Image/],
  })
}
