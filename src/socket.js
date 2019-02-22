import SocketIOClient from 'socket.io-client'
import settings from './settings'

export default SocketIOClient(settings.url)
