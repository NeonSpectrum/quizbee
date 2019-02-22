import React, { Component } from 'react'
import { YellowBox, Platform } from 'react-native'
import { createStackNavigator, createAppContainer, SafeAreaView } from 'react-navigation'
import { MessageBarManager, MessageBar } from 'react-native-message-bar'
import Icon from 'react-native-vector-icons/Octicons'

import LoginScreen from './src/screens/Login.screen'
import CreateRoomScreen from './src/screens/CreateRoom.screen'
import GameStack from './src/stacks/Game.stack'

import socket from './src/socket'

if (Platform.OS === 'android') {
  SafeAreaView.setStatusBarHeight(0)
}

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])

const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  CreateRoom: { screen: CreateRoomScreen },
  Game: {
    screen: GameStack,
    navigationOptions: { header: null }
  }
})

const AppContainer = createAppContainer(MainNavigator)

export default class App extends Component {
  messageBarAlert(params = {}) {
    MessageBarManager.showAlert({
      shouldHideOnTap: false,
      messageStyle: { color: 'white', fontSize: 12, textAlign: 'center' },
      ...params
    })
  }

  componentDidMount() {
    MessageBarManager.registerMessageBar(this.refs.alert)

    this.messageBarAlert({
      message: 'Connecting...'
    })

    socket.on('connect_error', () => {
      this.messageBarAlert({
        message: 'Connection Error.',
        alertType: 'error'
      })
    })

    socket.on('reconnecting', () => {
      this.messageBarAlert({
        message: 'Retrying...'
      })
    })

    socket.on('reconnect', () => {
      this.messageBarAlert({
        message: 'Reconnected.',
        alertType: 'success'
      })
    })

    socket.on('connect', () => {
      this.messageBarAlert({
        message: 'Connected.',
        alertType: 'success'
      })
    })

    socket.on('disconnect', () => {
      this.messageBarAlert({
        message: 'Disconnected.',
        alertType: 'error'
      })
    })
  }

  render() {
    return [<AppContainer key="1" />, <MessageBar ref="alert" key="2" />]
  }
}
