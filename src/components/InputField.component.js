import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

export default class InputField extends Component {
  render() {
    return (
      <View>
        <Text style={styles.label}>{this.props.label}</Text>
        <TextInput style={styles.input} onChangeText={this.props.onChangeText} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#fff'
  },
  input: {
    alignSelf: 'stretch',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18
  }
})
