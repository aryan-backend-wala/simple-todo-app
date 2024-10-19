import express from 'express'
import { v4 as uuidv4 } from 'uuid';
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const tasks = [
  { id: 0, task: "buy a grocery", isCompleted: false },
  { id: 1, task: "buy a milk", isCompleted: true },
  { id: 2, task: "go to gym", isCompleted: false }
];
let id = 3;

app.get('/api/tasks', (req, res) => {
  res.json({ tasks });
})

app.post('/api/task', (req, res) => {
  const { task, isCompleted } = req.body;
  if(!task) {
    return res.status(400).json({ message: "Task not included" });
  }
  tasks.push({ id: uuidv4(), task, isCompleted });
  id++;
  res.json({ message: 'Task Added!', tasks })
})

app.delete('/api/task/:id', (req, res) => {
  const id = req.params.id;
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
  if(taskIndex === -1) {
    return res.status(404).json({ msg: "Task not found" })
  }
  tasks.splice(taskIndex, 1);
  res.json({ msg: 'Task Deleted!', tasks });
})

app.put('/api/task/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { task, isCompleted } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === id);
  if(taskIndex === -1) {
    return res.status(404).json({ msg: 'Task not found' })
  }
  const taskItem = tasks.find(task => task.id === id);
  console.log(taskIndex, taskItem)
  tasks[taskIndex] = { ...taskItem, task, isCompleted }
  res.json({ msg: 'Task Updated!', tasks })
})

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
})
