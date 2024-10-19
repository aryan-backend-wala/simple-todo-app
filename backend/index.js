import express from 'express'
import todosRouter from './routes/todos.js'

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', todosRouter)

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
})
