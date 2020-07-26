import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as datingActions from "store/ducks/dating/actions";
import * as datingSelector from "store/ducks/dating/selectors";

const DatingService = ({ children }) => {
  const dispatch = useDispatch();
  const items = useSelector(datingSelector.datingSearchItemsSelector);

  useEffect(() => {
    dispatch(datingActions.datingSearchRequest());
  }, []);

  return children({ items });
};

export default DatingService;
