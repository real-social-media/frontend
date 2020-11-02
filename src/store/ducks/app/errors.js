import * as constants from 'store/ducks/app/constants'

const messageCodes = {
  /**
   * 
   */
  [constants.APP_READY_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'App assets were fetched',
    },
  },
  [constants.APP_READY_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to fetch app assets',
    },
  },

  /**
   * 
   */
  [constants.APP_THEME_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'App theme is fetched',
    },
  },
  [constants.APP_THEME_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to fetch app theme',
    },
  },

  /**
   * 
   */
  [constants.APP_THEME_PREVIEW_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'App theme preview is loaded',
    },
  },
  [constants.APP_THEME_PREVIEW_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to load app theme preview',
    },
  },

  /**
   * 
   */
  [constants.APP_TRANSLATION_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'App translation is fetched',
    },
  },
  [constants.APP_TRANSLATION_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to fetch app translation',
    },
  },
}

export const getMessagePayload = (key, status = 'GENERIC', nativeError = '') => {
  return ({
    ...messageCodes[key][status],
    nativeError,
  })
}