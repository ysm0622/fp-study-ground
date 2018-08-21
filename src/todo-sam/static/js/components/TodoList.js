import React from 'react'
import TodoItem from './TodoItem'

export default ({ todos, selected, actions }) =>
  todos
    .filter(todo => selected !== 'active' || !todo.done)
    .filter(todo => selected !== 'completed' || todo.done)
    .map(todo => <TodoItem key={todo.id} todo={todo} actions={actions} />)
    .reverse()
