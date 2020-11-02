jest.mock('react-native-permissions', () => ({
  check: jest.fn(),
  request: jest.fn(),
  PERMISSIONS: { IOS: { CONTACTS: 'CONTACTS' } },
  RESULTS: {
    DENIED: 'DENIED',
    BLOCKED: 'BLOCKED',
    UNAVAILABLE: 'UNAVAILABLE',
    GRANTED: 'GRANTED',
  },
}))
