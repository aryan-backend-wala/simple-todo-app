import { Todo } from '../models/todos.js';
import jwt from 'jsonwebtoken';

export const todoList = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if(!token) {
    return res.status(401).json({ msg: "Token missing" });
  }

  jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
    if(err) {
      return res.json({ err });
    }
    res.json({ todos: await fetchTodos() });
  })
} 

export const createTodo = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if(!token) {
    res.status(401).json({ msg: 'Token missing' });
  }

  jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
    const _ = validateFields(['title'], req.body);
    const { title } = req.body;
    
    if(err) {
      return res.json({ err })
    }

    if(!title) {
      return res.status(400).json({ msg: "title field is required" })
    }
  
    if(_.extraFields.length > 0) {
      return res.status(400).json({
        msg: 'Invalids field present: ' + _.extraFields.join(', '),
        allowedFields: _.allowedFields.join(', ')
      })
    }
  
    try {
      await Todo.create({ ...req.body })
    } catch(err) {
      console.error("Error while creating new todo: ", err);
    }
  
    res.json({ msg: "Successful", todos: await fetchTodos() })
  })

}

export const deleteTodo = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if(!token) {
    res.status(401).json({ msg: 'Token missing' })
  }

  jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
    if(err) {
      return res.json({ err })
    }
    const id = req.params.id;
    try {
      await Todo.findByIdAndDelete({ _id: id });
    } catch (err) {
      return res.status(400).json({ msg: "for some reason query does not proceed check id please" })
    }
    res.json({ msg: 'required data is deleted!', todos: await fetchTodos() })
  })
}

export const updateTodo = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if(!token) {
    return res.status(401).json({ msg: 'Token missing' })
  }

  jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
    if(err) {
      return res.json({ err })
    }
    
    const _ = validateFields(['title', 'isCompleted'], req.body);
    const id = req.params.id;
  
    if(_.extraFields.length > 0){
      return res.status(400).json({
        msg: 'Invalids field present: ' + _.extraFields.join(', '),
        allowedFields: _.allowedFields.join(', ')
      })
    }
  
    try {
      await Todo.findByIdAndUpdate({ _id: id }, { ...req.body })
    } catch(err) {
      return res.status(400).json({ msg: "for some reason query does not proceed check id please" })
    }
    res.json({ msg: "required data updated!", todos: await fetchTodos() });
    
  })

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