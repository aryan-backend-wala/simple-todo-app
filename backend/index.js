import express from 'express'
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
  tasks.push({ id, task, isCompleted });
  id++;
  res.json({ message: 'Task Added!' })
})

app.delete('/api/task/:id', (req, res) => {
  const id = req.params.id;
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
  tasks.splice(taskIndex, 1);
  res.json({ msg: 'Successful' });
})

app.put('/api/task/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { task, isCompleted } = req.body;
  console.log(task, isCompleted)
  const taskItem = tasks.find(task => task.id === id);
  tasks.splice(id, 1, { ...taskItem, task, isCompleted })
  console.log(tasks);
  res.json({ msg: 'Successful' })
})

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
})
