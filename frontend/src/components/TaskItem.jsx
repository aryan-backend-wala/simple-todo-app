export function TaskItem({ task, onDelete, onUpdate, startEditing }) {
  return <li>
    <span className={task.isCompleted ? 'line' : ''} onClick={() => startEditing(task)}>{task.task}</span>
    <input
      type="checkbox"
      checked={task.isCompleted}
      onChange={() => onUpdate(task.id, { isCompleted: !task.isCompleted })}
    />
    <button onClick={() => onDelete(task.id)}>Delete</button>
  </li>
}