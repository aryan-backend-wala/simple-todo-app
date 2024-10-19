import { useEffect, useState } from "react"

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [isCompleted, setIsCompleted] = useState(null);

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
      await fetch("/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          task,
          isCompleted: false
        })
      })
      setTask("")
      fetchTasks()
    } catch (err) {
      console.error('Error: ', err);
    }
  }

  async function handleDeleteTask(id) {
    try {
      const res = await fetch(`/api/task/${id}`, { method: 'DELETE' })
      fetchTasks();
      const data = await res.json();
      alert(data.msg);
    } catch (err) {
      console.log('Error deleting task: ', err)
    }
  }

  async function handleUpdateTask(id) {
    try {
        const res = await fetch(`/api/task/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            task,
            isCompleted: !isCompleted
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      fetchTasks();
      const data = await res.json();
      alert(data.msg);
      setTask('')
    } catch(err) {
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
        <button onClick={handleAddTask}>Add</button>
      </label>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <h3>
              <span className={task.isCompleted ? 'line' : 'none'} onClick={() => setTask(task.task)}>{task.task}</span>
              <input
                type="checkbox"
                defaultChecked={task.isCompleted}
                onClick={() => setIsCompleted(task.isCompleted)}
              />
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              <button onClick={() => handleUpdateTask(task.id)}>Update</button>
            </h3>
          </li>
        ))}
      </ul>
    </div>
  )
}