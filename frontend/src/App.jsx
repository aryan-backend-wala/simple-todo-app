import { useEffect, useState } from "react"
import { TaskItem } from "./components/TaskItem";
import { logError } from "./utils/logError";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [])

  async function fetchTasks() {
    try {
      const res = await fetch("/api/todos");
      const data = await res.json();
      setTodos(data.todos)
    } catch (err) {
      logError('Error Fetching tasks', err)
    }
  }

  async function handleAddTask() {
    try {
      const res = await fetch("/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          todo,
          isCompleted: false
        })
      })
      const data = await res.json();
      setTodos(data.tasks);
      setTodo("")
    } catch (err) {
      logError('Error Creating Task', err);
    }
  }

  async function handleDeleteTask(id) {
    const newTask = todos.filter(task => task.id !== id);
    setTodos(newTask)
    try {
      const res = await fetch(`/api/task/${id}`, { method: 'DELETE' })
      const data = await res.json();
      setTodos(data.tasks);
    } catch (err) {
      logError('Error deleting task', err)
    }
  }

  async function handleUpdateTask(id, updatedFields) {
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedFields)
      });

      const data = await res.json();
      setTodos(data.tasks);
      setIsEditing(false)
      setTodo('')
    } catch (err) {
      logError('Error Updating task', err)
    }
  }

  function startEditing(task) {
    setTodo(task.task);
    setIsEditing(true)
    setEditingTaskId(task.id)
  }

  return (
    <div>
      <h1>Simple Todo App</h1>
      {/* <label>
        <span>Task: </span>
        <input
          placeholder="Add Task"
          value={task}
          onChange={(e) => setTodo(e.target.value)}
        />
        {
          isEditing ? <button onClick={() => handleUpdateTask(editingTaskId, { task })}>Update</button>
            : <button onClick={handleAddTask} disabled={!task.trim()}>Add</button>
        }
      </label> */}
      <ul>
        {todos.map(todo => <TaskItem
          key={todo.id}
          todo={todo}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
          startEditing={startEditing}
        />)}
      </ul>
    </div>
  )
}
