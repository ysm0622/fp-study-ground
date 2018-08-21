import React from 'react'

const todoEditHandler = (todo, actions) => e => {
  if (e.keyCode !== 13) return
  e.target.blur()
  if (!e.target.textContent.trim()) {
    actions.removeTodo(todo.id)
  }
  if (e.target.textContent.trim()) {
    todo.title = e.target.textContent
    actions.updateTodo(todo)
  }
}

export default ({ todo, actions }) => (
  <li className={todo.done ? 'completed' : ''}>
    <input
      className="toggle"
      type="checkbox"
      checked={todo.done}
      onClick={() => actions.updateTodo({ ...todo, done: !todo.done })}
    />
    <label
      // contentEditable
      onKeyPress={todoEditHandler(todo, actions)}
      // style={{ display: 'none' }}
    >
      {todo.title}
    </label>
    <button className="delete" onClick={() => actions.removeTodo(todo.id)} />
  </li>
)
