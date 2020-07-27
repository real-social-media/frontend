import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import * as navigationActions from 'navigation/actions';
import * as datingSelector from 'store/ducks/dating/selectors';
import { useHeader } from 'components/DatingMatches/header';

const DatingMatchesService = ({ children }) => {
  const navigation = useNavigation();
  const goBack = navigationActions.navigateDating(navigation);
  const users = useSelector(datingSelector.datingMatchedItemsSelector);

  useHeader({ goBack, navigation });

  return children({ goBack, users });
};

export default DatingMatchesService;
