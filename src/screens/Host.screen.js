import React, { Component } from 'react'
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'

import socket from '../socket'
import background from '../assets/img/background.png'

export default class Dashboard extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = { input: { time: 10 }, item: {} }

    this.start = this.start.bind(this)
    this.next = this.next.bind(this)
    this.setTimer = this.setTimer.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.sendCorrectAnswer = this.sendCorrectAnswer.bind(this)
  }

  componentDidMount() {
    socket.on('item', data => {
      this.setState({ item: data })
    })
  }

  start() {
    socket.emit('start')
  }

  next() {
    socket.emit('item')
  }

  setTimer() {
    socket.emit('setTimer', this.state.input.time)
  }

  startTimer() {
    socket.emit('startTimer')
  }

  stopTimer() {
    socket.emit('stopTimer')
  }

  sendCorrectAnswer() {
    socket.emit('sendCorrectAnswer')
  }

  render() {
    const { item } = this.state

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.question}>Question: {item.question || 'N/A'}</Text>
          <Text style={styles.question}>Choices: {(item.choices && item.choices.join(', ')) || 'N/A'}</Text>
          <Text style={{ ...styles.question, marginBottom: 80 }}>Answer: {item.answer || 'N/A'}</Text>
          <TouchableOpacity style={styles.answer} onPress={this.start}>
            <Text style={styles.answerText}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.answer} onPress={this.next}>
            <Text style={styles.answerText}>Next</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.timer}
            onChangeText={time => this.setState({ input: { time } })}
            placeholder="Timer (in seconds)"
          >
            10
          </TextInput>
          <TouchableOpacity style={styles.answer} onPress={this.setTimer}>
            <Text style={styles.answerText}>Set Timer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.answer} onPress={this.startTimer}>
            <Text style={styles.answerText}>Start Timer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.answer} onPress={this.stopTimer}>
            <Text style={styles.answerText}>Stop Timer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.answer} onPress={this.sendCorrectAnswer}>
            <Text style={styles.answerText}>Send Correct Answer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 30
  },
  question: {
    alignItems: 'stretch',
    fontSize: 30
  },
  answer: {
    alignItems: 'stretch',
    backgroundColor: '#f00',
    padding: 10,
    alignSelf: 'stretch',
    marginBottom: 10,
    borderRadius: 10
  },
  answerText: {
    alignItems: 'stretch',
    textAlign: 'center',
    color: '#fff',
    fontSize: 22
  },
  timer: {
    alignSelf: 'stretch',
    padding: 10,
    borderColor: '#f00',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 22
  }
})
