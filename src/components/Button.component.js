import React, { Component } from 'react'
import { TouchableHighlight, Text, StyleSheet, View } from 'react-native'

export default class Button extends Component {
  render() {
    return (
      <TouchableHighlight
        style={{ ...styles.buttonContainer, ...this.props.style }}
        onPress={this.props.onPress}
        underlayColor="#eee"
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>{this.props.children}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 10,
    borderRadius: 10
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#fff',
    alignSelf: 'stretch'
  },
  buttonText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 18,
    padding: 15
  }
})
