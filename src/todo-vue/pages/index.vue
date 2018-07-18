<template>
  <div class="body">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo"
               placeholder="What needs to be done?"
               autofocus
               @keypress.enter="addTodo">
      </header>
      <section class="main">
        <input class="toggle-all"
               type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <todo-item v-for="todo in todos.slice().reverse()"
                     :key="todo.id"
                     v-bind="todo"
                     @toggle="toggle(todo)"
                     @remove="remove(todo)" />
        </ul>
      </section>
      <footer class="footer">
        <span class="todo-count"></span>
        <ul class="filters">
          <li>
            <a id="all"
               class="selected">All</a>
          </li>
          <li>
            <a id="active">Active</a>
          </li>
          <li>
            <a id="completed">Completed</a>
          </li>
        </ul>
        <button class="clear-completed">Clear completed</button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Part of
        <a href="http://todomvc.com">TodoMVC</a>
      </p>
    </footer>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'

export default {
  data() {
    return {
      todos: []
    }
  },
  created() {
    this.todos = localStorage.todos ? JSON.parse(localStorage.todos) : []
    window.todos = this.todos
  },
  updated() {
    console.timeEnd('render')
  },
  methods: {
    newTodo: title => ({
      id: title,
      title,
      done: false
    }),
    addTodo(e) {
      if (!e.target.value.trim()) return
      this.todos.push(this.newTodo(e.target.value))
      localStorage.todos = JSON.stringify(this.todos)
      e.target.value = ''
      console.time('render')
    },
    toggle(todo) {
      todo.done = !todo.done
    },
    remove(target) {
      // this.todos.splice(this.todos.indexOf(target), 1)
      this.todos = this.todos.filter(todo => todo !== target)
    }
  },
  components: {
    TodoItem
  }
}
</script>