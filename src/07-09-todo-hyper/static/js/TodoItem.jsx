import { h } from 'hyperapp'

export default ({ id, title, done, removeTodo, toggleTodo }) => (
  <li class={done && 'completed'} key={id}>
    <input
      class="toggle"
      type="checkbox"
      checked={done}
      onclick={() => toggleTodo(id)}
    />
    <label>{title}</label>
    <button class="delete" onclick={() => removeTodo(id)} />
  </li>
)
