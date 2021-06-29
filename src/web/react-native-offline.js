/**
 * Mock 'react-native-offline' for web
 * check webpack.config.js
 */

export const reducer = () => ({ isConnected: true })
export const ReduxNetworkProvider = ({ children }) => children
export const createNetworkMiddleware = () => () => (next) => (action) => next(action)
