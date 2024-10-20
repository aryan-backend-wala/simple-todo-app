export function TaskItem({ todo, onDelete, onUpdate, startEditing }) {
  return <li>
    <span className={todo.isCompleted ? 'line' : ''} onClick={() => startEditing(todo)}>{todo.title}</span>
    <input
      type="checkbox"
      checked={todo.isCompleted}
      onChange={() => onUpdate(todo._id, { isCompleted: !todo.isCompleted })}
    />
    <button onClick={() => onDelete(todo._id)}>Delete</button>
  </li>
}