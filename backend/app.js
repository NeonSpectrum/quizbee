var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var { MongoClient, ObjectID } = require('mongodb')
var db = null

server.listen(3000)
// WARNING: app.listen(80) will NOT work here!
app.use(express.static(__dirname + '/public'))
app.get('/', function(req, res) {
  res.sendFile(__dirname + 'public/index.html')
})

io.on('connection', async function(socket) {
  await connect()
  db.collection('questionsystem')
    .find({})
    .toArray((err, data) => {
      console.log(data)
      io.emit('question', data)
    })

  socket.on('index', function(data) {
    db.collection('questionsystem')
      .find({
        _id: ObjectID(data)
      })
      .limit(1)
      .toArray((err, data) => {
        // console.log(data)
        io.emit('givequestion', data[0])
      })
  })
  // socket.emit('news', { hello: 'world' })
  // socket.on('my other event', function(data) {
  //   console.log(data)
  // })
  socket.on('broadcast', function(text) {
    io.emit('output', text)
  })
})

function connect() {
  return new Promise((resolve, reject) => {
    // Create a new MongoClient
    const client = new MongoClient('mongodb://localhost:27017')

    // Use connect method to connect to the Server
    client.connect(function(err) {
      if (err) reject(err)

      console.log('Connected successfully to server')
      db = client.db('questionsystem')
      resolve()
    })
  })
}
