import express from 'express';
import cors from 'cors';
import pool from './db.js';
/*
create an instance of an express application, which lets you do things such as 
set API endpoints for URLs, specifying GET, POST, PUT, DELETE, and also start
the server via app.listen()
*/
const app = express()

//uses cors headers to allow requests between servers
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  console.log('/ hello world')
  return res.status(200).send('Hello World!')
})

app.get('/getTodo', async (req, res) => {
  console.log('/getTodo triggered')

  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({error: "no username given"})
    }

    const todos = await pool.query(`
      SELECT id, task, completed FROM task WHERE username=$1 ORDER BY id ASC;
      `, [username])

    return res.status(200).json(todos.rows)
  } catch (err) {
    return res.status(500).json({error: "server error"})
  }
})

app.post('/addTodo', async (req, res) => {
  console.log('/addTodo triggered')

  try {
    const { username, id, task, completed } = req.body;

    if (!username || !id || !task || completed === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await pool.query(`
      INSERT INTO task (username, id, task, completed) VALUES ($1, $2, $3, $4);
      `, [username, id, task, completed])

      return res.status(201).json({ message: 'Todo added successfully' })
  } catch (err) {
    return res.status(500).json({error: "server error"})
  }
})

app.post('/toggleTodo', async (req, res) => {
  console.log('/toggleTodo triggered')

  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const current_completed = await pool.query(`
      SELECT completed FROM task WHERE id=$1;
      `, [id])

    if (current_completed.rows.length == 0) {
      return res.status(404).json({error: 'id not found'});
    }

    await pool.query(`
      UPDATE task SET completed=$1 WHERE id=$2;
      `, [!current_completed.rows[0].completed, id])

    return res.status(201).json({ message: 'Todo updated successfully' })
  } catch (err) {
    return res.status(500).json({error: "server error"})
  }
})

app.post('/removeTodo', async (req, res) => {
  console.log('/removeTodo triggered')

  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await pool.query(`
      DELETE FROM task WHERE id=$1;
      `, [id])

    return res.status(201).json({ message: 'Todo removed successfully' })
  } catch (err) {
    return res.status(500).json({error: "server error"})
  }
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
const port = process.env.PORT || 3000

app.listen(port, '0.0.0.0', () => {
  console.log(`App listening on port ${port}`)
})

/*
To run -->  node index.js
node is the javascript runtime environment that runs our code in the file 'index.js'
*/