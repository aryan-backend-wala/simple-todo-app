import { useEffect, useState } from "react"
import { TaskItem } from "./components/TaskItem";
import { logError } from "./utils/logError";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState('');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    fetchTasks();
  }, [])

  async function handleLogin(){
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      const data = await res.json();
      if(res.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token)
      } else {
        alert(data.msg);
      }
    } catch(err) {
      console.error('Error while logging in: ', err);
    }
  }

  async function fetchTasks() {
    try {
      const res = await fetch("/api/todos", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setTodos(data.todos)
    } catch (err) {
      logError('Error Fetching tasks', err)
    }
  }

  async function handleAddTask() {
    try {
      const res = await fetch("/api//todo/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
        })
      })
      const data = await res.json();
      setTodos(data.todos);
      setTitle("")
    } catch (err) {
      logError('Error Creating Task', err);
    }
  }

  async function handleDeleteTask(id) {
    try {
      const res = await fetch(`/api/todo/delete/${id}`, { method: 'DELETE', headers: {
        Authorization: `Bearer ${token}`
      } })
      const data = await res.json();
      setTodos(data.todos);
    } catch (err) {
      logError('Error deleting task', err)
    }
  }

  async function handleUpdateTask(id, updatedFields) {
    try {
      const res = await fetch(`/api/todo/update/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedFields)
      });

      const data = await res.json();
      setTodos(data.todos);
      setIsEditing(false)
      setTitle('')
    } catch (err) {
      logError('Error Updating task', err)
    }
  }

  function startEditing(todo) {
    setTitle(todo.title);
    setIsEditing(true)
    setEditingTaskId(todo._id)
  }

  if(!token) {
    return <div>
      <h2>Login</h2>
      <input placeholder="admin" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="1234" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  }

  return (
    <div>
      <h1>Simple Todo App</h1>
      <label>
        <span>Task: </span>
        <input
          placeholder="Add Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {
          isEditing ? <button onClick={() => handleUpdateTask(editingTaskId, { title })}>Update</button>
            : <button onClick={handleAddTask} disabled={!title.trim()}>Add</button>
        }
      </label>
      <ul>
        {todos.map(todo => <TaskItem
          key={todo._id}
          todo={todo}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
          startEditing={startEditing}
        />)}
      </ul>
    </div>
  )
}
