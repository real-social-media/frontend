jest.mock('services/Logger', () => ({
  captureException: jest.fn(),
}))
