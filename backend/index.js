import express from 'express'
import todosRouter from './routes/todos.js'
import mongoose from 'mongoose';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', todosRouter)

mongoose.set("strictQuery", false);

const mongoDB = "mongodb://127.0.0.1/simple-todo-app";

async function main(){
  try {
    await mongoose.connect(mongoDB)
    console.log('Connected!')
  } catch(err) {
    console.error('Error while Connecting MongoDB: ',err)
  }
}

main();

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
})
