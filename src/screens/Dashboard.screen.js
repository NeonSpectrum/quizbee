import React, { Component } from 'react'
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native'

import socket from '../socket'
import background from '../assets/img/background.png'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: null,
      answers: [],
      correctAnswer: null,
      index: 0,
      disabledPrev: true,
      disabledNext: false,
      questions: null
    }
    this.execute = this.execute.bind(this)
    // this.previous = this.previous.bind(this)
    // this.next = this.next.bind(this)
  }

  componentDidMount() {
    socket.on('givequestion', ({ question, answers, correctAnswer }) => {
      this.setState({ question, answers, correctAnswer })
    })

    socket.on('question', ({ data }) => {
      this.setState({ questions: data })
      const { questions } = this.state
      Alert.alert(JSON.stringify(questions))
    })

    //new
  }

  execute(item) {
    const { correctAnswer } = this.state
    Alert.alert(item == correctAnswer ? 'Correct' : 'Incorrect!')
    if (item == correctAnswer) {
      const { index } = this.state
      const { question } = this.state
      const { questions } = this.state
      // Alert.alert(questions)
      this.setState({
        index: this.state.index + 1
      })
      // socket.emit('index', {questions[index]._id})
    }
  }
  // previous() {
  //   this.setState({
  //     index: this.state.index - 1
  //   })
  //   const { index } = this.state
  // }
  // next() {
  //   this.setState({
  //     index: this.state.index + 1
  //   })
  //   const { index } = this.state
  //   const { questions } = this.state
  //   this.setState({
  //     disabledPrev: false
  //   })
  //   socket.emit('index', {questions[index]._id})
  // }

  // <View style={styles.navigation}>
  //         <TouchableOpacity style={{ flex: 0.5 }} onPress={() => this.previous()} disabled={this.state.disabledPrev}>
  //           <Text style={styles.answerText}>Previous</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={{ flex: 0.5 }} onPress={() => this.next()} disabled={this.state.disabledNext}>
  //           <Text style={styles.answerText}>Next</Text>
  //         </TouchableOpacity>
  //       </View>

  render() {
    const { question, answers, index } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.question}>{index}</Text>
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
    borderRadius: 10
  },
  answerText: {
    alignItems: 'stretch',
    textAlign: 'center',
    color: '#fff',
    fontSize: 22
  },
  navigation: {
    flexDirection: 'row',
    backgroundColor: 'gray',
    padding: 10,
    marginBottom: 10,
    padding: 20,
    borderRadius: 10
  }
})
