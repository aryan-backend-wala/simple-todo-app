import { useEffect, useState } from "react"

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks(){
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks([...data.tasks])
    }
    fetchTasks();
  }, [])

  return (
    <div>
      <h1>Simple Todo App</h1>
      <ul>
        { tasks.map(task => (
          <li key={task.id}>
            <h3>
              {task.task}
              <input 
                type="checkbox"
                defaultChecked={task.isCompleted}
              />
            </h3>
          </li>
        )) }
      </ul>
    </div>
  )
}