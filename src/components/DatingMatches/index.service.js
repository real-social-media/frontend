import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import * as navigationActions from 'navigation/actions';
import * as datingActions from 'store/ducks/dating/actions';
import * as datingSelector from 'store/ducks/dating/selectors';
import { useHeader } from 'components/DatingMatches/header';

const DatingMatchesService = ({ children }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const goBack = navigationActions.navigateDating(navigation);
  const users = useSelector(datingSelector.datingMatchedItemsSelector);

  const datingMatchedRemove = (payload) => dispatch(datingActions.datingMatchedRemove(payload));

  useHeader({ goBack, navigation });

  return children({ goBack, users, datingMatchedRemove });
};

export default DatingMatchesService;
