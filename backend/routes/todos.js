import express from 'express'
import {
  todoList,
  createTodo,
  deleteTodo,
  updateTodo
} from '../controllers/todosController.js'

const router = express.Router();

router.get('/todos', todoList )

router.post('/todo/create', createTodo)

router.patch('/todo/update/:id', updateTodo)

router.delete('/todo/delete/:id', deleteTodo)

export default router
