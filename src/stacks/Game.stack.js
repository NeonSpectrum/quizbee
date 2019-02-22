import React, { Component } from 'react'
import { View, ScrollView, AsyncStorage, Alert, BackHandler } from 'react-native'
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
  DrawerItems,
  NavigationActions
} from 'react-navigation'
import Icon from 'react-native-vector-icons/Octicons'

import GameScreen from '../screens/Game.screen'

const logout = cb => {
  Alert.alert('Leave', 'Are you sure do you want to leave?', [
    {
      text: 'OK',
      onPress: cb
    },
    {
      text: 'Cancel',
      style: 'cancel'
    }
  ])
}

const createScreen = screen =>
  createAppContainer(
    createStackNavigator({
      [screen]: {
        screen,
        navigationOptions: ({ navigation }) => ({
          headerLeft: (
            <Icon
              name="three-bars"
              size={30}
              color="black"
              style={{ paddingHorizontal: 20 }}
              onPress={() => navigation.openDrawer()}
            />
          )
        })
      }
    })
  )

const CustomDrawerContentComponent = props => {
  return (
    <View>
      <ScrollView>
        <DrawerItems
          {...props}
          onItemPress={({ route, focused }) => {
            if (route.key === 'Leave Room') {
              logout(async () => {
                await AsyncStorage.removeItem('roomName')
                props.navigation.navigate('Login')
              })
            } else {
              props.onItemPress({ route, focused })
            }
          }}
        />
      </ScrollView>
    </View>
  )
}

const GameNavigation = createAppContainer(
  createDrawerNavigator(
    {
      Game: { screen: createScreen(GameScreen) },
      'Leave Room': { screen: () => <View /> }
    },
    {
      contentComponent: CustomDrawerContentComponent
    }
  )
)

export default class GameStack extends Component {
  static router = GameNavigation.router

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      logout(async () => {
        await AsyncStorage.removeItem('roomName')
        this.props.navigation.navigate('Login')
        return false
      })

      return true
    })
  }

  render() {
    return <GameNavigation navigation={this.props.navigation} />
  }
}
