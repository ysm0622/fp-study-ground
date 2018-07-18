import { h, app } from 'hyperapp'
import TodoItem from './TodoItem'
import FilterItem from './FilterItem'
;(() => {
  const state = {
    todos: [],
    selected: 'all'
  }

  const getId = _ => Math.random().toString()

  const newTodo = title => ({
    id: getId(),
    title,
    done: false
  })

  const actions = {
    addTodo: title => state => ({
      todos: [...state.todos, newTodo(title)]
    }),
    removeTodo: id => state => ({
      todos: state.todos.filter(todo => todo.id != id)
    }),
    selectFilter: selected => ({
      selected
    }),
    toggleTodo: id => state => ({
      todos: state.todos.map(
        todo =>
          todo.id != id
            ? todo
            : {
                ...todo,
                done: !todo.done
              }
      )
    }),
    clearCompleted: state => ({
      todos: state.todos.filter(todo => !todo.done)
    }),
    checkAllTodos: state => ({
      todos: state.todos.map(todo => ({ ...todo, done: true }))
    }),
    uncheckAllTodos: state => ({
      todos: state.todos.map(todo => ({ ...todo, done: false }))
    })
  }

  const enterHandler = actions => e => {
    if (e.keyCode != 13 || !e.target.value.trim()) return
    actions.addTodo(e.target.value)
    e.target.value = ''
  }

  const toggleAllHandler = (state, actions) => e => {
    state.todos.every(todo => todo.done)
      ? actions.uncheckAllTodos(state)
      : actions.checkAllTodos(state)
  }

  const TodoList = ({ todos, selected, actions }) =>
    todos
      .filter(todo => selected !== 'active' || !todo.done)
      .filter(todo => selected !== 'completed' || todo.done)
      .map(todo => <TodoItem {...todo} {...actions} />)
      .reverse()

  const FilterList = ({ selected, selectFilter }) =>
    ['all', 'active', 'completed'].map(filter => (
      <FilterItem
        filter={filter}
        selected={selected}
        selectFilter={selectFilter}
      />
    ))

  const view = (state, actions) => (
    <div class="body">
      <section class="todoapp">
        <header class="header">
          <h1>todos</h1>
          <input
            class="new-todo"
            placeholder="What needs to be done?"
            autofocus
            onkeypress={enterHandler(actions)}
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
            <strong>{state.todos.filter(todo => !todo.done).length}</strong>{' '}
            items left
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

  app(state, actions, view, document.body)
})()
