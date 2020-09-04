import { useEffect, useState } from 'react'
import qs from 'query-string'
import dayjs from 'dayjs'
import path from 'ramda/src/path'

function useS3ExpiryState({
  onExpiry,
  urlToBeValidated,
  condition,
}) {
  const hasValidExpiryDate = (s3Url) => {
    const parsed = qs.parse(s3Url)
    const expires = path(['Expires'])(parsed)
    return dayjs().isBefore(dayjs.unix(expires))
  }

  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    setIsValid(hasValidExpiryDate(urlToBeValidated))
    return () => {}
  }, [urlToBeValidated])

  if (!isValid && condition) {
    onExpiry(isValid)
  }

  return isValid
}

export default useS3ExpiryState