import { tasks } from '../../todos.js' 
import { v4 as uuidv4 } from 'uuid';

export const todoList = (req, res) => {
  res.json({ tasks });
} 

export const createTodo = (req, res) => {
  const { task, isCompleted } = req.body;
  if(!task) {
    return res.status(400).json({ message: "Task not included" });
  }
  tasks.push({ id: uuidv4(), task, isCompleted });
  res.json({ message: 'Task Added!', tasks })
}

export const deleteTodo = (req, res) => {
  const id = req.params.id;
  const taskIndex = tasks.findIndex(task => task.id === id);
  if(taskIndex === -1) {
    return res.status(404).json({ msg: "Task not found" })
  }
  tasks.splice(taskIndex, 1);
  res.json({ msg: 'Task Deleted!', tasks });
}

export const updateTodo = (req, res) => {
  const id = req.params.id;
  const { task, isCompleted } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === id);
  if(taskIndex === -1) {
    return res.status(404).json({ msg: 'Task not found' })
  }

  const existingTask = tasks[taskIndex];
  tasks[taskIndex] = { 
    ...existingTask,
    ...(task && { task: task }),
    ...(isCompleted !== undefined && { isCompleted })
   }
  res.json({ msg: 'Task Updated!', tasks })
}

// export default todo_list