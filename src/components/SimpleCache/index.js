import React from 'react'
import { Image } from 'react-native'
import SimpleCacheService from './index.service'

const SimpleCache = ({
  source,
  style,
  resizeMode,
  cacheOnly,
  children,
  ...props
}) => {
  return (
    <Image
      source={source}
      style={style}
      resizeMode={resizeMode}
      cacheOnly={cacheOnly}
      {...props}
    />
  )
}

export default (props) => (
  <SimpleCacheService {...props}>
    {(service) => (
      <SimpleCache {...props} {...service} />
    )}
  </SimpleCacheService>
)