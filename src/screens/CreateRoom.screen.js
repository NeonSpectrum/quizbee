import React, { Component } from 'react'
import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Alert,
  AsyncStorage
} from 'react-native'

import styles from '../styles'
import background from '../assets/img/background.png'

import InputField from '../components/InputField.component'
import Button from '../components/Button.component'

import * as $ from '../functions'

export default class CreateRoom extends Component {
  static navigationOptions = {
    title: 'Create a Room'
  }

  constructor(props) {
    super(props)

    this.create = this.create.bind(this)
  }

  async create() {
    const { roomName, roomPassword } = this.state
    const roomAvailable = await $.checkRoomAvailability(roomName)

    if (roomAvailable) {
      Promise.all([$.createRoom(roomName, roomPassword), AsyncStorage.setItem('roomName', roomName)])
      this.props.navigation.push('Game')
    } else {
      Alert.alert(null, 'Room already exists.')
    }
  }

  render() {
    return (
      <ImageBackground source={background} style={styles.background}>
        <KeyboardAvoidingView style={{ ...styles.container, flex: 0 }} behavior="padding" enabled>
          <InputField label="Room Name:" onChangeText={roomName => this.setState({ roomName })} />
          <InputField label="Room Password:" onChangeText={roomPassword => this.setState({ roomPassword })} />
          <Button onPress={this.create}>Create</Button>
        </KeyboardAvoidingView>
      </ImageBackground>
    )
  }
}
