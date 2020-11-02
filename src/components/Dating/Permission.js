import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import * as authSelector from 'store/ducks/auth/selectors'
import DatingSettings from 'components/Dating/Settings'

function withDatingEnabledValidation(WrappedComponent) {
  return (props) => {
    const user = useSelector(authSelector.authUserSelector)
    const hasPermission = useMemo(() => user.datingStatus === 'ENABLED', [user.datingStatus])

    return hasPermission ? <WrappedComponent {...props} /> : <DatingSettings />
  }
}

export default withDatingEnabledValidation
