import React, { Component } from 'react'
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native'

import socket from '../socket'
import background from '../assets/img/background.png'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = { question: null, answers: [], correctAnswer: null }

    this.execute = this.execute.bind(this)
  }

  componentDidMount() {
    socket.on('givequestion', ({ question, answers, correctAnswer }) => {
      this.setState({ question, answers, correctAnswer })
    })
  }

  execute(item) {
    const { correctAnswer } = this.state
    Alert.alert(item == correctAnswer ? 'Correct' : 'Incorrect!')
  }

  render() {
    const { question, answers } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.question}>{question}</Text>
        {answers.map((item, key) => (
          <TouchableOpacity key={key} style={styles.answer} onPress={() => this.execute(item)} value={item}>
            <Text style={styles.answerText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    margin: 30
  },
  question: {
    fontSize: 30,
    marginBottom: 80
  },
  answer: {
    backgroundColor: '#f00',
    padding: 10,
    alignSelf: 'stretch',
    marginBottom: 10,
    borderRadius: 10
  },
  answerText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 22
  }
})
