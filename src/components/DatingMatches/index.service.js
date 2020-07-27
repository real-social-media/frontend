import { useNavigation } from '@react-navigation/native';
import * as navigationActions from 'navigation/actions';
import { useHeader } from 'components/DatingMatches/header';

const DatingMatchesService = ({ children }) => {
  const navigation = useNavigation();
  const goBack = navigationActions.navigateDating(navigation);

  useHeader({ goBack, navigation });

  return children({ goBack });
};

export default DatingMatchesService;
