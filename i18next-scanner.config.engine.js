module.exports = {
  input: [
    'src/components/**/*.{js}',
    'src/screens/**/*.{js}',
    'src/templates/**/*.{js}',
    // Use ! to filter out files or directories
    '!**/node_modules/**',
  ],
  options: {
    debug: true,
    // read strings from functions: IllegalMoveError('KEY') or t('KEY')
    func: {
      list: ['t', 'i18next.t', 'i18n.t'],
      extensions: ['.js'],
    },

    trans: false,

    // Create and update files `en.json`, `fr.json`, `es.json`
    lngs: ['en', 'de'],

    ns: [
      // The namespace I use
      'translation',
    ],

    defaultLng: 'en',
    defaultNs: 'translation',

    // Put a blank string as initial translation
    // (useful for Weblate be marked as 'not yet translated', see later)
    defaultValue: (lng, ns, key) => key,

    // Location of translation files
    resource: {
      loadPath: 'translations/locales/{{lng}}/{{ns}}.json',
      savePath: 'translations/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
    },

    nsSeparator: ':',
    keySeparator: '.',
  },
}