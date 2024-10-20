import { tasks } from '../../todos.js' 
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '../models/todos.js';

export const todoList = async (req, res) => {
  res.json({ todos: await fetchTodos() });
} 

export const createTodo = async (req, res) => {
  const _ = validateFields(['title'], req.body);
  const { title } = req.body;

  if(!title) {
    return res.status(400).json({ msg: "title field is required" })
  }

  if(_.extraFields.length > 0) {
    return res.status(400).json({
      msg: 'Invalids field present: ' + _.extraFields.join(', '),
      allowedFields: _.allowedFields.join(', ')
    })
  }

  await Todo.create({ ...req.body })

  res.json({ msg: "Successful", todos: await fetchTodos() })
}

export const deleteTodo = async (req, res) => {
  const id = req.params.id;
  await Todo.findByIdAndDelete({ _id: id });
  res.json({ msg: 'required data is deleted!' })
  // const taskIndex = tasks.findIndex(task => task.id === id);
  // if(taskIndex === -1) {
  //   return res.status(404).json({ msg: "Task not found" })
  // }
  // tasks.splice(taskIndex, 1);
  // res.json({ msg: 'Task Deleted!', tasks });
}

export const updateTodo = async (req, res) => {
  const id = req.params.id;
  await Todo.findByIdAndUpdate({ _id: id }, { ...req.body })
  res.json({ msg: "required data updated!", todos: await fetchTodos() });
  // const { task, isCompleted } = req.body;
  // const taskIndex = tasks.findIndex(task => task.id === id);
  // if(taskIndex === -1) {
  //   return res.status(404).json({ msg: 'Task not found' })
  // }

  // const existingTask = tasks[taskIndex];
  // tasks[taskIndex] = { 
  //   ...existingTask,
  //   ...(task && { task: task }),
  //   ...(isCompleted !== undefined && { isCompleted })
  //  }
  // res.json({ msg: 'Task Updated!', tasks })
}

async function fetchTodos(){
  return await Todo.find();
}

function validateFields(allowedFields, requestBody){
  const receivedFields = Object.keys(requestBody);
  return {
    allowedFields,
    extraFields: receivedFields.filter(field => !allowedFields.includes(field))
  }
}