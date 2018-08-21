const getId = _ => Math.random().toString()

const newTodo = title => ({
  id: getId(),
  title,
  done: false
})

export default {
  addTodo: title => state => ({
    todos: [...state.todos, newTodo(title)]
  }),
  removeTodo: id => state => ({
    todos: state.todos.filter(todo => todo.id != id)
  }),
  selectFilter: selected => ({
    selected
  }),
  updateTodo: todo => state => ({
    todos: state.todos.map(t => (t.id === todo.id ? todo : t))
  }),
  clearCompleted: state => ({
    todos: state.todos.filter(todo => !todo.done)
  }),
  checkAllTodos: state => ({
    todos: state.todos.map(todo => ({ ...todo, done: true }))
  }),
  uncheckAllTodos: state => ({
    todos: state.todos.map(todo => ({ ...todo, done: false }))
  }),
  add20ktodos: () => ({
    todos: Array.from(Array(20000).keys()).map(v => newTodo(v))
  })
}
