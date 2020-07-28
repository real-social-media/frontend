import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import * as datingActions from 'store/ducks/dating/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as datingSelector from 'store/ducks/dating/selectors'


const DatingService = ({ children }) => {
  const dispatch = useDispatch();
  const { userId } = useSelector(authSelector.authUserSelector)
  const datingGet = useSelector(datingSelector.datingGetSelector(userId))

  useFocusEffect(
    useCallback(() => {
        dispatch(datingActions.datingGetRequest({ userId }));
    }, [])
  );

  return children({
    datingGet,
  });
}

export default DatingService;
