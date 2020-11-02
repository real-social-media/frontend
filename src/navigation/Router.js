import React, { useState } from 'react'
import AuthNavigator from 'navigation/AuthNavigator'
import AppNavigator from 'navigation/AppNavigator'
import * as navigationOptions from 'navigation/options'
import { createStackNavigator } from '@react-navigation/stack'
import LoadingComponent from 'components/Loading'
import NetworkComponent from 'components/Network'
import PinchZoomComponent from 'components/Feed/PinchZoom'
import FeedContextComponent from 'components/Feed/Context'

const Stack = createStackNavigator()

const Router = () => {  
  const [draggedImage, setDraggedImage] = useState({})

  return (
    <FeedContextComponent.Provider value={{ draggedImage, setDraggedImage }}>
      <PinchZoomComponent />
      <NetworkComponent />
      <Stack.Navigator>
        <Stack.Screen
          name="Loading"
          component={LoadingComponent}
          {...navigationOptions.stackScreenModalStaticProps}
        />
        <Stack.Screen
          name="App"
          component={AppNavigator}
          {...navigationOptions.stackScreenModalStaticProps}
        />
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          {...navigationOptions.stackScreenModalStaticProps}
        />
      </Stack.Navigator>
    </FeedContextComponent.Provider>
  )
}

export default Router
