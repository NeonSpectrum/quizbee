import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'

import socket from '../socket'
import background from '../assets/img/background.png'

export default class Login extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)

    this.state = { username: null }

    this.login = this.login.bind(this)
    this.loginAsHost = this.loginAsHost.bind(this)
  }

  login() {
    const { username } = this.state
    if (!username) {
      Alert.alert(null, 'Enter username.')
    } else {
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'Question',
              params: { username }
            })
          ]
        })
      )
    }
  }

  loginAsHost() {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Host' })]
      })
    )
  }

  render() {
    return (
      <ImageBackground source={background} style={styles.background}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Text style={styles.header}>Quiz Bee{'\n'}System</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={username => this.setState({ username })}
          />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry />
          <TouchableOpacity style={styles.button} onPress={this.login}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.loginAsHost}>
            <Text style={styles.buttonText}>Login as Host</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%'
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    margin: 30
  },
  input: {
    alignSelf: 'stretch',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18
  },
  header: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 150,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 15,
    alignSelf: 'stretch',
    marginTop: 30
  },
  buttonText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 18
  }
})
