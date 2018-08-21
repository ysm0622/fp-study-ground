import { h } from 'hyperapp'
import TodoList from './components/TodoList'
import FilterList from './components/FilterList'

const enterHandler = (state, actions) => e => {
  if (e.keyCode != 13 || !e.target.value.trim()) return
  actions.addTodo(e.target.value)
  e.target.value = ''
}

const toggleAllHandler = (state, actions) => e => {
  state.todos.every(todo => todo.done)
    ? actions.uncheckAllTodos(state)
    : actions.checkAllTodos(state)
}

export default (state, actions) => (
  <div class="body">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
          autofocus
          onkeypress={enterHandler(state, actions)}
        />
      </header>
      <section class="main">
        <input
          class="toggle-all"
          type="checkbox"
          checked={state.todos.every(todo => todo.done)}
          onclick={toggleAllHandler(state, actions)}
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <TodoList {...state} actions={actions} />
        </ul>
      </section>
      <footer class="footer">
        <span class="todo-count">
          <strong>{state.todos.filter(todo => !todo.done).length}</strong> items
          left
        </span>
        <ul class="filters">
          <FilterList {...state} {...actions} />
        </ul>
        <button
          class="clear-completed"
          onclick={() => actions.clearCompleted(state)}
        >
          Clear completed
        </button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>
        Part of
        <a href="http://todomvc.com">TodoMVC</a>
      </p>
    </footer>
  </div>
)
