jest.mock('node-forge', () => ({
  pki: {
    publicKeyFromPem: jest.fn().mockReturnValue({ encrypt: jest.fn() }),
  },
  util: {
    encodeUtf8: jest.fn().mockReturnValue('encodedPassword'),
    encode64: jest.fn().mockReturnValue('encryptedPassword'),
  },
}))
