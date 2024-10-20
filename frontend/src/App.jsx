import { useEffect, useState } from "react"
import { TaskItem } from "./components/TaskItem";
import { logError } from "./utils/logError";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [])

  async function fetchTasks() {
    try {
      const res = await fetch("/api/todos");
      const data = await res.json();
      console.log(data.todos)
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
          "Content-Type": "application/json"
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
      const res = await fetch(`/api/todo/delete/${id}`, { method: 'DELETE' })
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
          "Content-Type": "application/json"
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
