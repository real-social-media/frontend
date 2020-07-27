import { useNavigation } from '@react-navigation/native';
import * as navigationActions from 'navigation/actions';
import { useHeader } from 'components/DatingMatches/header';

const DatingMatchesService = ({ children }) => {
  const navigation = useNavigation();
  const goBack = navigationActions.navigateDating(navigation);
  const users = [
    {
      name: 'Name 1',
      age: 30,
      matchedDate: '2017-06-06T09:27:25.706Z',
      photo: 'https://randomuser.me/api/portraits/thumb/men/38.jpg',
    },
    {
      name: 'Name 2',
      age: 22,
      matchedDate: '2017-05-06T09:27:25.706Z',
      photo: 'https://randomuser.me/api/portraits/thumb/men/3.jpg',
    },
  ];

  useHeader({ goBack, navigation });

  return children({ goBack, users });
};

export default DatingMatchesService;
