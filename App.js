import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import LoginScreen from './src/screens/Login.screen'
import DashboardScreen from './src/screens/Dashboard.screen'

const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Dashboard: { screen: DashboardScreen }
})

export default createAppContainer(MainNavigator)
