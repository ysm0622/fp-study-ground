import { h } from 'hyperapp'

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
  <li class={todo.done && 'completed'} key={todo.id}>
    <input
      class="toggle"
      type="checkbox"
      checked={todo.done}
      onclick={() => actions.updateTodo({ ...todo, done: !todo.done })}
    />
    <label
      contentEditable
      onkeypress={todoEditHandler(todo, actions)}
      // style={{ display: 'none' }}
    >
      {todo.title}
    </label>
    <button class="delete" onclick={() => actions.removeTodo(todo.id)} />
  </li>
)
