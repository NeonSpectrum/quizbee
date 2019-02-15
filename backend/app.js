var express = require('express')
var _ = require('underscore')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var { MongoClient, ObjectID } = require('mongodb')

var db = null
var item = null
var gaveQuestions = []

var scores = {}

server.listen(3000, async () => {
  await connect()
  console.log('Connected at port 3000')
})

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.sendFile(__dirname + 'public/index.html')
})

io.on('connection', async function(socket) {
  socket.on('start', function() {
    console.log('Start')
    io.emit('start')
  })

  socket.on('setTimer', function(time) {
    console.log('Set time to: ' + time)
    io.emit('setTimer', time)
  })

  socket.on('startTimer', function() {
    console.log('Start timer')
    io.emit('startTimer')
  })

  socket.on('stopTimer', function() {
    console.log('Stop timer')
    io.emit('stopTimer')
  })

  socket.on('sendCorrectAnswer', function() {
    console.log('Sent correct answer')
    socket.broadcast.emit('sendCorrectAnswer', item.answer)
  })

  socket.on('item', async function() {
    item = await getItem()
    console.log('Sent item: ' + JSON.stringify(item))
    io.emit('item', item)
  })

  socket.on('join', function(username) {
    scores[username] = 0
  })

  socket.on('sendAnswer', function(data) {
    if (item.answer == data.answer) {
      scores[data.username] += 1
    }
    io.emit('updateScore', scores)
    console.log(scores)
  })
})

function getItem() {
  return new Promise((resolve, reject) => {
    db.collection('items')
      .find({})
      .toArray(function(err, item) {
        console.log(item)
        questions = _.shuffle(item.filter(x => gaveQuestions.indexOf(x._id.toString()) === -1))
        if (questions[0]) gaveQuestions.push(questions[0]._id.toString())
        resolve(questions[0] || false)
      })
  })
}

function connect() {
  return new Promise((resolve, reject) => {
    // Create a new MongoClient
    const client = new MongoClient('mongodb://localhost:27017')

    // Use connect method to connect to the Server
    client.connect(function(err) {
      if (err) reject(err)

      console.log('Connected successfully to server')
      db = client.db('quizbee')
      resolve()
    })
  })
}
