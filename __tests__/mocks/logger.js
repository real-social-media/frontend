jest.mock('services/Logger', () => ({
  captureException: jest.fn(),
  setUser: jest.fn()
}))
