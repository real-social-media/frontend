jest.mock('react-native-offline', () => ({
  checkInternetConnection: jest.fn(),
  reducer: jest.fn().mockReturnValue({
    isConnected: true,
    actionQueue: [],
    isQueuePaused: false,
  }),
}))
