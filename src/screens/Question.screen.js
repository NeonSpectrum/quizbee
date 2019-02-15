import React, { Component } from 'react'
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native'
import moment from 'moment'

import socket from '../socket'
import background from '../assets/img/background.png'

export default class Dashboard extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = { timer: null, item: {}, buttonsEnabled: false, score: 0 }

    this.timer = null

    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
  }

  componentDidMount() {
    this.username = this.props.navigation.state.params.username

    socket.emit('join', this.username)

    socket.on('start', () => {
      Alert.alert(null, 'Game Started!')
    })

    socket.on('item', data => {
      this.setState({ item: data, buttonsEnabled: false, selectedAnswer: null })
    })

    socket.on('setTimer', timer => {
      this.setState({ timer })
    })

    socket.on('startTimer', () => {
      this.startTimer()
    })

    socket.on('stopTimer', () => {
      this.stopTimer()
    })

    socket.on('sendCorrectAnswer', answer => {
      Alert.alert(null, 'The correct answer is ' + answer)
      socket.emit('sendAnswer', { username: this.username, answer: this.state.selectedAnswer })
    })

    socket.on('updateScore', scores => {
      this.setState({ score: scores[this.username] })
    })
  }

  startTimer() {
    if (this.timer) return
    this.timer = setInterval(() => {
      this.setState(prevState => {
        return { timer: prevState.timer - 1 }
      })
      if ((buttonsEnabled = this.state.timer <= 0)) this.stopTimer()
      this.setState({ buttonsEnabled: !buttonsEnabled })
    }, 1000)
  }

  stopTimer() {
    clearInterval(this.timer)
    this.timer = null
  }

  chooseAnswer(answer) {
    this.setState({ selectedAnswer: answer })
  }

  render() {
    const { item, timer, selectedAnswer, buttonsEnabled, score } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.timer}>{moment.utc(timer * 1000).format('mm:ss')}</Text>
        <Text style={styles.score}>Score: {score}</Text>
        <Text style={styles.question}>{item.question || ''}</Text>
        {(item.choices || []).map((choice, key) => (
          <TouchableOpacity
            key={key}
            disabled={!buttonsEnabled}
            style={selectedAnswer == choice ? { ...styles.answer, ...styles.selected } : styles.answer}
            onPress={() => this.chooseAnswer(choice)}
          >
            <Text style={styles.answerText}>{choice}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
    fontSize: 30,
    marginBottom: 80
  },
  answer: {
    alignItems: 'stretch',
    backgroundColor: '#f00',
    padding: 10,
    alignSelf: 'stretch',
    marginBottom: 10,
    borderRadius: 10,
    borderColor: '#f00',
    borderWidth: 3
  },
  answerText: {
    alignItems: 'stretch',
    textAlign: 'center',
    color: '#fff',
    fontSize: 22
  },
  timer: {
    position: 'absolute',
    top: 20,
    left: 5,
    alignItems: 'stretch',
    textAlign: 'center',
    fontSize: 22
  },
  score: {
    position: 'absolute',
    top: 20,
    right: 5,
    alignItems: 'stretch',
    fontSize: 22
  },
  selected: {
    borderColor: '#000',
    borderWidth: 3
  }
})
