import axios from './axios'
import { Alert } from 'react-native'

export const checkRoomAvailability = async name => {
  try {
    const { data } = await axios.get('checkroomavailability', { params: { name } })
    return data.available
  } catch (err) {
    Alert.alert(null, JSON.stringify(err))
  }
}

export const getRoomList = async () => {
  try {
    const { data } = await axios.get('rooms')
    return Object.keys(data.servers)
  } catch (err) {
    Alert.alert(null, JSON.stringify(err))
  }
}

export const createRoom = async (name, password) => {
  try {
    const { data } = await axios.put('room', { name, password })
    return data.success
  } catch (err) {
    Alert.alert(null, JSON.stringify(err))
  }
}

export const verifyRoom = async (name, password) => {
  try {
    const { data } = await axios.post('room', { name, password })
    return data.success
  } catch (err) {
    Alert.alert(null, JSON.stringify(err))
  }
}
