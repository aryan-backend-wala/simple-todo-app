import express from 'express'
import {
  todoList,
  createTodo,
  deleteTodo,
  updateTodo
} from '../controllers/todosController.js'
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/todos', todoList )

router.post('/todo/create', createTodo)

router.patch('/todo/update/:id', updateTodo)

router.delete('/todo/delete/:id', deleteTodo)

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if(username === 'admin' && password === '1234') {
    const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1hr' });
    res.json({ token })
  } else {
    res.status(401).json({ msg: "Invalid credentials" })
  }
})

export default router
