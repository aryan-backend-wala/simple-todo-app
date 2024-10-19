import { useEffect, useState } from "react"
import { TaskItem } from "./components/TaskItem";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [])

  async function fetchTasks() {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data.tasks)
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
          task,
          isCompleted: false
        })
      })
      const data = await res.json();
      setTasks(data.tasks);
      setTask("")
    } catch (err) {
      logError('Error Creating Task', err);
    }
  }

  async function handleDeleteTask(id) {
    const newTask = tasks.filter(task => task.id !== id);
    setTasks(newTask)
    try {
      const res = await fetch(`/api/task/${id}`, { method: 'DELETE' })
      const data = await res.json();
      setTasks(data.tasks);
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
      setTasks(data.tasks);
      setIsEditing(false)
      setTask('')
    } catch (err) {
      logError('Error Updating task', err)
    }
  }

  function startEditing(task) {
    setTask(task.task);
    setIsEditing(true)
    setId(task.id)
  }

  return (
    <div>
      <h1>Simple Todo App</h1>
      <label>
        <span>Task: </span>
        <input
          placeholder="Add Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        {
          isEditing ? <button onClick={() => handleUpdateTask(id, { task })}>Update</button>
            : <button onClick={handleAddTask} disabled={!task.trim()}>Add</button>
        }
      </label>
      <ul>
        {tasks.map(task => <TaskItem
          key={task.id}
          task={task}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
          startEditing={startEditing}
        />)}
      </ul>
    </div>
  )
}



function logError(msg, error){
  console.error(`${msg}: `, error)
}