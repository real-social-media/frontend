import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as datingActions from 'store/ducks/dating/actions'
import * as datingSelector from 'store/ducks/dating/selectors'

const DatingGridService = ({ children, datingGetRequestOnMount }) => {
  const dispatch = useDispatch()

  const datingGet = useSelector(datingSelector.usersGetProfileSelector())

  useEffect(() => {
    if (!datingGetRequestOnMount) return

    dispatch(datingActions.datingGetRequest())
  }, [])

  return children({
    datingGet
  })
}

export default DatingGridService
