import express from 'express'
import {
  todoList,
  createTodo,
  deleteTodo,
  updateTodo
} from '../controllers/todosController.js'

const router = express.Router();

router.get('/tasks', todoList )

router.post('/task', createTodo)

router.delete('/task/:id', deleteTodo)

router.put('/task/:id', updateTodo)

export default router
