jest.mock('react-native-device-info', () => ({
  getReadableVersion: jest.fn(),
  getDeviceId: jest.fn(),
  getSystemName: jest.fn(),
  getSystemVersion: jest.fn(),
}))
