jest.mock('services/Logger', () => ({
  captureException: jest.fn(),
  captureMessage: jest.fn(),
  setUser: jest.fn(),
  withScope: jest.fn(),
  clearScope: jest.fn(),
}))
