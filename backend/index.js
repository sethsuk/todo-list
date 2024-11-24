import express from 'express';
import cors from 'cors';
/*
create an instance of an express application, which lets you do things such as 
set API endpoints for URLs, specifying GET, POST, PUT, DELETE, and also start
the server via app.listen()
*/
const app = express()

//uses cors headers to allow requests between servers
app.use(cors())
app.use(express.json())

let todos = []

app.get('/', (req, res) => {
  console.log('/ hello world')
  return res.status(200).send('Hello World!')
})

app.get('/getTodo', (req, res) => {
  console.log('/getTodo triggered')
  return res.status(200).json(todos)
})

app.post('/addTodo', (req, res) => {
  console.log('/addTodo triggered')

  console.log(`req: ${req.body}`)

  todos.push(req.body)

  return res.status(201).json({ message: 'Todo added successfully' })
})

app.post('/toggleTodo', (req, res) => {
  console.log('/toggleTodo triggered')
  const id = req.body["id"]

  todos = todos.map((item) => {
    if (item.id == id) {
      return item.completed = {...item, "completed": !item.completed}
    } else {
      return item
    }
  })

  return res.status(201).json({ message: 'Todo toggled successfully' })
})

app.post('/removeTodo', (req, res) => {
  console.log('/removeTodo triggered')
  const id = req.body["id"]

  todos = todos.filter((item) => item.id !== id)

  return res.status(201).json({ message: 'Todo removed successfully'})
})

/*
app.listen() uses 3 arguments here.

1st argument: port --> tell the application which port on the host server to listen on for requests/messages
2nd argument: host --> tells the application what URL/website is hosting the server. We could put something like
'google.com' there, but we're putting 'localhost' because that's the internal server that the computer itself hosts,
which is used very often to play around with your software before you deploy it to the cloud.
3rd argument: function --> in the example, this function takes in no arguments, it just logs a message to the terminal
to let us know that our server is running. It can do other things as well. 
*/
const port = 5000
const host = 'localhost'
app.listen(port, host, () => {
  console.log(`App listening on port ${port}`)
})

/*
To run -->  node index.js
node is the javascript runtime environment that runs our code in the file 'index.js'
*/