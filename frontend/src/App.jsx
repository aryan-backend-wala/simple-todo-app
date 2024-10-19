import { useEffect, useState } from "react"

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [])

  async function fetchTasks() {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data.tasks)
    } catch (err) {
      console.error("Error Fetching tasks: ", err)
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
      console.error('Error: ', err);
    }
  }

  async function handleDeleteTask(id) {
    try {
      const res = await fetch(`/api/task/${id}`, { method: 'DELETE' })
      fetchTasks();
      const data = await res.json();
      setTasks(data.tasks);
    } catch (err) {
      console.log('Error deleting task: ', err)
    }
  }

  async function handleUpdateTask(id, newStatus) {
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          isCompleted: newStatus
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
      );
      const data = await res.json();
      setTasks(data.tasks);
      setTask('')
    } catch (err) {
      console.log('Error Updating task: ', err);
    }
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
        <button onClick={handleAddTask} disabled={!task.trim()}>Add</button>
      </label>
      <ul>
        {tasks.map(task => <TaskItem
          key={task.id}
          task={task} 
          onDelete={handleDeleteTask} 
          onUpdate={handleUpdateTask} 
        />)}
      </ul>
    </div>
  )
}

function TaskItem({task, onDelete, onUpdate}) {
  return <li>
    <span className={task.isCompleted ? 'line' : ''}>{task.task}</span>
    <input
      type="checkbox"
      checked={task.isCompleted}
      onChange={() => onUpdate(task.id, !task.isCompleted)}
    />
    <button onClick={() => onDelete(task.id)}>Delete</button>
  </li>
}