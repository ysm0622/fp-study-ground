import { render } from 'react-dom'
import App from './App'
;(() => {
  const state = new Proxy(
    { todos: [], selected: 'all' },
    {
      set: (state, key, value) => {
        state[key] = value
        render(App(state, actions), document.querySelector('#app'))
        return true
      }
    }
  )

  const getId = _ => Math.random().toString()

  const newTodo = title => ({
    id: getId(),
    title,
    done: false
  })

  const actions = {
    addTodo: title => {
      state.todos = [...state.todos, newTodo(title)]
    },
    removeTodo: id => {
      state.todos = state.todos.filter(todo => todo.id != id)
    },
    selectFilter: selected => {
      state.selected = selected
    },
    updateTodo: todo => {
      state.todos = state.todos.map(t => (t.id === todo.id ? todo : t))
    },
    clearCompleted: _ => {
      state.todos = state.todos.filter(todo => !todo.done)
    },
    checkAllTodos: _ => {
      state.todos = state.todos.map(todo => ({ ...todo, done: true }))
    },
    uncheckAllTodos: _ => {
      state.todos = state.todos.map(todo => ({ ...todo, done: false }))
    }
  }

  state.todos = []
})()
