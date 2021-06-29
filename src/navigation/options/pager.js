import React, { useContext } from 'react'
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter'
import path from 'ramda/src/path'
import { AuthContext } from 'services/providers/Auth'

const AppViewPagerAdapter = (props) => {
  const { swipeEnabled } = useContext(AuthContext)
  const currentIndex = path(['navigationState', 'index'])(props)
  const nextIndex = path(['navigationState', 'routes', currentIndex, 'state', 'index'])(props)
  const hasNextScreen = !nextIndex || nextIndex === 0

  return <ViewPagerAdapter {...props} swipeEnabled={swipeEnabled && hasNextScreen} />
}

const pager = (props) => <AppViewPagerAdapter {...props} />

export default pager
