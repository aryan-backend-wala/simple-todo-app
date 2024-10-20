export function TaskItem({ todo, onDelete, onUpdate, startEditing }) {
  return <li>
    <span className={todo.isCompleted ? 'line' : ''} onClick={() => startEditing(todo)}>{todo.title}</span>
    <input
      type="checkbox"
      checked={todo.isCompleted}
      onChange={() => onUpdate(todo.id, { isCompleted: !task.isCompleted })}
    />
    <button onClick={() => onDelete(task.id)}>Delete</button>
  </li>
}