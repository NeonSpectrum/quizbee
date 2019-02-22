import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableHighlight,
  Alert,
  FlatList,
  AsyncStorage,
  ActivityIndicator
} from 'react-native'
import { ConfirmDialog, ProgressDialog } from 'react-native-simple-dialogs'

import axios from '../axios'
import socket from '../socket'
import background from '../assets/img/background.png'
import styles from '../styles'

import * as $ from '../functions'

import Button from '../components/Button.component'

export default class Login extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)

    this.state = {
      join: false,
      roomLoading: false,
      roomList: [],
      passwordDialogVisible: false,
      progressVisible: false
    }

    this.join = this.join.bind(this)
    this.create = this.create.bind(this)
    this.cancel = this.cancel.bind(this)
    this.confirmPassword = this.confirmPassword.bind(this)
    this.joinRoom = this.joinRoom.bind(this)
  }

  componentWillUnmount() {
    this.setState({ passwordDialogVisible: false, progressVisible: false })
  }

  async join() {
    this.setState({ join: true, roomLoading: true })
    const roomList = await $.getRoomList()
    this.setState({ roomList, roomLoading: false })
  }

  create() {
    this.props.navigation.push('CreateRoom')
  }

  cancel() {
    this.setState({ join: false })
  }

  async confirmPassword() {
    this.setState({ progressVisible: true, passwordDialogVisible: false })
    const verify = await $.verifyRoom(this.state.roomName, this.state.roomPassword)
    if (verify) {
      await AsyncStorage.setItem('roomName', this.state.roomName)
      this.setState({ progressVisible: false, passwordDialogVisible: false })
      this.props.navigation.push('Game')
    } else {
      this.setState({ progressVisible: false })
      Alert.alert(null, 'Invalid Password.', [
        {
          text: 'OK',
          onPress: () => this.setState({ passwordDialogVisible: true })
        }
      ])
    }
  }

  async joinRoom(roomName) {
    this.setState({ roomName, passwordDialogVisible: true })
  }

  render() {
    const { roomList, roomLoading } = this.state

    return (
      <ImageBackground source={background} style={styles.background}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Text style={styles.header}>Quiz Bee{'\n'}System</Text>
          {!this.state.join ? (
            <View>
              <Button onPress={this.join}>JOIN A ROOM</Button>
              <Button onPress={this.create}>CREATE A ROOM</Button>
            </View>
          ) : roomLoading ? (
            <ActivityIndicator size={60} color="#fff" />
          ) : (
            <View>
              {roomList.length == 0 ? (
                <Text style={{ ...styles.label, textAlign: 'center', marginBottom: 30 }}>No rooms available.</Text>
              ) : (
                <FlatList
                  data={roomList}
                  renderItem={({ item }) => (
                    <Button style={styles.item} onPress={() => this.joinRoom(item)}>
                      {item}
                    </Button>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              )}
              <Button onPress={this.cancel}>Cancel</Button>
            </View>
          )}
          <ConfirmDialog
            title="Enter room password:"
            visible={this.state.passwordDialogVisible}
            positiveButton={{
              title: 'CONFIRM',
              onPress: this.confirmPassword
            }}
            negativeButton={{
              title: 'CANCEL',
              onPress: () => this.setState({ passwordDialogVisible: false })
            }}
          >
            <TextInput
              autoFocus={true}
              onChangeText={roomPassword => this.setState({ roomPassword })}
              secureTextEntry
            />
          </ConfirmDialog>
          <ProgressDialog visible={this.state.progressVisible} message="Verifying..." />
        </KeyboardAvoidingView>
      </ImageBackground>
    )
  }
}
