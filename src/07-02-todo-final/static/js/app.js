import {
  patch,
  h
} from './snabbdom/es/snabbdom.bundle.js'
import $ from './selector.js'

(() => {
  const state = {
    set todos(v) {
      state._todos = v
      localStorage.todos = JSON.stringify(v)
      render(state)
    },
    get todos() {
      return state._todos
    },
    set filter(v) {
      state._filter = v
      render(state)
    },
    get filter() {
      return state._filter
    }
  }

  let vnode = $('ul.todo-list')

  const todoVDOM = todo =>
    h(`li${todo.done ? '.completed' : ''}`, {
      key: todo.id,
    }, [
      h('input.toggle', {
        on: {
          click: e => state.todos = state.todos.map(
            todo =>
            todo.id != e.target.dataset.id ?
            todo : {
              ...todo,
              done: !todo.done
            }
          )
        },
        dataset: {
          id: todo.id
        },
        props: {
          type: 'checkbox',
          'checked': todo.done
        }
      }),
      h('label', {
        dataset: {
          id: todo.id
        },
        props: {
          contentEditable: true
        }
      }, todo.title),
      h('button.delete', {
        dataset: {
          id: todo.id
        },
        on: {
          click: e => state.todos = state.todos.filter(todo => todo.id != e.target.dataset.id)
        }
      })
    ])

  const todolistVDOM = newTodo =>
    h('ul.todo-list', {
      key: 'todolist'
    }, newTodo)

  const getCurrentId = state =>
    state.todos.length !== 0 ?
    Math.max(...state.todos.map(todo => todo.id)) + 1 :
    0

  const newTodo = title => ({
    id: getCurrentId(state),
    title,
    done: false
  })

  const render = state => {
    console.time('vdom')
    const newTodo = state.todos
      .filter(todo => state.filter !== 'active' || !todo.done)
      .filter(todo => state.filter !== 'completed' || todo.done)
      .reverse()
      .map(todoVDOM)

    console.timeEnd('vdom')
    console.time('patch')
    vnode = patch(vnode, todolistVDOM(newTodo))
    console.timeEnd('patch')

    $('.todo-count').innerHTML = `
    <strong>${
      state.todos.filter(todo => !todo.done).length
    }</strong> items left`
  }

  const bindDOMEvents = state => {
    $('.new-todo').addEventListener('keypress', e => {
      if (e.keyCode !== 13 || !e.target.value.trim()) return
      state.todos = [...state.todos, newTodo(e.target.value)]
      e.target.value = ''
    })
    $('ul.filters').addEventListener('click', e => {
      if (!e.target.id) return
      state.filter = e.target.id
      $('ul.filters li a').map(DOM => DOM.classList.remove('selected'))
      $(`#${e.target.id}`).classList.add('selected')
    })
    $('.todo-list').addEventListener('keypress', e => {
      if (e.keyCode !== 13) return
      e.target.blur()
      if (!e.target.textContent.trim()) {
        state.todos = state.todos.filter(todo => todo.id != e.target.dataset.id)
      }
      if (e.target.textContent.trim()) {
        state.todos = state.todos.map(
          todo =>
          todo.id != e.target.dataset.id ?
          todo : {
            ...todo,
            title: e.target.textContent.trim()
          }
        )
      }
    })
    $('.clear-completed').addEventListener('click', e => {
      state.todos = state.todos.filter(todo => !todo.done)
    })
    $('.toggle-all').addEventListener('click', e => {
      state.todos = state.todos.map(todo => ({
        ...todo,
        done: !todo.done
      }))
    })
  }

  bindDOMEvents(state)
  window.state = state

  state.todos = localStorage.todos ? JSON.parse(localStorage.todos) : []
})()