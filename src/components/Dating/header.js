import React, { useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as navigationActions from 'navigation/actions';
import HeaderLeft from 'components/Dating/HeaderLeft';

export const useHeader = ({ count }) => {
  const navigation = useNavigation();

  /**
   *
   */
  const headerLeft = useCallback(
    () => <HeaderLeft onPress={navigationActions.navigateDatingMatches(navigation)} count={count} />,
    [count],
  );

  /**
   *
   */
  useEffect(() => {
    navigation.setOptions({
      headerLeft,
    });
  }, []);
};
