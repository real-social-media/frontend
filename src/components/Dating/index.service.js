import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHeader } from 'components/Dating/header';
import * as datingActions from 'store/ducks/dating/actions';
import * as datingSelector from 'store/ducks/dating/selectors';

const DatingService = ({ children }) => {
  const dispatch = useDispatch();
  const items = useSelector(datingSelector.datingSearchItemsSelector);
  const count = useSelector(datingSelector.datingMatchedCounter);

  useEffect(() => {
    dispatch(datingActions.datingSearchRequest());
    dispatch(datingActions.datingMatchedRequest());
  }, []);

  useHeader({ count });

  return children({ items });
};

export default DatingService;
