import React from 'react'
import { useSelector } from 'react-redux'

export const NetworkService = ({
  children,
}) => {
  const networkIsConnected = useSelector(state => state.network.isConnected)

  return children({
    networkIsConnected,
  })
}

export const withNetworkService = (Component) => (props) => (
  <NetworkService>
    {(networkServiceProps) => (
      <Component {...networkServiceProps} {...props} />
    )}
  </NetworkService>
)
