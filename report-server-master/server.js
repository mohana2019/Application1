const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const pdf = require('html-pdf')
const mongoose = require('mongoose')
const todoRoutes = express.Router()
const PORT = 4000
let Todo = require('./todo.model')
app.use(cors())
app.use(bodyParser.json())
const pdfTemplate = require('./index')
mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true })
const connection = mongoose.connection
connection.once('open', function() {
  console.log('MongoDB database connection established successfully')
})
todoRoutes.route('/').get(function(req, res) {
  Todo.find(function(err, todos) {
    if (err) {
      console.log(err)
    } else {
      res.json(todos)
    }
  })
})
todoRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id
  Todo.findById(id, function(err, todo) {
    res.json(todo)
  })
})
todoRoutes.route('/update/:id').post(function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    if (!todo) res.status(404).send('data is not found')
    else todo.todo_description = req.body.todo_description
    todo.todo_responsible = req.body.todo_responsible
    todo.todo_priority = req.body.todo_priority
    todo.todo_completed = req.body.todo_completed
    todo
      .save()
      .then(todo => {
        res.json('Todo updated!')
      })
      .catch(err => {
        res.status(400).send('Update not possible')
      })
  })
})
todoRoutes.route('/add').post(function(req, res) {
  let todo = new Todo(req.body)
  todo
    .save()
    .then(todo => {
      res.status(200).json({ todo: 'todo added successfully' })
    })
    .catch(err => {
      res.status(400).send('adding new todo failed')
    })
})
todoRoutes.route('/create-pdf').post(function(req, res) {
  console.log(req.body.todo_description)
  pdf.create(pdfTemplate(req.body), {}).toFile('rezultati.pdf', err => {
    if (err) {
      return console.log('error')
    }
    var options = {
      root: __dirname
    }
    res.sendFile(`rezultati.pdf`, options, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('Sent:')
      }
    })
  })
})
/*todoRoutes.route('/fetch-pdf').get(function(req, res) {
  console.log('Fetch pdf')
  res.sendFile(`${__dirname}/rezultati.pdf`, options, function(err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', rezultati)
    }
  })
})*/

app.use('/todos', todoRoutes)
app.listen(PORT, function() {
  console.log('Server is running on Port: ' + PORT)
})
