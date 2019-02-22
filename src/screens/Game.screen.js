import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from 'react-native'
import axios from 'axios'

import socket from '../socket'
import styles from '../styles'

import Button from '../components/Button.component'

export default class Game extends Component {
  constructor(props) {
    super(props)

    this.state = { roomName: '' }
  }

  async componentDidMount() {
    const roomName = await AsyncStorage.getItem('roomName')

    socket.emit('join', roomName)
    this.setState({ roomName })
  }

  componentWillUnmount() {
    socket.emit('leave', this.state.roomName)
  }

  render() {
    const { roomName } = this.state

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.header}>Welcome to {roomName}</Text>
      </KeyboardAvoidingView>
    )
  }
}
