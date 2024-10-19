import express from 'express'
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const tasks = [];
let id = 0;

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

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
})