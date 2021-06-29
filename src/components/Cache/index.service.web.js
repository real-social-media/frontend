const CacheService = ({ children, images, resizeMode, style, hideProgress, hideLabel }) => {
  const uri = images[0][0]

  /**
   * Error handler
   */
  const handleError = () => {}

  return children({
    uri,
    resizeMode,
    style,
    handleError,
    hideProgress,
    hideLabel,
  })
}

export default CacheService
