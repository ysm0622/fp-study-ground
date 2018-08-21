import React from 'react'
import TodoList from './components/TodoList'
import FilterList from './components/FilterList'

const enterHandler = (state, actions) => e => {
  if (e.key != 'Enter' || !e.target.value.trim()) return
  actions.addTodo(e.target.value, state)
  e.target.value = ''
}

const toggleAllHandler = (state, actions) => e => {
  state.todos.every(todo => todo.done)
    ? actions.uncheckAllTodos(state)
    : actions.checkAllTodos(state)
}

export default (state, actions) => (
  <div className="body">
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyPress={enterHandler(state, actions)}
        />
      </header>
      <section className="main">
        <input
          className="toggle-all"
          type="checkbox"
          checked={state.todos.every(todo => todo.done)}
          onClick={toggleAllHandler(state, actions)}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          <TodoList {...state} actions={actions} />
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>{state.todos.filter(todo => !todo.done).length}</strong> items
          left
        </span>
        <ul className="filters">
          <FilterList {...state} actions={actions} />
        </ul>
        <button
          className="clear-completed"
          onClick={() => actions.clearCompleted()}
        >
          Clear completed
        </button>
      </footer>
    </section>
    <footer className="info">
      <p>Double-click to edit a todo</p>
      <p>
        Part of
        <a href="http://todomvc.com">TodoMVC</a>
      </p>
    </footer>
  </div>
)
