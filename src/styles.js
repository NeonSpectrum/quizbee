import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  background: {
    height: '100%',
    width: '100%'
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 30
  },
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
