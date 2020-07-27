import { useEffect } from 'react';
import { pageHeaderLeft } from 'navigation/options';

export const useHeader = ({ goBack, navigation }) => {
  const headerLeft = (props) => pageHeaderLeft({ ...props, onPress: goBack });

  /**
   *
   */
  useEffect(() => {
    navigation.setOptions({ headerLeft });
  }, []);
};
