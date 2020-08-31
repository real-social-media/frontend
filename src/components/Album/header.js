import React, { useEffect, useCallback } from 'react'
import path from 'ramda/src/path'
import HeaderRight from 'navigation/HeaderRight'

import { useNavigation } from '@react-navigation/native'

export const useHeader = ({ user, album, onPress, title }) => {
  const navigation = useNavigation()

  /**
   *
   */
  const headerRight = useCallback(() => <HeaderRight onPress={onPress} title={title} />, [])

  /**
   *
   */
  useEffect(() => {
    navigation.setOptions({
      title: path(['name'])(album),
    })
  }, [path(['name'])(album)])

  /**
   *
   */
  useEffect(() => {
    if (path(['ownedBy', 'userId'])(album) === user.userId) {
      navigation.setOptions({
        headerRight,
      })
    } else {
      navigation.setOptions({
        headerRight: () => null,
      })
    }
  }, [path(['ownedBy', 'userId'])(album)])
}
