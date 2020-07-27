import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as navigationActions from 'navigation/actions';
import { pageHeaderLeft } from 'navigation/options';

export const useHeader = () => {
  const navigation = useNavigation();

  /**
   *
   */
  const goBack = navigationActions.navigateDating(navigation);
  const headerLeft = (props) => pageHeaderLeft({ ...props, onPress: goBack });

  /**
   *
   */
  useEffect(() => {
    navigation.setOptions({ headerLeft });
  }, []);
};
